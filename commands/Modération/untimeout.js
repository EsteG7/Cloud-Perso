const Discord = require("discord.js")
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const ms = require("ms");

module.exports = {
    name: "untempmute",
    aliases: ["untimeout"],
    description: 'Permet de retire le mute temporairement un membre du serveur',
    usage: `untempmute <membre/id> <temps> [raison]`,
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
            var reason = args.slice(1).join(" ");

            if (!reason) {
                reason = "`Aucune raison fournie`"
            }

            await message.guild.members.cache.get(target.id).timeout(ms("0"), reason);
            message.channel.send(`**${target.user.tag}** a été **untempmute** par **${message.author.tag}** pour la raison \`${reason ||"Aucune raison"}\``)
            
        
            }
            }
        }

