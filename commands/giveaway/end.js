module.exports = {
    name: 'end',
    usage: 'end',
    description: `Termine un Giveaway sur le serveur.`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

        
            if (!args[0])
            return message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``)

            client.giveawaysManager.end(args[0], 'Giveaway annulé, aucun membre n\'a participé.', {
                winMessage: 'Félicitation, {winners}! Tu as gagné **{this.prize}**!',

                messages: {
                    congrat: ':tada: Félicitation {winners}, tu as gagné **{this.prize}**!',
                    error: 'Aucun membre de participe à ce giveaway, le(s) gagnant(s) ne peuvent pas être choisi!'
                }
            })
            .catch(() => message.reply(`Aucun giveaway de trouvé pour \`${args[0] || 'rien'}\``))
          
        }
        }
    }
