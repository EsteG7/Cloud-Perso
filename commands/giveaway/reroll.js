module.exports = {
    name: 'reroll',
    usage: 'reroll',
    description: `Permet de reroll un Giveaway sur le serveur.`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

          

            if (!args[0])
            return message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``)
        
            await client.giveawaysManager.reroll(args[0], {
                messages: {
                    congrat: ':tada: Nouveau gagnant(s): {winners}! Félicitation, tu as gagné **{this.prize}**!',
                    error: 'Aucun membre de participe à ce giveaway, le(s) gagnant(s) ne peuvent pas être choisi!'
                }
            })
            .catch(() => message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``))
        }
    }
}