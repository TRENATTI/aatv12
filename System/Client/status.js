require('dotenv').config()
const { ActivityType } = require('discord.js'); // Discord.js V14
function status(client) {
    const prefix = process.env.PREFIX
    client.on('ready', () => {
        console.log("I'm in");
        console.log(client.user.username);
        //client.user.setActivity('\"' + prefix + '\"', {type: "LISTENING"}); 
        const activities = [
			`${client.guilds.cache.size} servers!`,
			`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members!`
		];

		let i = 0;
		//setInterval(() => client.user.setActivity(process.env.PREFIX + `help | ${activities[i++ % activities.length]}`, { type: 'LISTENING' }), 15000); -- Discord.js V12
        //client.user.setPresence({
        //    activities: [{ name: `${process.env.PREFIX} help | ${activities[i++ % activities.length]}`, type: ActivityType.Listening }],
        //    status: 'online',
        //  }, 15000); // -- Discord.js V14
    });
}

module.exports = status;