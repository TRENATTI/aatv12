// By ScriptIntelligence

// Structure Setup

// node_modules
// modules
// settings
// events
// startup
// functions

// // //

const fs = require('fs');
const discord = require('discord.js');
//const { Client, GatewayIntentBits } = require('discord.js');
const noblox = require('noblox.js')
require('dotenv').config()

// // //

const clientSystem = './System/Client';

// // //

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const rbxcookie = process.env.RBXCOOKIE
//


const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
//const client = new Client({
//	intents: [
//		GatewayIntentBits.Guilds,
//		GatewayIntentBits.GuildMessages,
//		GatewayIntentBits.MessageContent,
//		GatewayIntentBits.GuildMembers,
//	],
//});
//


client.login(token);

async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie(`${rbxcookie}`) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

    // Do everything else, calling functions and the like.
}

startApp()

//

const clientFiles = fs.readdirSync(clientSystem).filter(file => file.endsWith('.js'));

for (const file of clientFiles) {
    const clientFile = require(clientSystem + '/' + file)
    clientFile(client, noblox);
}

//const clientFilesMjs = fs.readdirSync(clientSystem + '/Mjs').filter(file => file.endsWith('.mjs'));

//for (const file2 of clientFilesMjs) {
//    const clientFile2 = require(clientSystem + '/Mjs/' + file2)
    //clientFile2(client);
//}

// node -e "console.log(require('dotenv').config())"