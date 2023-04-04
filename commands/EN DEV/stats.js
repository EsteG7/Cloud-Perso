const Discord = require('discord.js');
const MessageEmbed = require('discord.js')
const os = require('os');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name: 'stats',
    aliases: ["stat"],
    description: 'Affiche les informations avancées du robot',
    usage: `stats`,
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
       
            const uptime = moment.duration(client.uptime).format('D [jours], H [heurs], m [min], s [s]');
            const embed = new Discord.MessageEmbed()
                .setTitle(`${client.user.tag} Informations`)
                .setColor(color)
                .setFooter(footer)
                .addField('❯ General Information', '_ _')
                .addField('• Creator', `Sown#0001`, false)
                .addField('• Library', 'Discord.js', false)
                .addField('• Prefix', `\`${prefix}\``, false)
                .addField('• Uptime', uptime, false)
                .addField('• Discord API Latency', `${Math.round(client.ws.ping)}ms`, false)
                .addField('❯ System Information', '_ _')
                .addField('• Operating System', `${os.type()} ${os.arch()}`, false)
                .addField('• CPU', os.cpus()[0].model, false)
                .addField('• CPU Usage', `${Math.round(process.cpuUsage().system / 1024 / 1024)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB`, false)
                .addField('• Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, false)
                .addField('• Free Memory', `${Math.round(os.freemem() / 1024 / 1024)}MB`, false)
                .addField('• Node.js Version', process.version, false)
                .addField('• Discord.js Version', `v${MessageEmbed.version}`, false)
                .setTimestamp();
            await message.reply({ embeds: [embed] });
        }
    }
}
