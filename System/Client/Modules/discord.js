require('dotenv').config()
module.exports = {
    name: 'discord',
    description: 'Discord.',
    aliases: ['disc'],
    execute(message, args) {
        return message.channel.send('https://discord.gg/MPBZaae')
    }
}