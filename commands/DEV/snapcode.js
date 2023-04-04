const { MessageEmbed } = require('discord.js')
const ms = require("ms");
const { search } = require('superagent');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
module.exports = {
    name: 'snapcode',
    aliases: ["snap"],
    description: 'Affiche le snapcode du snap précisé',
    usage: 'snap <nom du compte>',
    go: async (client,db,message,args,prefix,color,footer,interaction) => {
       
        const pseudo = args[0]
    
        const snapcode = `https://feelinsonice.appspot.com/web/deeplink/snapcode?username=${pseudo}&size=320&type=PNG`

        const searche = new MessageEmbed()
        .setDescription(`${message.author}, vous devez mettre un pseudo Snap pour faire la recherche.`)

        if (!args.length) return message.channel.send(searche)
       
       
        const embed = new MessageEmbed()
        .setDescription("Voici votre recherche du snapcode: `\n"+pseudo+"`")
        .setImage(snapcode)
        .setColor(color)         
        message.channel.send({embeds: [embed]});

    }
}