const Discord = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: 'color',
  aliases: ["theme", "setcolor"],
  description: 'Permet de changer la couleur des embeds du bot',
  usage: `color <nouvelle couleur>`,
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        if (!args[0]) return message.reply(`Utilisez la commande de cette façon: \`${prefix}color <le nom de la couleur en français>\``)
         

        const colorMap = {
          "rouge": "#FF0000",
          "vert": "#00FF00",
          "bleu": "#0000FF",
          "noir": "#000000",
          "blanc": "#FFFFFF",
          "rose":"#dc14eb",
          "violet": "#764686",
          "orange": "#FFA500",
          "jaune" : "#FFFF00",
          "marron": "#A52A2A",
          "gris": "#808080",
          "argent" : "#C0C0C0",
          "cyan" : "#00FFFF",
          "lavande" : "#E6E6FA",
          "corail" : "#FF7F50",
          "beige": "#F5F5DC",
          "defaut" : config.color
    
        }
        
        const colorArg = args[0].toLowerCase();
        if (!(colorArg in colorMap)) {
            return message.channel.send(`Couleur invalide. Veuillez choisir parmi les couleurs suivantes : \`\`\`${Object.keys(colorMap).join(' , ')}\`\`\``);
        }
       
        db.set(`color_${message.guild.id}`, colorMap[colorArg])
        message.channel.send(`La couleur a été mise à jour en \`${colorArg}\`.`);
    } 
  }
}
