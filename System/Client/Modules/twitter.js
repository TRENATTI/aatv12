require('dotenv').config()
module.exports = {
    name: 'twitter',
    description: 'Twitter.',
    execute(message, args) {
        return message.channel.send('https://twitter.com/OfficialRBXAA')
    }
}