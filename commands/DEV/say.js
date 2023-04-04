const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'say',
  description: 'Permet d\'envoyer un message avec le bot',
  usage: 'say <text>',
  go: async (client,db,message,args,prefix,color,footer,interaction) => {

    let tosay = args.join(' ');
    if (!tosay) return message.reply(`Utilisation: \`${prefix}${this.usage}\``);
    if (tosay.includes('https://discord.gg/') || tosay.includes('.gg/')  || tosay.includes('gg/'  || tosay.includes('discord.gg/'))) return;
    if ((tosay.includes('@everyone') || tosay.includes('@here')) && !message.member.permissions.has('MENTION_EVERYONE')) return;

    message.delete();
    message.channel.send(tosay);
  }
};