const robots = {
    input: require('./robots/input.js'),
    text: require('./robots/text.js')
}

async function start() {
    robots.input();

    await robots.text()

    console.log(JSON.stringify(content, null, 4))
}

start()