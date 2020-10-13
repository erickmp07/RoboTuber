const robots = {
    input: require('./robots/input.js'),
    state: require('./robots/state.js'),
    text: require('./robots/text.js')
}

async function start() {
    robots.input();

    await robots.text()

    const content = robots.state.load()

    console.dir(content, { depth: null })
}

start()