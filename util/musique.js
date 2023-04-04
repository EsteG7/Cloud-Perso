const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const Discord = require('discord.js');

const queue = new Map();

async function playMusic(message, song) {
  const serverQueue = queue.get(message.guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(message.guild.id);
    return;
  }
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url, { filter: 'audioonly' }))
    .on('finish', () => {
      serverQueue.songs.shift();
      playMusic(message, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolume(serverQueue.volume);
  serverQueue.textChannel.send(`Lecture de la chanson : **${song.title}**`);
}

module.exports = {
  async play(message, query) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('Vous devez être dans un canal vocal pour jouer de la musique!');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.reply('J\'ai besoin des autorisations pour rejoindre et parler dans votre canal vocal!');
    }

    let songInfo;
    let song;

    if (ytdl.validateURL(query)) {
      songInfo = await ytdl.getInfo(query);
      song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
    } else {
      const { items } = await ytsr(query, { limit: 1 });
      if (!items.length) {
        return message.reply(`Je n'ai pas trouvé de résultats pour la recherche: ${query}.`);
      }
      const item = items[0];
      songInfo = await ytdl.getInfo(item.url);
      song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
    }

    if (!queue.has(message.guild.id)) {
      const serverQueue = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 0.5,
        playing: true
      };

      queue.set(message.guild.id, serverQueue);

      serverQueue.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        serverQueue.connection = connection;
        playMusic(message, serverQueue.songs[0]);
      } catch (error) {
        console.error(error);
        queue.delete(message.guild.id);
        return message.reply('Je n\'ai pas pu me connecter au canal vocal!');
      }
    } else {
      const serverQueue = queue.get(message.guild.id);
      serverQueue.songs.push(song);
      return message.channel.send(`**${song.title}** a été ajouté à la file d'attente!`);
    }
  },

  skip(message) {
    if (!message.member.voice.channel) {
      return message.reply('Vous devez être dans un canal vocal pour sauter la musique!');
    }
    if (!queue.has(message.guild.id)) {
      return message.reply('Il n\'y a aucune musique en cours de lecture!');
    }
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue.connection.dispatcher) {
      return message.reply('Il n\'y a aucune musique en cours de lecture!');
    }
    serverQueue.connection.dispatcher.end();
  },
  
   stop(message) {
    const serverQueue = queue.get(message.guild.id);
  
    if (!message.member.voice.channel) {
      return message.reply('Vous devez être dans un canal vocal pour arrêter la musique!');
    }
  
    if (!serverQueue) {
      return message.reply('Il n\'y a aucune musique en cours de lecture!');
    }
  
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
},
   nowPlaying(message) {
    if (!queue.has(message.guild.id)) {
      return message.reply("Il n'y a aucune musique en cours de lecture!");
    }
    const serverQueue = queue.get(message.guild.id);
    const song = serverQueue.songs[0];
    return message.channel.send(`En train de jouer: **${song.title}**`);
},
  
   queue(message) {
    if (!queue.has(message.guild.id)) {
      return message.reply("Il n'y a aucune musique en cours de lecture!");
    }
    const serverQueue = queue.get(message.guild.id);
    let response = `__**Liste de lecture:**__\n`;
    for (let i = 0; i < serverQueue.songs.length; i++) {
      response += `${i + 1}. ${serverQueue.songs[i].title}\n`;
    }
    return message.channel.send(response);
},
  
   pause(message) {
    if (!message.member.voice.channel) {
      return message.reply('Vous devez être dans un canal vocal pour mettre en pause la musique!');
    }
    if (!queue.has(message.guild.id)) {
      return message.reply("Il n'y a aucune musique en cours de lecture!");
    }
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue.connection.dispatcher.paused) {
      serverQueue.connection.dispatcher.pause();
      return message.channel.send('La musique est mise en pause!');
    }
    return message.reply('La musique est déjà en pause!');
},
  
   resume(message) {
    if (!message.member.voice.channel) {
      return message.reply('Vous devez être dans un canal vocal pour reprendre la musique!');
    }
    if (!queue.has(message.guild.id)) {
      return message.reply("Il n'y a aucune musique en cours de lecture!");
    }
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue.connection.dispatcher.paused) {
      serverQueue.connection.dispatcher.resume();
      return message.channel.send('La musique est reprise!');
    }
    return message.reply("La musique n'est pas en pause!");
}}

