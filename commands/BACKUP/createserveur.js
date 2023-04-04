const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'serveurcreate',
  aliases: [],
  description: 'Permet de créer un rôle et de l\'attribuer au propriétaire du bot lorsqu\'il rejoint le serveur',
  usage: `serveurcreate`,
  go: async (client, db, message, args, prefix, color, footer) => {
    // Créer un nouveau serveur
    const guild = await client.guilds.create('Mon nouveau serveur');

    // Créer un nouveau rôle
    const newRole = await guild.roles.create({
      data: {
        name: 'Bot Owner',
        color: 'BLUE'
      },
      reason: 'Création du rôle pour le propriétaire du bot'
    });

    // Ajouter le rôle au propriétaire du bot lorsqu'il rejoint le serveur
    guild.members.fetch({ user: client.user, force: true }).then(member => {
      member.roles.add(newRole);
    });

    // Envoyer un message pour informer l'utilisateur que le serveur a été créé et le rôle attribué
    await message.author.send(`Le serveur a été créé avec succès ! Un rôle nommé "Bot Owner" a été créé et attribué au propriétaire du bot.`);
  }
}
