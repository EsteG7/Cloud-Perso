const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'autoreact-off',
  aliases: [],
  description: 'Désactive la réaction automatique sur ce canal',
  usage: 'autoreact-off',
  go: async (client,db,message,args,prefix,color,footer,interaction) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    const channel = message.channel;

    const autoReactions = db.get(`autoReactions.${channel.id}`);
    if (!autoReactions) {
      return message.channel.send("Il n'y a pas de réactions automatiques sur ce canal.");
    }

    db.delete(`autoReactions.${channel.id}`);
    await message.channel.send("Je ne vais plus réagir automatiquement aux nouveaux messages !");
  }
}}
