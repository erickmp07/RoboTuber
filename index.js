const robots = {
    image: require('./robots/image.js'),
    input: require('./robots/input.js'),
    state: require('./robots/state.js'),
    text: require('./robots/text.js'),
    video: require('./robots/video.js'),
    youtube: require('./robots/youtube.js')
}

async function start() {
    robots.input();

    await robots.text();
    await robots.image();
    await robots.video();
    await robots.youtube();
}

start();