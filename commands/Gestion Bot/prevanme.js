const Discord = require("discord.js");
module.exports = {
  name: 'prevname',
  usage: 'prevname [user/id]',
  description: `affiche les dernier pseudo`,
  
  go: async (client, db, message, args, prefix, color,footer, interaction) => {
      if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
      
   
const membre = message.mentions.users.first() || message.author;
const data = db.all().filter(data => data.ID.startsWith(`prevname_${membre.id}`)).sort((a, b) => b.data - a.data);
const count = 15;
let p0 = 0;
let p1 = count;
let page = 1;

let embed = new Discord.MessageEmbed()
embed.setTitle(`pseudo of ${membre.username}`)
    .setFooter({ text: `${page}/${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)} ` })
    .setColor(color)
    .setFooter(footer)
    .setDescription(data.slice(p0, p1).map((m, c) => `**<t:${m.ID.split("_")[2]}>** - **${m.ID.split("_")[3]}**`).join("\n") || "Aucun pseudo trouvée");
const msg = await message.reply({ content: `Chargement...`, allowedMentions: { repliedUser: false } });

if (data.length > count) {
    const btn = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId(`prev1_${message.id}`)
            .setLabel('◀')
            .setStyle('PRIMARY'))
        .addComponents(new Discord.MessageButton()
            .setCustomId(`prev2_${message.id}`)
            .setLabel('▶')
            .setStyle('PRIMARY'));
    msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed], components: [btn] });
    setTimeout(() => {
        message.delete();
        return msg.delete();
    }, 60000 * 5);

    const collector = await msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 * 5 });
    collector.on("collect", async interaction => {
        if (interaction.user.id !== message.author.id) return;
        interaction.deferUpdate()

        if (interaction.customId === `prev1_${message.id}`) {
            if (p0 - count < 0) return;
            if (p0 - count === undefined || p1 - count === undefined) return;

            p0 = p0 - count;
            p1 = p1 - count;
            page = page - 1

            embed.setFooter({ text: `${page} / ${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)}` }).setDescription(data.slice(p0, p1).map((m, c) => `**<t:${m.ID.split("_")[2]}>** - **${m.ID.split("_")[3]}**`).join("\n") || "Aucune donnée trouvée");
            msg.edit({ embeds: [embed] });
        }
        if (interaction.customId === `prev2_${message.id}`) {
            if (p1 + count > data.length + count) return;
            if (p0 + count === undefined || p1 + count === undefined) return;

            p0 = p0 + count;
            p1 = p1 + count;
            page++;

            embed.setFooter({ text: `${page} / ${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)}` }).setDescription(data.slice(p0, p1).map((m, c) => `**<t:${m.ID.split("_")[2]}>** - **${m.ID.split("_")[3]}**`).join("\n") || "Aucune donnée trouvée");
            msg.edit({ embeds: [embed] });
        }
    })
} else {
    msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed] })
}

        }
}}




