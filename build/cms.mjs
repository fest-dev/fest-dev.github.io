import contentful from 'contentful';
import Mustache from 'mustache';
import { readFileSync, writeFileSync } from 'fs';
import { readFile as readFilePromise } from 'fs/promises';
import { config } from './config/config.mjs';

const { entryPoints, devContent, allowedContentTypes: contentTypes } = config;

export const csm = async ({accessToken, space, env}) => {
    const client = contentful.createClient({
        space,
        environment: 'master', // defaults to 'master' if not set
        accessToken
    });

    const contentfulData = env !== 'development' ?  await client.getEntries() : JSON.parse(await readFilePromise(devContent, 'utf8'));
    const items = contentfulData.items;

    if(env !== 'development') {
        writeFileSync(devContent, JSON.stringify(contentfulData));
    } else {
        const meta = contentfulData.items.find(item => item.sys.contentType.sys.id === 'meta');
        meta.fields.host = config.localhost;
    }

    const content = items.reduce((acc, item) => {
        const acceptItem = contentTypes.includes(item.sys.contentType.sys.id);

        if(acceptItem) {
            if(!acc[item.sys.contentType.sys.id]) {
                acc[item.sys.contentType.sys.id] = item.fields;
            } else if(Array.isArray(acc[item.sys.contentType.sys.id])) {
                acc[item.sys.contentType.sys.id] = [...acc[item.sys.contentType.sys.id], item.fields];
            } else {
                acc[item.sys.contentType.sys.id] = [acc[item.sys.contentType.sys.id], item.fields];
            }
        }

        return acc;
    }, {});

    entryPoints.forEach((entryPoint) => {
        const template = readFileSync(entryPoint.input, 'utf8');
        const output = Mustache.render(template, content);

        writeFileSync(entryPoint.output, output);
    });



    return entryPoints.map(item => item.output);
}


