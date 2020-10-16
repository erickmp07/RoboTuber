const robots = {
    image: require('./robots/image.js'),
    input: require('./robots/input.js'),
    state: require('./robots/state.js'),
    text: require('./robots/text.js'),
    video: require('./robots/video.js')
}

async function start() {
    robots.input();

    await robots.text()
    await robots.image()
    await robots.video()

    const content = robots.state.load()

    console.dir(content, { depth: null })
}

start()