const Discord = require('discord.js')

module.exports = {
    name: 'allbot',
    description: 'Affiche une liste de tous les bots sur le serveur.',
    usage: 'allbot',
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
    
        const members = message.guild.members.cache;


        const bots = members.filter(member => member.user.bot);

        // Vérifie si des bots ont été trouvés
        if (bots.size == 0) {
            return message.reply('Il n\'y a aucun bot sur ce serveur.');
        }

        // Construit la liste des bots sous forme de chaîne de caractères
        const botList = bots.map(bot => `[\`${bot.user.tag}\`](https://discord.com/users/${bot.user.id}) | (\`${bot.user.id}\`)`).join('\n');

        const embed = new Discord.MessageEmbed()
        .setTitle('All Bots')
        .setColor(color)
        .setFooter(footer)
        .setDescription(`Voici la liste de tous les bots sur ce serveur:
        ${botList}`)
        message.reply({embeds: [embed]})
    },
};
