require('dotenv').config()
module.exports = {
    name: 'script',
    description: 'ScriptIntelligence.',
    aliases: ['si','scriptintelligence','scriptflux','scrizeebe'],
    execute(message, args) {
        return message.channel.send('https://www.roblox.com/users/37111780/profile')
    }
}