const Discord = require('discord.js');
let started_time_duration = ""
let time_duration = ""
const ms = require("ms")
module.exports = {
    name: 'start',
    usage: 'giveaway',
    description: `Permet de lancer un Giveaway sur le serveur.`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {


           

            let giveawayChannel = message.mentions.channels.first() 

            if (!giveawayChannel) {
                return message.reply(":x: Vous devez mentionner un salon valide !");
            }


            let giveawayDuration = args[1];

            if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
                return message.reply(":x: Vous devez spécifier un durée valide!");
            }


            let giveawayNumberWinners = parseInt(args[2]);

            if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
                return message.reply(
                    ":x: Vous devez spécifier le nombre de gagnants !"
                );
            }

            let giveawayPrize = args.slice(3).join(" ");

            if (!giveawayPrize) {
                return message.reply(":x: Vous devez spécifier un gain valide !");
            }

            await client.giveawaysManager.start(giveawayChannel, {

                duration: ms(giveawayDuration),

                prize: giveawayPrize,

                winMessage: 'Félicitation, {winners}! Tu as gagné **{this.prize}**!',

                noWinner: 'Giveaway annulé, aucun membre n\'a participé.',

                winnerCount: parseInt(giveawayNumberWinners),

                hostedBy: true ? message.author : null,

                message
            });
            message.reply(`Giveaway lancé !`);


          

        }
    }
}