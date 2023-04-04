module.exports = {
    name: 'inviteguild',
    usage: 'inviteguild <id>',
    description: `Permet de générer une invitation pour un serveur Discord à partir de son ID et de l'envoyer en message privé à l'utilisateur.`,
    go: async (client, db, message, prefix, color, footer) => {
     
  
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const guildId = args[1];
      if (!guildId) return message.reply('Veuillez fournir un identifiant de serveur valide !');
      const guild = client.guilds.cache.get(guildId);
      if (!guild) return message.reply('Je ne peux pas trouver ce serveur !');
      const invite = await guild.channels.cache.random().createInvite();
      message.author.send(`Voici l'invitation pour le serveur ${guild.name} : ${invite.url}`);
    }
  }
  