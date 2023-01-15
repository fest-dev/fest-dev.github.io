import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Parcel } from '@parcel/core';
import { writeFileSync } from 'fs';
import { csm } from './cms.mjs';
import { config } from './config/config.mjs';

const FD_CMS_ACCESS_TOKEN = process.env.FD_CMS_ACCESS_TOKEN;
const FD_CMS_SPACE = process.env.FD_CMS_SPACE;



const entryPoint = await csm({
    accessToken: FD_CMS_ACCESS_TOKEN,
    space: FD_CMS_SPACE
});


let bundler = new Parcel({
    entries: entryPoint,
    defaultConfig: '@parcel/config-default'
});

try {
    let {bundleGraph, buildTime} = await bundler.run();
    let bundles = bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err) {
    console.error('Built failed');
    console.log(err.diagnostics);
}

writeFileSync('./dist/CNAME', config.domain);
