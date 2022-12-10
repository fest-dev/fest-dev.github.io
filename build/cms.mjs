import contentful from 'contentful';
import Mustache from 'mustache';
import { readFileSync, writeFileSync } from 'fs';


export const csm = async (accessToken, space) => {
    const client = contentful.createClient({
        space,
        environment: 'master', // defaults to 'master' if not set
        accessToken
    });

    const entryPoint = './src/index.html';

    const {items} = await client.getEntries();
    const content = items[0].fields;
    const template = readFileSync('./src/index.mst', 'utf8');
    const output = Mustache.render(template, content);

    writeFileSync(entryPoint, output);

    return entryPoint;
}


