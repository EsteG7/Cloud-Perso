module.exports = {
    name: 'unbanall',
    description: 'Unbanall tous les user ban.',
    usage: `unbanall`,
    go: async (client, db, message, args, prefix, color, footer) => {
      

        const bans = await message.guild.bans.fetch();

        if (bans.size == 0) { 
            return message.reply({ content: "Il n'y a aucun membre banni sur ce serveur.", allowedMentions: { repliedUser: false } });
        }

        try {
            bans.forEach(async (ban) => {
                await message.guild.bans.remove(ban.user.id);
            });

            message.reply({ content: `**${bans.size}** membres ont été débannis avec succès.`, allowedMentions: { repliedUser: false } });
        } catch (error) {
            console.error(error);
            message.reply('Une erreur est survenue lors de la tentative de débannissement des utilisateurs.');
        }
    }
}
