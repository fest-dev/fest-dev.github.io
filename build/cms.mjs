import contentful from 'contentful';
import Mustache from 'mustache';
import { readFileSync, writeFileSync } from 'fs';
import { readFile as readFilePromise } from 'fs/promises';



export const csm = async ({accessToken, space, env}) => {
    const client = contentful.createClient({
        space,
        environment: 'master', // defaults to 'master' if not set
        accessToken
    });

    const entryPoint = './src/index.html';
    const devContent = './build/content.json';

    const contentfulData = env !== 'development' ?  await client.getEntries() : JSON.parse(await readFilePromise(devContent, 'utf8'));
    const items = contentfulData.items;

    if(env !== 'development') {
        writeFileSync('./build/content.json', JSON.stringify(contentfulData));
    }

    const contentTypes = ['infoLineSection', 'mainTextSection', 'heroText', 'organizers', 'speakers', 'menu'];

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

    const template = readFileSync('./src/index.mst', 'utf8');
    const output = Mustache.render(template, content);

    writeFileSync(entryPoint, output);

    return entryPoint;
}


