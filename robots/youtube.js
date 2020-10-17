const express = require('express')

const state = require('./state.js')

async function robot() {
    const content = state.load()

    await authenticateWithOAuth()
    //await uploadVideo()
    //await uploadThumbnail()

    async function authenticateWithOAuth() {
        const webServer = await startWebServer()
        //await createOAuthClient()
        //await requestUserConsent()
        //await waitForGoogleCallback()
        //await requestGoogleForAccessTokens()
        //await setGlobalGoogleAuthentication()
        //await stopWebServer()

        async function startWebServer() {
            return new Promise((resolve, reject) => {
                const port = 5000
                const app = express()

                const server = app.listen(port, () => {
                    console.log(`> Listening on http://localhost:${port}`)

                    resolve({
                        app,
                        server
                    })
                })
            })
        }
    }
}

module.exports = robot