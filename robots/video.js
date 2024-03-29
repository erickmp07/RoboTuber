const gm = require('gm').subClass({ imageMagick: true });
const videoshow = require('videoshow');
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

const state = require("./state");

const audio = path.join(__dirname, '../templates/1/newsroom.mp3');
const video = path.join(__dirname, '../content/video-maker.mp4');

let ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

async function robot() {
    console.log('> [video-robot] Starting...');
    
    const content = state.load();

    await convertAllImages(content);
    await createAllSentenceImages(content);
    await createYouTubeThumbnail();
    await createVideoRenderScript(content);
    await renderVideo();

    state.save(content);

    async function convertAllImages(content) {
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await convertImage(sentenceIndex);
        }
    }

    async function convertImage(sentenceIndex) {
        return new Promise((resolve, reject) => {
            const inputFile = `./content/${sentenceIndex}-original.png[0]`;
            const outputFile = `./content/${sentenceIndex}-converted.png`;

            const width = 1920;
            const height = 1080;

            gm()
                .in(inputFile)
                .out('(')
                    .out('-clone')
                    .out('0')
                    .out('-background', 'white')
                    .out('-blur', '0x9')
                    .out('-resize', `${width}x${height}^`)
                .out(')')
                .out('(')
                    .out('-clone')
                    .out('0')
                    .out('-background', 'white')
                    .out('-resize', `${width}x${height}`)
                .out(')')
                .out('-delete', '0')
                .out('-gravity', 'center')
                .out('-compose', 'over')
                .out('-composite')
                .out('-extent', `${width}x${height}`)
                .write(outputFile, error => {
                    if (error) {
                        return reject(error);
                    }

                    console.log(`> [video-robot] Image converted: ${outputFile}`);
                    resolve();
                })
        });
    }

    async function createAllSentenceImages(content) {
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await createSentenceImage(sentenceIndex, content.sentences[sentenceIndex].text);
        }
    }

    async function createSentenceImage(sentenceIndex, sentenceText) {
        return new Promise((resolve, reject) => {
            const outputFile = `./content/${sentenceIndex}-sentence.png`;

            const templateSettings = {
                0: {
                    size: '1920x400',
                    gravity: 'center'
                },
                1: {
                    size: '1920x1080',
                    gravity: 'center'
                },
                2: {
                    size: '800x1080',
                    gravity: 'west'
                },
                3: {
                    size: '1920x400',
                    gravity: 'center'
                },
                4: {
                    size: '1920x1080',
                    gravity: 'center'
                },
                5: {
                    size: '800x1080',
                    gravity: 'west'
                },
                6: {
                    size: '1920x400',
                    gravity: 'center'
                }
            };

            gm()
                .out('-size', templateSettings[sentenceIndex].size)
                .out('-gravity', templateSettings[sentenceIndex].gravity)
                .out('-background', 'transparent')
                .out('-fill', 'white')
                .out('-kerning', '-1')
                .out(`caption: ${sentenceText}`)
                .write(outputFile, error => {
                    if (error) {
                        return reject(error);
                    }

                    console.log(`> [video-robot] Sentence created: ${outputFile}`);
                    resolve();
                })
        });
    }

    async function createYouTubeThumbnail() {
        return new Promise((resolve, reject) => {
            gm()
                .in('./content/0-converted.png')
                .write('./content/youtube-thumbnail.jpg', error => {
                    if (error) {
                        return reject(error);
                    }

                    console.log('> [video-robot] YouTube thumbnail created');
                    resolve();
                })
        });
    }

    async function createVideoRenderScript(content) {
        await state.saveScript(content);
    }

    async function renderVideo() {
        console.log('> [video-robot] Starting video render');

        return new Promise((resolve, reject) => {
            let images = [];

            for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
                images.push({
                    path: `./content/${sentenceIndex}-converted.png`,
                    caption: content.sentences[sentenceIndex].text
                });
            }

            const audioParameters = {
                fade: true,
                delay: 1
            };

            const videoOptions = {
                fps: 30,
                loop: 10,
                transition: true,
                transitionDuration: 1,
                videoBitrate: 1024,
                videoCodec: 'libx264',
                size: '640x?',
                audioBitrate: '128k',
                audioChannels: 2,
                format: 'mp4',
                pixelFormat: 'yuv420p',
                useSubRipSubtitles: false,
                subtitleStyle: {
                    Fontename: 'Arial',
                    Fontesize: '30',
                    PrimaryColour: '11861244',
                    SecondaryColour: '11861244',
                    TertiaryColour: '11861244',
                    BackColour: '-2147483640',
                    Bold: '2',
                    Italic: '0',
                    BorderStyle: '2',
                    Outline: '2',
                    Shadow: '1',
                    Alignment: '1',
                    MarginL: '40',
                    MarginR: '60',
                    MarginV: '40'
                }
            };

            videoshow(images, videoOptions)
                .audio(audio, audioParameters)
                .save(video)
                .on('start', command => {
                    console.log('> [video-robot] FFmpeg still working in: ', command, 'Please wait...');
                })
                .on('error', (error, stdout, stderr) => {
                    console.error('> [video-robot] Error: ', error);
                    console.error('> [video-robot] Ffmpeg stderr: ', stderr);
                })
                .on('end', output => {
                    resolve();
                    console.log('> [video-robot] Finished processing. Video created: ', output);
                })
        });
    }
}

module.exports = robot;