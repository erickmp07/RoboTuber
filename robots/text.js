const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey

async function robot(content) {
    await featchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

    async function featchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia[algorithmiaApiKey]
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()

        content.sourceContentOriginal = wikipediaContent.content
    }
}

module.exports = robot