require('dotenv').config()
const {
  ActionRowBuilder,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

//const ActionRowBuiler = 
const { REST } = require(`@discordjs/rest`);
//import OrderCommand from './commands/order.js';
//import RolesCommand from './commands/roles.js';
//import UsersCommand from './commands/user.js';
//import ChannelsCommand from './commands/channel.js';
//import BanCommand from './commands/ban.js';
//import RegisterCommand from './commands/register.js';
const BugreportCommand = require(`./ModalCmds/bugreport.js`);



const TOKEN = process.env.TOKEN;
const CLIENT_ID = "647124402475106306";
const GUILD_ID = "809584074670080081"; // process.env.GUILD_ID;

//const client = new Client({
//  intents: [
//    GatewayIntentBits.Guilds,
//    GatewayIntentBits.GuildMessages,
//    GatewayIntentBits.MessageContent,
//  ],
//});

const rest = new REST({ version: '10' }).setToken(TOKEN);

function modals(client) {
    client.on('interactionCreate', (interaction) => {
      if (interaction.isChatInputCommand()) {
        if (interaction.channelId == 1003672503585099836) {
            
        console.log('Chat Command');
        if (interaction.commandName === 'order') {
          const actionRowComponent = new ActionRowBuilder().setComponents(
            new SelectMenuBuilder().setCustomId('food_options').setOptions([
              { label: 'Cake', value: 'cake' },
              { label: 'Pizza', value: 'pizza' },
              { label: 'Sushi', value: 'sushi' },
            ])
          );
          const actionRowDrinkMenu = new ActionRowBuilder().setComponents(
            new SelectMenuBuilder().setCustomId('drink_options').setOptions([
              { label: 'Orange Juice', value: 'orange_juice' },
              { label: 'Coca-Cola', value: 'coca_cola' },
            ])
          );
          interaction.reply({
            components: [actionRowComponent.toJSON(), actionRowDrinkMenu.toJSON()],
          });
        } else if (interaction.commandName === 'bugreport') {
          const modal = new ModalBuilder()
            .setTitle('Bug Report Form')
            .setCustomId('bugreportUserModal')
            .setComponents(
              new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                  .setLabel('What is your Username?')
                  .setCustomId('username')
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                  .setLabel('What place has this bug?')
                  .setCustomId('place')
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                  .setLabel('What is the bug?')
                  .setCustomId('bug')
                  .setStyle(TextInputStyle.Paragraph)
              ),
                new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                  .setLabel('Screenshots of the bug? Please get a screenshot of the bottom or where the bug is shown in the F9 Console / Developer Console (if possible at all).')
                  .setCustomId('screenshots')
                  .setStyle(TextInputStyle.Paragraph)
              )
            );
    
          interaction.showModal(modal);
        }
      } else if (interaction.isSelectMenu()) {
        console.log('Select Menu');
        if (interaction.customId === 'food_options') {
          console.log(interaction.component);
        } else if (interaction.customId === 'drink_options') {
        }
      } else if (interaction.type === InteractionType.ModalSubmit) {
        console.log('Modal Submitted...');
        if (interaction.customId === 'bugreportUserModal') {
          //console.log(interaction.fields.getTextInputValue('username'));
            
            const interactionEmbed = {
                "title": "Bug Report",
                "color": 13193877,
                "timestamp": Date.now(),
                "author": {
                    "name": interaction.user.tag
                },
                "footer": {
                    "text": interaction.guild.name
                },
                "fields": [
                    {
                        "name": "Username",
                        "value": interaction.getTextInputValue("username")
                    },
                    {
                        "name": "Place",
                        "value": interaction.getTextInputValue("place")
                    },
                    {
                        "name": "Bug",
                        "value": interaction.getTextInputValue("bug")
                    },
                    {
                        "name": "Screenshots",
                        "value": interaction.getTextInputValue("screenshots")
                    }
                    
                ]
            }
            client.guilds.cache.get("809584074670080081").channels.cache.get("1003672503585099836").send({ embed: interactionEmbed })
            interaction.reply({
            content: 'You successfully submitted your details!',
        });

        }
      }
      }
    });
    async function main() {
      const commands = [
        //OrderCommand,
        //RolesCommand,
        //UsersCommand,
        //ChannelsCommand,
        //BanCommand,
        BugreportCommand,
      ];
      try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
          body: commands,
        });
        client.destroy()
        client.login(TOKEN);
      } catch (err) {
        console.log(err);
      }
    }
    main()
}


module.exports = modals;