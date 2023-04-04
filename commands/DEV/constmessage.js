const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'constmessage',
  description: 'Définit un message à renvoyer constamment dans un canal',
  usage: 'constmessage <ID du message>',
  go: async (client,db,message,args,prefix,color,footer,interaction) => {
    const messageId = args[0];
    let channel = message.channel;

    if (!messageId) {
      return  message.reply({content: `Utilisation: \`${prefix}${this.usage}\`\nVeuillez fournir l'ID du message à enregistrer.`,embeds: [embed],allowedMentions: { repliedUser: false }});
   
    }

    const fetchedMessage = await channel.messages.fetch(messageId, false, true);
    if (!fetchedMessage) {
      return message.reply({content: `'Le message spécifié n\'existe pas ou est inaccessible.'`,allowedMentions: { repliedUser: false }});
    }

    db.set(`constMessage.${channel.id}`, messageId);
    const embed = new MessageEmbed()
      .setColor(color)
      .setFooter(footer)
      .setTitle('Message enregistré')
      .setDescription(`Le message ${messageId} a été enregistré et sera renvoyé constamment.`);
    return  message.reply({content: null,embeds: [embed],allowedMentions: { repliedUser: false }});
   
  }
};
