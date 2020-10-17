const state = require('./state.js')

async function robot() {
    const content = state.load()

    await authenticateWithOAuth()
    //await uploadVideo()
    //await uploadThumbnail()

    async function authenticateWithOAuth() {
        await startWebServer()
        await createOAuthClient()
        await requestUserConsent()
        await waitForGoogleCallback()
        await requestGoogleForAccessTokens()
        await setGlobalGoogleAuthentication()
        await stopWebServer()
    }
}

module.exports = robot