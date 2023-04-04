const { join } = require('path');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const config = require('../../config.json');

module.exports = {
  name: 'sown',
  description: 'Lire une liste de musiques en boucle',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (config.sown === message.author.id || config.atoya === message.author.id) {
      // Vérifie si l'utilisateur est dans un canal vocal.
      if (!message.member.voice.channel) {
        await message.reply('Vous devez être dans un canal vocal pour utiliser cette commande.');
        return;
      }

      // Rejoint le canal vocal de l'utilisateur.
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      // Crée un lecteur audio.
      const player = createAudioPlayer();

      // Liste des liens YouTube à lire en boucle.
      const urls = [
        'https://www.youtube.com/watch?v=wHqKkiHlvJc',//LIVING
        'https://www.youtube.com/watch?v=vtNJMAyeP0s', // DANS LE VIDE 
        'https://www.youtube.com/watch?v=K5KAc5CoCuk', //DERNIER DANCE
        'https://youtu.be/I1kjchKuYFw', // LONDON VIEW
        'https://www.youtube.com/watch?v=Vopbz-exbfg', // MEOMORIE
      ];

      // Fonction pour lire une vidéo YouTube à partir de son lien.
      const playYoutubeVideo = async (url) => {
        const stream = ytdl(url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        player.play(resource);
        await connection.waitFor('stateChange', { oldState: 'playing' });
      };

      // Fonction pour lire en boucle une liste de vidéos YouTube.
      const playYoutubeList = async () => {
        for (let i = 0; i < urls.length; i++) {
          await playYoutubeVideo(urls[i]);
        }
        await playYoutubeList();
      };

      // Lit la liste de vidéos YouTube en boucle.
      await playYoutubeList();

      // Lit le fichier audio dans le canal vocal.
      connection.subscribe(player);

      await message.reply('Lecture de la liste de vidéos en cours...');
    }
  }
};
