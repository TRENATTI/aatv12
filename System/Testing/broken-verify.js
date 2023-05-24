require('dotenv').config()
const axios = require('axios')
var discordUser = '';
var taggedUser = '';

module.exports = {
    name: 'broken-verify',
    description: 'Verify.',
    execute(message, args) {
        // return message.channel.send('Testing!')
        if (message.mentions.users.size) {
            taggedUser = message.mentions.users.first();
            discordUser = taggedUser.id;
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
            var request = 'https://verify.eryn.io/api/user/' + discordUser;
            axios.get(request)
                .then(resp => {
                    if (resp.status == "error") return message.reply('Error on retrieving user on RoVer API');
                    var robloxUsername = '';
                    var robloxId = resp.robloxId;
                    request = `https://users.roblox.com/v1/users/${robloxId}`;
                    axios.get(request)
                        .then(resp => {
                            if (resp.hasOwnProperty('errors')) return message.reply('Error on retrieving user on Roblox API.');
                            robloxUsername = resp.name;
                            robloxId = resp.id;
                            axios.get(`https://groups.roblox.com/v1/users/${robloxId}/groups/roles`)
                                .then(resp => {
                                    console.log(resp.data);
                                    for (const group of resp.data.data) {
                                        console.log(group.group.id);
                                        if (group.group.id == 790907) {
                                            return message.channel.send('You are in Alpha Authority!');
                                        }
                                    }
                                })
                                .catch(err => console.error(err));
                        })
                        .catch(err => {
                            console.error(err);
                        });
                        
                })
                .catch(err => {console.error(err);})
            .catch(error => console.log(error));
        }
    }
    
}