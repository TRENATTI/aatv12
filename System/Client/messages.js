require('dotenv').config()
function messages(client) {
    client.on('message', message => {
        if (message.author.bot) return
        if (message.content.toLowerCase() == 'hi') {
           //message.channel.send('hello there <@' + message.author.id + '>')
        }
        if (message.content.toLowerCase() == ':)') {
           //message.channel.send('(:')
        }
        if (message.content.toLowerCase().indexOf('birthday') != -1) {
           //message.channel.send('Happy Birthday!!!')
        }
        if (message.content.toLowerCase().indexOf(process.env.M_HR) != -1) {
           message.reply({ files: ["https://cdn.discordapp.com/attachments/591048589908901928/996103534107967568/AAMemesOperationMetaburn.gif"] })
            message.delete()
        }
    });
    
}

module.exports = messages;