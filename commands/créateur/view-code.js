const Discord = require('discord.js');
const config = require('../../config.json')
module.exports = {
  name: 'view-code',
  description: 'Affiche le code de récupération enregistré',
  go: async (client, db, message, args, prefix, footer, interaction) => {
    if (
      config.sown === message.author.id || config.atoya === message.author.id === true ) {
        const color =  db.get(`color_${client.user.id}`) || config.color; 
    const code = db.get('code');
    if (code) {
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(footer)
        .setTitle('Code de récupération')
        .setDescription(`Voici le code de récupération enregistré : **${code}**`);

        message.reply({content: null,allowedMentions: { repliedUser: false },embeds: [embed]});
    } else {
      message.reply({content: 'Aucun code enregistré.',allowedMentions: { repliedUser: false }});
    }
  }}
}
