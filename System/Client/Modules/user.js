require('dotenv').config()
module.exports = {
    name: 'user',
    description: 'Userinfo..',
    aliases: ['userinfo', 'user-info','whois'],
    execute(message, args) {
        return message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}