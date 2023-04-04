// Commande pour ajouter un rôle à un utilisateur
// Usage: !addrole @role/id/nom @user

module.exports = {
    name: 'addrole',
    description: 'Ajoute un rôle spécifié à un utilisateur.',
    usage: 'addrole @role/id/nom @user',
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        
        // Vérifie que le rôle et l'utilisateur sont spécifiés
        if (args.length < 2) {
            return message.reply(`Usage: \`${prefix}addrole @role/id/nom @user\``);
        }

        // Récupère le rôle à ajouter
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args[0]);

        // Vérifie que le rôle est spécifié
        if (!role) {
            return message.reply(`Veuillez spécifier un rôle à ajouter. Usage: \`${prefix}addrole @role/id/nom @user\``);
        }

        // Récupère l'utilisateur à qui ajouter le rôle
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

        // Vérifie que l'utilisateur est spécifié
        if (!user) {
            return message.reply(`Veuillez spécifier un utilisateur. Usage: \`${prefix}addrole @role/id/nom @user\``);
        }

        // Ajoute le rôle à l'utilisateur
        user.roles.add(role).then(() => {
            message.reply(`Le rôle ${role.name} a été ajouté à ${user.displayName}.`);
        }).catch(() => {
            message.reply('Une erreur est survenue lors de l\'ajout du rôle. Veuillez vérifier que le rôle est assignable et que le bot a les permissions nécessaires.');
        });
    },
};
