const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
  name: 'slap',
  description: 'Envoie un GIF aléatoire d\'un personnage de dessin animé frappant un autre personnage de dessin animé.',
  usage: 'slap <lapersonne>',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    const gifapi = '7fnSedoAHUMTnlH7nHUYtr7RhQDaAXw5&q';
    const person = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!person) return message.channel.send('Veuillez mentionner un utilisateur ou fournir un ID utilisateur valide.');
    const query = `https://api.giphy.com/v1/gifs/random?api_key=${gifapi}&tag=anime-slap`;
    const response = await fetch(query);
    const data = await response.json();
    if (!data.data || !data.data.images || !data.data.images.original || !data.data.images.original.url) {
      return message.channel.send('Désolé, une erreur est survenue lors de la récupération du GIF. Veuillez réessayer ultérieurement.');
    }
    const gif = data.data.images.original.url;
    const embed = new MessageEmbed()
      .setDescription(`[\`${message.author.tag}\`](${config.support}) a frappé [\`${person.user.tag}\`](${config.support}) ! 👊`)
      .setImage(gif)
      .setColor(color)
      .setFooter(footer);
    await message.reply({ embeds: [embed] });
  },
};
