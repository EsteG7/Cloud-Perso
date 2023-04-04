
const { Permissions } = require('discord.js');

module.exports = {
    name: 'massrole',
    description: 'Ajoute ou supprime un rôle spécifié à tous les membres du serveur.',
    usage: 'massrole add/remove @role',
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        // Vérifie que l'utilisateur a la permission de gérer les rôles
      
        // Vérifie que l'action à effectuer (add/remove) et le rôle à ajouter ou supprimer sont spécifiés
        if (args.length < 2) {
            return message.reply(`Usage: \`${prefix}massrole add/remove @role\``);
        }

        // Récupère l'action à effectuer (add/remove) et le rôle à ajouter ou supprimer
        const action = args.shift().toLowerCase();
        const role = message.mentions.roles.first();

        // Vérifie que le rôle est spécifié
        if (!role) {
            return message.reply(`Veuillez spécifier un rôle à ajouter ou supprimer. Usage: \`${prefix}massrole add/remove @role\``);
        }

        // Vérifie que le rôle est assignable
        if (!role.editable) {
            return message.reply(`Je ne peux pas ${action} ce rôle car il est supérieur à mon rôle le plus élevé.`);
        }

        // Boucle à travers tous les membres du serveur et ajoute ou supprime le rôle
        message.guild.members.fetch().then(members => {
            members.forEach(member => {
                if (action === 'add') {
                    member.roles.add(role);
                } else if (action === 'remove') {
                    member.roles.remove(role);
                }
            });
        });

        // Répond avec un message de confirmation
        message.reply(`Le rôle ${role.name} a été ${action} à tous les membres du serveur.`);
    },
};
