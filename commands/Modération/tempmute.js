const Discord = require("discord.js")
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const ms = require("ms");

module.exports = {
    name: 'tempmute',
    aliases: ["timeout"],
    description: 'Permet de mute temporairement un membre du serveur',
    usage: `tempmute <membre/id> <temps> [raison]`,
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        const tempmutemember = args[0]
        if (!tempmutemember) return message.reply({content: "Veuillez indiquer un membre",allowedMentions: { repliedUser: false }}).catch(() => {});;
            const duration = args[1];
            if (!duration) return message.reply("Veuillez indiquer une durée !");
            if (!ms(duration)) return message.reply("Le temps indiqué est invalide !");
            if (ms(duration) > 2419200000) return message.reply("Le temps ne doit pas être supérieur à 28 jours !");
    
            if (!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) return message.reply("La durée du mute n'est pas correcte !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`");
            
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const reason = args.slice(2).join(" ");
            
            const tempmuteEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`Modération | **\`tempmute\`**`)
                .setDescription(`Vous avez été tempmute du serveur : **${message.guild.name}**\nRaison: **${reason ||"Aucune raison"}**\nFin du mute dans : **${duration}**\n Mute par: **${message.author.tag}** (${message.author.id})`)
                .setFooter(footer);
    
          
    
            await target.timeout(ms(duration), reason);
            target.send({ embeds: [tempmuteEmbed] }).catch(() => {});
            message.reply({content: `Le membre **${target.user.tag}** à été tempmute **${duration}** pour \`${reason ||"Aucune raison"}\`.`,allowedMentions: { repliedUser: false }}).catch(() => {});

            setTimeout(async () => {
                await target.timeout(0, 'Fin du mute');
                message.channel.send(`**${target.user.tag}** a été **untempmute** après **${duration}** de mute.`)
                target.send({content: `Vous êtes maintenant **untempmute** du serveur **${message.guild.name}**.`}).catch(() => {});
            }, ms(duration));
        
        }
    }
};
