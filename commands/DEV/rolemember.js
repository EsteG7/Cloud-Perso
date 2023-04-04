const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
name: "rolemembers",
aliases: ["rm"],
description: "Affiche les membres qui ont un certain rôle",
usage: "rolemembers <nom ou id ou mention du rôle>",
go: async (client, db, message, args, prefix, color, footer) => {
if (!args[0]) {
return message.channel.send({
content: `:x: Merci de spécifier un nom, un id ou une mention ping du rôle. Usage: \${prefix}${module.exports.usage}`,
});
}
const roleId = args[0].replace(/<@&|>/g, "");
const role =
  message.mentions.roles.first() ||
  message.guild.roles.cache.find(
    (r) =>
      r.name.toLowerCase() === args.join(" ").toLowerCase() ||
      r.id === roleId
  );

if (!role) {
  return message.channel.send({
    content: `:x: Impossible de trouver le rôle \`${args.join(" ")}\`.`,
  });
}

const members = role.members.map(
  (member) =>
    `• [\`${member.user.tag}\`](https://discord.com/users/${member.id}) | (\`${member.id}\`)`
);

const maxPerPage = 10;
const numPages = Math.ceil(members.length / maxPerPage);

let page = 0;
const generateEmbed = (page) => {
  const start = page * maxPerPage;
  const end = (page + 1) * maxPerPage;

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`Membres avec le rôle ${role.name}`)
    .setDescription(members.slice(start, end).join("\n"))
    .setFooter(`Page ${page + 1}/${numPages} | ${footer}`);

  return embed;
};

const selectMenu = new MessageSelectMenu()
  .setCustomId("pageSelector")
  .setPlaceholder("Selectionner une page");

for (let i = 0; i < numPages; i++) {
  selectMenu.addOptions({
    label: `Page ${i + 1}`,
    value: i.toString(),
  });
}

const row = new MessageActionRow().addComponents(selectMenu);

const initialMessage = await message.channel.send({
  embeds: [generateEmbed(page)],
  components: [row],
});

const filter = (interaction) => {
  if (!interaction.isSelectMenu()) return false;
  if (interaction.user.id !== message.author.id) return false;

  interaction.deferUpdate();
  return true;
};

const collector = initialMessage.createMessageComponentCollector({
  filter,
  time: 60000,
});

collector.on("collect", (interaction) => {
  page = parseInt(interaction.values[0]);
  const newEmbed = generateEmbed(page);

  interaction.update({
    embeds: [newEmbed],
    components: [row],
  });
});

collector.on("end", () => {
  row.components.forEach((component) => component.setDisabled(true));
  initialMessage.edit({
    components: [row],
  });
});
},
};
