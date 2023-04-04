
const Discord = require('discord.js')
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);

module.exports = {
    name: "tempvoc",
    description: 'Permet de mute temporairement un membre du serveur',
    usage: `tempvoc`,
    go: async(client, db, message, newPresence, oldPresence, owner, Whitelist, color , footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ) {
            try {
                first_layer()
                async function first_layer() {
                    let menuoptions = new MessageSelectMenu()
                        .setCustomId('MenuSelection')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis une option")
                        .addOptions([
                            {
                                label: "Catégorie Tempvoc",
                                value: `categorietempvoc`,
                                emoji: "🔈",
                            },
                            {
                                label: 'Salon Tempvoc',
                                value: `salontempvoc`,
                                emoji: "💬",
                            },
                            {
                                label: "Activé les vocaux temporaires",
                                value: "activemodule",
                                emoji: "✔",
                            },
                            {
                                label: "Désactivé les vocaux temporaires",
                                value: "desactivemodule",
                                emoji: "❌",
                            },
                            {
                                label: 'Annulé',
                                value: "Cancel",
                                emoji: '🚫',
                            },
                        ])
                        let tempvocsettings = db.get(`tempvocsettings_${message.guild.id}`)
                    if (tempvocsettings == null) tempvocsettings = "Non Configuré"
                    if (tempvocsettings == true) tempvocsettings = " ✅ | Activé"
                    if (tempvocsettings == false) tempvocsettings = "❌ | Desactivé"

                    let categorytemp = `<#${db.get(`categorytempvoc_${message.guild.id}`)}>`
                    if (categorytemp == "<#null>") categorytemp = "Non Configuré"

                    let salontemp = `<#${db.get(`salontempvoc_${message.guild.id}`)}>`
                    if (salontemp == "<#null>") salontemp = "Non configuré"


                    const MenuEmbed = new Discord.MessageEmbed()
                        .setTitle('Vocaux Temporaires')
                        .setColor(color)
                        .setDescription(`__**Choisissez les options pour configuré les vocaux temporaires**__`)
                        .addFields(
                            { name: 'Activé/Désactivé', value: `Tempvoc: __**${tempvocsettings}**__`, inline: false },
                            { name: 'Catégorie tempvoc', value: `Catégorie: __**${categorytemp}**__`, inline: false },
                            { name: 'Salon tempvoc', value: `Salon: __**${salontemp}**__`, inline: false },
                        )
                        
                        .setFooter({ text: `Si vous avez apporté des modifications refaite la commande pour actualiser ce message` })

                    let used1 = false;

                    const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })

                    function menuselection(i) {
                        used1 = true;
                    }

                    //Event
                    let msg = menumsg

                    const antichannel = new MessageEmbed()
                        .setTitle(`Configuré les salons temporaires`)
                        .setDescription("**Séléctionner l'option qui vous correspond**")
                        .setColor(color)
                        .setImage('https://media.discordapp.net/attachments/960870017614880789/1032247491040653312/anime-bungou.gif')

                    const antichanneldelete = new MessageEmbed()
                        .setTitle(`Configuré le MP de bienvenue`)
                        .setDescription("**Indiquer quel message sera envoyé aux nouveau membres qui rejoindront le serveur**")
                        .setColor(color)
                        .setImage('https://media.discordapp.net/attachments/960870017614880789/1032247491040653312/anime-bungou.gif')

                    let options = new MessageSelectMenu()
                        .setCustomId('MenuOn')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis une option")
                        .addOptions([
                            {
                                label: "Définir une Catégorie",
                                value: `active`,
                                emoji: '✅',
                            },
                            {
                                label: 'Réinitialiser',
                                value: `desactive`,
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: "Retour",
                                emoji: "↩️",
                            },
                        ])


                    let AntiChannelDelete = new MessageSelectMenu()
                        .setCustomId('MenuOn')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis une option")
                        .addOptions([
                            {
                                label: "Définir un Salon",
                                value: `activedel`,
                                emoji: '✅',
                            },
                            {
                                label: 'Réinitialiser',
                                value: `desactivedel`,
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: "Retourdel",
                                emoji: "↩️",
                            },
                        ])


                    let filter2 = (m) => m.author.id === message.author.id

                    let filter1 = (i) => i.user.id === message.author.id;
                    const col = await msg.createMessageComponentCollector({
                        filter: filter1,
                        componentType: "SELECT_MENU"
                    })

                    col.on("collect", async (i) => {
                        if (i.values[0] == "Cancel") {
                            menumsg.delete()
                        }
                        else if (i.values[0] === "categorietempvoc") {
                            menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })
                            await i.deferUpdate()
                        }
                        if (i.values[0] == "active") {
                            let link = db.fetch(`categorytempvoc_${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ |\`Une catégorie \` est déjà setup`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(console.error);
                                await i.deferUpdate()
                            }
                            else {
                                await i.deferUpdate()
                                const oui = await message.channel.send(`Quelle est la catégorie ou seront créer les vocaux temporaires`)
                                let collected = message.channel.awaitMessages({
                                    filter: m => m.author.id === message.author.id,
                                    max: 1,
                                    time: 100000,
                                    errors: ["time"]
                                })
                                    .then(collected => {
                                        oui.delete()

                                        const status = collected.first().content
                                        db.set(`categorytempvoc_${message.guild.id}`, status)
                                        collected.first().delete()

                                        message.channel.send(`✅ |\`La catégorie \` a bien été enregistrée`).then(msg => {
                                            setTimeout(() => msg.delete(), 60000)
                                        }).catch(console.error);
                                    })
                            }

                        } else if (i.values[0] == "Retour") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                            await i.deferUpdate()

                        } else if (i.values[0] == 'desactive') {
                            let link = db.fetch("messagebvn_" + message.guild.id)
                            if (link == true) {
                                //     db.set("support"+ message.guild.id , null)
                                db.delete("messagebvn_" + message.guild.id)
                                message.channel.send(`❌ |\`Le message de bienvenue \` vient d'être reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(console.error);
                                await i.deferUpdate()

                            } else if (link == null) {
                                message.channel.send(`❌ |\`Le message de bienvenue \` est déjà reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(console.error);
                                await i.deferUpdate()
                            }

                        }

                        //Statut
                        else if (i.values[0] === "salontempvoc") {
                            menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })
                            await i.deferUpdate()
                        } if (i.values[0] == "activedel") {
                            await i.deferUpdate()
                            let link = db.fetch(`salontempvoc_${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ |\`Le salon tempvoc \` est déjà configuré`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(console.error);
                            } else {

                                const ez = await message.channel.send(`Quel salon sera utilisé pour les vocaux temporaires`)
                                let collected = await message.channel.awaitMessages({
                                    filter: filter2,
                                    max: 1,
                                    time: 60000,
                                    errors: ["time"]
                                }).then(collected => {
                                    ez.delete()

                                    const status = collected.first().content
                                    db.set(`salontempvoc_${message.guild.id}`, status)
                                    //  db.set("support"+ message.guild.id , true)
                                    message.channel.send(`✅ |\`Le salon des vocaux temporaires a été enregistrée \`Salon: <#${status}>`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                    collected.first().delete()
                                        .catch(console.error);
                                })
                            }
                        } else if (i.values[0] == "Retourdel") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                            await i.deferUpdate()

                        } else if (i.values[0] == 'desactivedel') {
                            let link = db.fetch(`support${message.guild.id}`)
                            if (link == true) {
                                db.delete('status' + message.guild.id)
                                message.channel.send(`❌ |\`Les vocaux temporaires \` vien d'être reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(console.error);
                                await i.deferUpdate()


                            } else {
                                message.channel.send(`❌ |\`Les vocaux temporaires \` sont déjà reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(console.error);
                                await i.deferUpdate()
                            }
                        }


                        //activé MSG
                        if (i.values[0] === "activemodule") {
                            await i.deferUpdate()
                            let soutien = db.fetch("tempvocsettings_" + message.guild.id)
                            if (soutien === true) {
                                return message.channel.send("Les vocaux temporaires sont déjà activés").then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            } else {
                                db.set("tempvocsettings_" + message.guild.id, true)
                                return message.channel.send("✅ |Les vocaux temporaires viennent d'être activés.").then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            }
                        } else if (i.values[0] === "desactivemodule") {
                            await i.deferUpdate()
                            let soutien = db.fetch("tempvocsettings_" + message.guild.id)
                            if (soutien == true) {
                                db.set("tempvocsettings_" + message.guild.id, null)
                                return message.channel.send("❌ | Les vocaux temporaires viennent d'être désactivés.").then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            } else return message.channel.send('✅ | Les vocaux temporaires sont déjà désactivés.').then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        }
                    })

            }
        } catch (e) {
            console.log(e)
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(color)
                    .setTitle("Une erreur est survenu")
                    .setDescription('Erreur intattenudu')
                ]
            });
    }
}
}
}}