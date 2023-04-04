const Discord = require('discord.js')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const backup = require("discord-backup")

module.exports = {
    name: 'backup',
    aliases: [],
    go: async (client, db, message, args, prefix, color, footer, owner) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            const create = args[0] === "create";
            const list = args[0] === 'list';
            const load = args[0] === 'load';
            const del = args[0] === 'delete';

            if (!args[0]) {
                const helpEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTimestamp()
                    .setFooter(`Cloud's ${client.config.version}`)
                    .addField('Backup:', `[\`backup create\`](https://discord.gg/cloudbot) ・ Permet de créer une backup du serveur actuel\n[\`backup delete\`](https://discord.gg/cloudbot) ・ Permet de supprimer une backup\n[\`backup list\`](https://discord.gg/cloudbot) ・ Permet d'afficher la liste de toutes les backup`);
                message.channel.send({embeds : [helpEmbed]});
            } 

            if (create) {
                backup.create(message.guild, {
                    maxMessagesPerChannel: 100,
                    jsonBeautify: true
                }).then((backupData) => {
                    message.channel.send(`Backup correctement créée, faites \`${prefix}backup load ${backupData.id}\` pour charger la backup`);
                });
            }

            if (list) {
                backup.list().then((backups) => {
                    const listEmbed = new Discord.MessageEmbed()
                        .setAuthor('📰 Liste des backups')
                        .setDescription(`\`\`\`${backups}\`\`\` `)
                        .setColor(color);
                    message.channel.send({embeds: [listEmbed]});
                });
            }

            if (load) {
                let backupID = args[1];
                if(!backupID){
                    return message.channel.send(` Vous devez spécifier une ID de backup valide !`);
                }
                // Fetching the backup to know if it exists
                backup.fetch(backupID).then(async () => {
                    // If the backup exists, request for confirmation
                    message.channel.send(` Quand la backup est chargée, tous les channels, rôles, etc. vont être remplacés !`);
                    // When the author of the command has confirmed that he wants to load the backup on his server
                    message.author.send(` Chargement de la backup`);
                    // Load the backup
                    backup.load(backupID, message.guild).then(() => {
                    }).catch((err) => {
                        return message.author.send(` Désolé, une erreur est survenue, veuillez vérifier si j'ai les permissions d'administrateur`);
                    });
                }).catch((err) => {
                    console.log(err);
                    return message.channel.send(` Aucun résultat pour la backup \`${backupID}\``);
                });
            }
            if (del) {
                if (!args[1]) {
                    return message.channel.send(`Veuillez spécifier l'ID de la backup que vous voulez supprimer.`);
                }
            
                backup.remove(args[1]).then(() => {
                    message.channel.send(`La backup ${args[1]} a été supprimée avec succès.`);
                }).catch((err) => {
                    message.channel.send(`Désolé, une erreur est survenue lors de la suppression de la backup: ${err}`);
                });
            }
        }}}
