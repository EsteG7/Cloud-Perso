const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'autoreact',
  aliases: [],
  description: 'Ajoute une réaction automatique à chaque message dans le canal',
  usage: `autoreact <emoji> [emoji2]`,
  go: async (client,db,message,args,prefix,color,footer,interaction) => {
      const channel = message.channel;
      const emoji1 = args[0];
      const emoji2 = args[1];
      let emoji1Type, emoji2Type;

      if (!emoji1) {
        return message.channel.send(`Veuillez spécifier au moins un emoji à réagir automatiquement. Usage : \`${prefix}autoreact <emoji> [emoji2]\``);
      }

      const emojiRegex = /<a?:\w+:\d+>|<:\w+:\d+>|[\u2700-\u27bf\u2B50-\u2B55\u3297\u3299\uE000-\uF8FF]/;
      if (!emojiRegex.test(emoji1)) {
        return message.channel.send('Le premier emoji spécifié est invalide.');
      }
      if (emoji1.startsWith('<a:')) {
        emoji1Type = 'animated';
      } else {
        emoji1Type = 'regular';
      }

      if (emoji2) {
        if (!emojiRegex.test(emoji2)) {
          return message.channel.send('Le deuxième emoji spécifié est invalide.');
        }
        if (emoji2.startsWith('<a:')) {
          emoji2Type = 'animated';
        } else {
          emoji2Type = 'regular';
        }
      }

      const autoReactions = db.get(`autoReactions.${channel.id}`) || [];
      autoReactions.push({ name: emoji1, type: emoji1Type });
      if (emoji2) {
        autoReactions.push({ name: emoji2, type: emoji2Type });
      }
      db.set(`autoReactions.${channel.id}`, autoReactions);

      await message.channel.send("Je vais ajouter les réactions à tous les nouveaux messages !");
    }
  }
