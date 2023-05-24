require('dotenv').config()
module.exports = {
    name: 'group',
    description: 'AA.',
    aliases: ['alphaauthority','aa'],
    execute(message, args) {
        return message.channel.send('https://www.roblox.com/My/Groups.aspx?gid=790907')
    }
}