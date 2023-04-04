const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json')
module.exports = {
  name: 'kiss',
  description: 'Envoie un GIF aléatoire d\'un personnage de dessin animé embrassant un autre personnage de dessin animé.',
  usage: 'kiss <lapersonne>',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    const gifapi = '7fnSedoAHUMTnlH7nHUYtr7RhQDaAXw5&q';
    const person = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
    if (!person) return message.channel.send('Personne introuvable, veuillez mentionner une personne ou fournir son ID !');
    const query = `https://api.giphy.com/v1/gifs/random?api_key=${gifapi}&tag=anime-kiss`;
    const response = await fetch(query);
    const data = await response.json();
    if (!data.data || !data.data.images || !data.data.images.original || !data.data.images.original.url) {
      return message.channel.send('Désolé, une erreur est survenue lors de la récupération du GIF. Veuillez réessayer ultérieurement.');
    }
    const gif = data.data.images.original.url;
    const embed = new MessageEmbed()
      .setDescription(`[\`${message.author.tag}\`](${config.support}) a embrassé [\`${person.tag}\`](${config.support}) !`)
      .setImage(gif)
      .setFooter(footer)
      .setColor(color);
    await message.reply({ embeds: [embed] });
  },
};
