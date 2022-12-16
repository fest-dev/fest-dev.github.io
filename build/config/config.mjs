export const config = {
    entryPoints: [{
        input: './src/templates/index.mst',
        output: './src/index.html',
    }, {
        input: './src/templates/about.mst',
        output: './src/about.html',
    }, {
        input: './src/templates/coc.mst',
        output: './src/coc.html',
    }],
    devContent: './build/content.json',
    allowedContentTypes: [
        'infoLineSection',
        'mainTextSection',
        'heroText',
        'organizers',
        'speakers',
        'menu',
        'partnerWelcomeMessage',
        'meta'
    ],
}
