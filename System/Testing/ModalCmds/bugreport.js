require('dotenv').config()
import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('bugreport')
  .setDescription('Report a bug to the server');

export default registerCommand.toJSON();