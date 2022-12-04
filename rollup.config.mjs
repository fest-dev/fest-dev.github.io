import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import html, { makeHtmlAttributes } from '@rollup/plugin-html';
import mustache from 'mustache';
import {readFileSync} from 'fs';

export default {
    input: 'src/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'es'
    },
    plugins: [
        postcss({
            extract: true,
        }),
        html({
            publicPath: './',
            template({ files, publicPath, attributes }) {
                const template = readFileSync('./src/index.html',  {encoding:'utf8', flag:'r'});

                // const links = (files.css || [])
                //     .map(({ fileName }) => {
                //         const attrs = makeHtmlAttributes(attributes.link);
                //         return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
                //     })
                //     .join('\n');
                //
                // return mustache.render(template, { links });

                return template;
            }
        })
    ],
};
