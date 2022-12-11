import * as dotenv from 'dotenv';
dotenv.config();
import {Parcel} from '@parcel/core';
import {csm} from './cms.mjs';

const FD_CMS_ACCESS_TOKEN = process.env.FD_CMS_ACCESS_TOKEN;
const FD_CMS_SPACE = process.env.FD_CMS_SPACE;

const entryPoint = await csm({
    accessToken: FD_CMS_ACCESS_TOKEN,
    space: FD_CMS_SPACE,
    env: 'development'
});

const PORT = 3000;

let bundler = new Parcel({
    entries: entryPoint,
    defaultConfig: '@parcel/config-default',
    serveOptions: {
        port: PORT
    },
    hmrOptions: {
        port: PORT
    }
});

let hostInfoReady = false;

await bundler.watch((err, event) => {

    if(!hostInfoReady) {
        console.log(`Server running at http://localhost:${PORT}`);
        hostInfoReady = true;
    }


    if (err) {
        // fatal error
        throw err;
    }

    if (event.type === 'buildSuccess') {
        let bundles = event.bundleGraph.getBundles();
        console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
    } else if (event.type === 'buildFailure') {
        console.log(event.diagnostics);
    }
});
