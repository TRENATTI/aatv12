require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const admin = require('firebase-admin')

//

const SA_PRIVATE_KEY = process.env.SA_PRIVATE_KEY.split("\\n").join("\n")
//console.log(`${SA_PRIVATE_KEY}`)

//var serviceAccount = require('./Modules/Firebase/alapha-c7845-firebase-adminsdk-czfz3-7ff2f06b08.json')
var serviceAccount = {
  type: process.env.SA_TYPE,
  project_id: process.env.SA_PROJECT_ID,
  private_key_id: process.env.SA_PRIVATE_KEY_ID,
  private_key: SA_PRIVATE_KEY,
  client_email: process.env.SA_CLIENT_EMAIL,
  client_id: process.env.SA_CLIENT_ID,
  auth_uri: process.env.SA_AUTH_URI,
  token_uri: process.env.SA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SA_CLIENT_X509_CERT_URL
}

const moduleSystem = './System/Client/Modules'
const moduleNobloxSystem = './System/Client/Noblox_Modules'
//

const moduleFiles = fs.readdirSync(moduleSystem).filter(file => file.endsWith('.js'));
const moduleNobloxFiles = fs.readdirSync(moduleNobloxSystem).filter(file => file.endsWith('.js'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.SA_DATABASEURL
});

//


function commands(client, noblox) {
    client.commands = new Discord.Collection()
    for (const file of moduleFiles) {
	    const commandFile = require('./Modules/' + file);
	    client.commands.set(`normal.${commandFile.name}`, commandFile)
    }
    for (const file of moduleNobloxFiles) {
	    const commandFile = require('./Noblox_Modules/' + file);
	    client.commands.set(`roblox.${commandFile.name}`, commandFile)
    }
    client.on('message', message => {
        if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return
        const args = message.content.slice(process.env.PREFIX.length).split(' ');
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(`normal.${commandName}`)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(`normal,.${commandName}`));
        const noblox_command = client.commands.get(`roblox.${commandName}`)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(`roblox.${commandName}`));
        if (command){ 
            if (command.guildOnly && message.channel.type === 'dm'){ // || noblox_command.guildOnly && message.channel.type.type === 'dm') {
                return message.reply('I can\'t execute that command inside DMs!');
            } // SEE LINE 55 (message.channel.type.dm)
        
        
            if (command.args && !args.length) {
                let reply = `You didn't provide any arguments, ${message.author}!`;
                if (command.usage) {
                    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
                }
                
                return message.channel.send(reply);
            }
        
            try {
                if (command) {
                    command.execute(message, args, client, admin);
                }
            } catch {
                message.reply('Unavailable command!');
                console.log('Failed!');
            }
        } else if (noblox_command){
            if (noblox_command.guildOnly && message.channel.type.type === 'dm') {
                return message.reply('I can\'t execute that command inside DMs!');
            } // SEE LINE 55 (message.channel.type.dm)
        
        
            if (noblox_command.args && !args.length) {
                let reply = `You didn't provide any arguments, ${message.author}!`;
                if (noblox_command.usage){
                    reply += `\nThe proper usage would be: \`${prefix}${noblox_command.name} ${noblox_command.usage}\``;
                }
                
                return message.channel.send(reply);
            }
        
            try {
                if (noblox_command) {
                    noblox_command.execute(message, args, noblox, client, admin)
                }
            } catch {
                message.reply('Unavailable command!');
                console.log('Failed!');
            }
        }
    });
}

module.exports = commands;