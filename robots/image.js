const google = require('googleapis').google

const state = require('./state.js')
const googleSearchCredentials = require('../credentials/google-search.json')

const customSearch = google.customsearch('v1')

async function robot() {
    const content = state.load()

    const imagesArray = await fetchGoogleAndReturnImagesLinks('Michael Jackson')

    console.dir(imagesArray, { depth: null })
    process.exit(0)

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineID,
            q: query,
            searchType: 'image',
            num: 2
        })

        const imagesUrl = response.data.items.map(item => {
            return item.link
        })

        return imagesUrl
    }
}

module.exports = robot