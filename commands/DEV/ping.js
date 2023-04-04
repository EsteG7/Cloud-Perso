const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    aliases: ["speed"],
    description: 'Permet d\'afficher la latence du bot',
    usage: 'ping',
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {


const pingUser = Date.now() - message.createdTimestamp;
let emojiUser;
if(pingUser <= 200) { emojiUser = "🟢" } 
else if (pingUser <= 400 && pingUser >= 200) { emojiUser = "🟠" }
else if(pingUser >= 400) {emojiUser = "🔴" };
const APIPing = client.ws.ping;
let APIemoji;
if(APIPing <= 200) { APIemoji = "🟢" }
else if(APIPing <= 400 && APIPing >= 200) { APIemoji = "🟠" }
else if(APIPing >= 400) {APIemoji = "🔴" }

let PingEmbed = new Discord.MessageEmbed()
    .setFooter(footer)
    .setDescription(`
    \`${emojiUser}\`Votre ping : **${pingUser}ms**
    \`${emojiUser}\`Mon ping est de : **${client.ws.ping}ms**
    \`${APIemoji}\`API Gateway : **${APIPing}ms**`)
   .setColor(color)
    message.channel.send({embeds : [PingEmbed]})
}
    }}