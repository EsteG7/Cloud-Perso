const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json')
module.exports = {
  name: 'support',
  description: 'Donne le lien vers le support.',
  aliases: ["cloud"],
  usage: `support`,
  go: async (client, db, message, args, prefix, color, footer, interaction) => {



    message.reply({content: `Voici le support du bot discord: ${config.support}`,allowedMentions: { repliedUser: false }});
  }}