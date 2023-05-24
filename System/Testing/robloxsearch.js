require('dotenv').config()
const https = require('https');
var discordUser = '';
var taggedUser = '';
module.exports = {
    name: 'robloxsearch',
    description: 'Roblox Search.',
    execute(message, args, client) {
        console.log('Passed whois.');
        if (message.mentions.users.size) {
            taggedUser = message.mentions.users.first();
            discordUser = taggedUser.id;
            requestUser(message, args, client, discordUser);
        } else if (!args[0]) { 
            discordUser = message.author.id;
            requestUser(message, args, client, discordUser);
        } else if (args[0]) {
                discordUser = args[0].match(/^[0-9]+$/);
                requestUser(message, args, client, discordUser);
        } else {
            return message.channel.send('No user provided!');
        }
        function requestUser(message, args, client, discordUser) {
            console.log('Passed args.');
            //var user = client.users.fetch(discordUser)
            //console.log('User passed')
            //if  (!client.users.fetch(discordUser + '')) return message.channel.send('No user provided!');
            //console.log('Found user!')

            var request = 'https://api.rowifi.link/v1/users/' + discordUser;
            console.log(request);
            https.get(request, res => {
                res.setEncoding("utf8");
                let body = "";
                res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    body = JSON.parse(body);
                    console.log(body);
                    if (!body.success) return message.reply('Error on retrieving user on RoWifi API.');
                    var robloxUsername = '';
                    var robloxId = body.roblox_id;
                    request = 'https://users.roblox.com/v1/users/' + robloxId;
                    https.get(request, res => {
                        res.setEncoding("utf8");
                        let body = "";
                        res.on("data", data => {
                            body += data;
                        });
                        res.on("end", () => {
                            body = JSON.parse(body);
                            console.log(body);
                            if (body.hasOwnProperty('errors')) return message.reply('Error on retrieving user on Roblox API.');
                            var x = ``; 
                            x = `Username: \`\`${body.name}\`\`\nDisplay Name: \`\`${body.displayName}`;
                            return message.channel.send(x)
                            
                            
                        });
                    });
                });
            });

        }

    }
}