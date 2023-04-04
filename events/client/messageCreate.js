const { retry } = require('async');
const { EmbedBuilder, WebhookClient, MessageButton, MessageEmbed } = require('discord.js');
module.exports = async (client, db, message) => { 
    if (message.author.bot) return;
    // CONSTEN MESSAGE 
    const channelId = message.channel.id;
const constMessageId = db.get(`constMessage.${channelId}`);

if (constMessageId) {
  const fetchedMessage = await message.channel.messages.fetch(constMessageId, false, true);
  if (fetchedMessage) {
    message.channel.send({ content: fetchedMessage.content });
  }
}
    
// AUTO REACT
if (message.author.bot) return;

// Récupérer les réactions automatiques pour ce canal
const autoReactions = db.get(`autoReactions.${message.channel.id}`) || [];

// Ajouter les réactions à chaque nouveau message
for (const { name, type } of autoReactions) {
  try {
    const emojiName = name.split(':')[2];
    const emojiId = emojiName.slice(0, -1);
    const emoji = type === 'animated' ? message.client.emojis.cache.find(emoji => emoji.animated && emoji.id === emojiId) : message.client.emojis.cache.get(emojiId);

    if (emoji) {
      await message.react(emoji);
    } else {
      console.error(`Impossible de trouver l'emoji ${name} pour ajouter au message ${message.id}`);
    }
  } catch (error) {
    console.error(`Impossible d'ajouter la réaction ${name} au message ${message.id} : ${error}`);
  }
}





    if (message.channel.type == "DM") return;

    const prefix = db.get(`prefix_${message.guild.id}`) === null ? client.config.prefix : db.get(`prefix_${message.guild.id}`);
    const color = db.get(`color_${message.guild.id}`) === null ? client.config.color : db.get(`color_${message.guild.id}`);
    const footer = db.get(`footer_${message.guild.id}`) === null ? client.config.footer : db.get(`footer_${message.guild.id}`);

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)) !== null) {
            return message.reply({ content: `Mon prefix est : \`${prefix}\``, allowedMentions: { repliedUser: false } })
        
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command) command.go(client, db, message, args, prefix, color, footer);
    
    




}

