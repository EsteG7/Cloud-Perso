const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempban',
    description: 'Bannit temporairement un utilisateur du serveur.',
    usage: `tempban <user> <temps> <raison>`,
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply(`\`❌\` Aucune personne trouvée !`)

        let temps = args[1]
        let raison = args.slice(2).join(' ')
        if (!raison) raison = "Aucune raison donnée"
        if (isNaN(ms(temps))) return message.reply("Veuillez indiquer une durée pour le tempban !")

        member.ban({
            reason: `Banni par **${message.author.tag}** pendant **${temps}** pour **${raison}**`,
            days: 0
        }).catch(() => false)

        const embed = new MessageEmbed()
        .setDescription(`${member} a été temporairement banni par ${message.author.tag} pendant ${temps} pour: ${raison}`)
        .setFooter(footer)
        .setColor(color)

        message.channel.send({embeds: [embed]})

        setTimeout(() => {
            message.guild.members.unban(member, `Fin du tempban de **${member}**`).catch(() => false)
        }, ms(temps));
    }
}}
