export const config = {
    domain: 'fest.dev',
    entryPoints: [{
        input: './src/templates/index.mst',
        output: './src/index.html',
        fragments: {
            header: './src/templates/fragments/full/header.mst',
            nav: './src/templates/fragments/common/nav.mst',
            main: './src/templates/fragments/full/main.mst',
            footer: './src/templates/fragments/common/footer.mst',
            bottomScripts: './src/templates/fragments/common/bottomScripts.mst',
        }
    }, {
        input: './src/templates/about.mst',
        output: './src/about.html',
        fragments: {
            header: './src/templates/fragments/headless/header.mst',
            nav: './src/templates/fragments/common/nav.mst',
            main: './src/templates/fragments/common/main.mst',
            footer: './src/templates/fragments/common/footer.mst',
            bottomScripts: './src/templates/fragments/common/bottomScripts.mst',
        }
    }, {
        input: './src/templates/coc.mst',
        output: './src/coc.html',
        fragments: {
            header: './src/templates/fragments/headless/header.mst',
            nav: './src/templates/fragments/common/nav.mst',
            main: './src/templates/fragments/common/main.mst',
            footer: './src/templates/fragments/common/footer.mst',
            bottomScripts: './src/templates/fragments/common/bottomScripts.mst',
        }
    },
        {
            input: './src/templates/policy.mst',
            output: './src/policy.html',
            fragments: {
                header: './src/templates/fragments/headless/header.mst',
                nav: './src/templates/fragments/common/nav.mst',
                main: './src/templates/fragments/common/main.mst',
                footer: './src/templates/fragments/common/footer.mst',
                bottomScripts: './src/templates/fragments/common/bottomScripts.mst',
            }
        }],
    localhost: 'http://localhost:3000/',
    devContent: './build/content.json',
    allowedContentTypes: [
        'infoLineSection',
        'mainTextSection',
        'heroText',
        'organizers',
        'speakers',
        'menu',
        'partnerWelcomeMessage',
        'meta',
        'codeOfConduct',
        'aboutPage',
        'policyPage',
        'footer',
        'infoPartners',
        'goldPartners',
        'silverPartners',
        'mediaPartners',
    ],
}
