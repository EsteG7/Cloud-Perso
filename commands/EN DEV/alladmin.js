// Commande pour afficher la liste de tous les administrateurs sur le serveur
// Usage: !alladmin

module.exports = {
    name: 'alladmin',
    description: 'Affiche une liste de tous les administrateurs sur le serveur.',
    usage: 'alladmin',
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        // Récupère la liste des membres du serveur
        const members = message.guild.members.cache;

        // Filtrer les membres qui ont la permission d'administrer le serveur
        const admins = members.filter(member => member.permissions.has('ADMINISTRATOR'));

        // Vérifie si des administrateurs ont été trouvés
        if (admins.size == 0) {
            return message.reply('Il n\'y a aucun administrateur sur ce serveur.');
        }

        // Construit la liste des administrateurs sous forme de chaîne de caractères
        const adminList = admins.map(admin => `[\`${admin.user.tag}\`](https://discord.com/users/${admin.user.id}) | (\`${admin.user.id}\`)`).join('\n');

        // Crée un nouvel embed pour afficher la liste des administrateurs
        const adminEmbed = {
            color: color,
            title: 'Liste de tous les administrateurs sur ce serveur:',
            description: adminList,
            footer: {
                text: footer,
                icon_url: client.user.displayAvatarURL()
            },
        };

        // Envoie l'embed contenant la liste des administrateurs dans le canal de discussion
        message.channel.send({ embeds: [adminEmbed] });
    },
};
