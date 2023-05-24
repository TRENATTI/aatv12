require('dotenv').config()
const https = require('https');
var discordUser = '';
var taggedUser = '';

module.exports = {
    name: 'verify',
    description: 'Verify.',
    aliases: ['getroles'],
    execute(message, args) {
        console.log('Passed whois.');
        if (message.mentions.users.size) {
            taggedUser = message.mentions.users.first();
            discordUser = taggedUser;
            discordUser = taggedUser.id
            requestUser(message, args, message.client, discordUser);
        } else if (!args[1]) { 
            discordUser = message.author.id;
            requestUser(message, args, message.client, discordUser);
        } else if (args[1]) {
                discordUser = args[1].match(/^[0-9]+$/);
                requestUser(message, args, message.client, discordUser);
        } else {
            return message.channel.send('No user provided!');
        }
        function requestUser(message, args, client, discordUser) {
            console.log('Passed args.');
            //var user = client.users.fetch(discordUser)
            //console.log('User passed')
            //if  (!client.users.fetch(discordUser + '')) return message.channel.send('No user provided!');
            //console.log('Found user!')

            var request = 'https://verify.eryn.io/api/user/' + discordUser;
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
                    if (body.status == "error") return message.reply('Error on retrieving user on RoVer API');
                    var robloxUsername = '';
                    var robloxId = body.robloxId;
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
                            var robloxUsername = body.name;
                            var robloxId = body.id;
                            request = `https://groups.roblox.com/v1/users/` + robloxId+ `/groups/roles`
                            https.get(request, res => {
                                res.setEncoding("utf8");
                                let body = "";
                                res.on("data", data => {
                                    body += data;
                                });
                                res.on("end", () => {
                                    body = JSON.parse(body);
                                    console.log(body);
                                    for (const group of body.data) {
                                        console.log(group.group.id);
                                        if (group.group.id == 790907) {
                                            return message.channel.send(robloxUsername + ' (' + robloxId + ') is in Alpha Authority!');
                                        }
            
                                    }
                                    return message.channel.send(robloxUsername + ' (' + robloxId + ') is NOT in Alpha Authority.');
                                });
                            });
                            //return message.channel.send('Username: ' + robloxUsername + '; ID: ' + robloxId);
                        });
                    });
                });
            });

        }

    }
}