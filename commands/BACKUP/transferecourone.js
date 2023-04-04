const Discord = require('discord.js');
const config = require('../../config.json');

let currentCrownUser; // Variable pour stocker l'utilisateur qui possède actuellement la couronne

module.exports = {
  name: 'transfercrown',
  aliases: [],
  description: 'Permet au bot de transférer sa couronne à un membre mentionné',
  usage: `transfercrown <@utilisateur>`,
  go: async (client, db, message, args, prefix, color, footer) => {
    // Vérifiez si l'utilisateur qui a envoyé le message est le propriétaire du serveur.
  
    
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Veuillez mentionner un utilisateur valide !');
    }
    
    // Transférez la couronne à l'utilisateur mentionné.
    currentCrownUser = user;
    message.channel.send(`La couronne a été transférée à ${user} !`);
  }
}
