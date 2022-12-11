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

    const {items} = env !== 'development' ?  await client.getEntries() : JSON.parse(await readFilePromise(devContent, 'utf8'));

    const content = items[0].fields;
    const template = readFileSync('./src/index.mst', 'utf8');
    const output = Mustache.render(template, content);

    writeFileSync(entryPoint, output);

    return entryPoint;
}


