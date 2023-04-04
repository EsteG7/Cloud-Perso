const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

module.exports = {
    name: 'allo',
    aliases: [],
    description: 'Affiche depuis quand le bot est connecté',
    usage: `allo`,
    go: async (client, db, message, args, owner, Whitelist, color, footer) => {

        let days = Math.floor(client.uptime / (1000 * 60 * 60 * 24)).toString();
        let hours = Math.floor(client.uptime / (1000 * 60 * 60) % 24).toString();
        let minutes = Math.floor(client.uptime / (1000 * 60) % 60).toString();
        let seconds = Math.floor(client.uptime / 1000 % 60).toString();
        message.reply({ content: `Je suis connecté depuis ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes.`, allowedMentions: { repliedUser: false } });

    }
}
