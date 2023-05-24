require('dotenv').config()
module.exports = {
    name: 'youtube',
    description: 'Youtube.',
    aliases: ['yt'],
    execute(message, args) {
        return message.channel.send('https://www.youtube.com/channel/UCVIH7Va41Vd2YOuMCXGlJCA')
    }
}