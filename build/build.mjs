import { Parcel } from '@parcel/core';
import { csm } from './cms.mjs';

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
    console.log(err.diagnostics);
}
