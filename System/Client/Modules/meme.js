require('dotenv').config()
var arg = ''

module.exports = {
    name: 'meme',
    description: 'Meme.',
    execute(message, args) {
    
        if (args[1] == '1') {
            
        } else if (args[1] == '2') {
            
        } else if (args[0] == '3') {
            return message.channel.send('https://cdn.glitch.com/6e4955d5-7fc5-4b81-a63a-7eb9d458f69f%2FMi_video2.mp4');
        } else {
            return message.reply('Invalid usage. Use a number or keyword!')
        }
    }
}