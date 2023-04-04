const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);

module.exports = {
    name: "rolemenu",
    go: async(client, db, message, newPresence, oldPresence, owner, Whitelist, color , footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            const guild = message.guild;
         let color = cl.fetch(`color_${message.guild.id}`)
        try {
            if(db.get(`rolemenustyle_${message.guild.id}`) === "Réactions" || db.get(`rolemenustyle_${message.guild.id}`) === null) {
                let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Rolemenu`)
                    embed.setColor(color)
                    embed .addField("Message", db.get(`rolemenumsg_${message.guild.id}`) === null ? "❌" : `[${db.get(`rolemenumsg_${message.guild.id}`)}`)
                    embed.addField("Channel", `${db.get(`rolemenusalon_${message.guild.id}`)}`)
                    embed .addField("Rôle", db.get(`rolemenurole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${message.guild.id}`)}> (${db.get(`rolemenurole_${message.guild.id}`)})`)
                    embed.addField("Réaction", db.get(`rolemenuemoji_${message.guild.id}`) === null ? "❌" : `${db.get(`rolemenuemoji_${message.guild.id}`)}`)
                    embed.setFooter({text: `Cloud's ${client.config.version}` })

                let menuoptions = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
             
                    {
                        label: "Modifier le message",
                        value: `mdfm`,
                        emoji: "📝",
                    },
                    {
                        label: "Modifier le channel",
                        value: `mdfc`,
                        emoji: "📖",
                    },
                    {
                        label: "Modifier le rôle",
                        value: "mdfr",
                        emoji: "👤"
                    },   {
                        label: "Modifier la réaction",
                        value: "mdfre",
                        emoji: "⭐"
                    },
                    {
                        label: "Validé",
                        value: "confirm",
                        emoji: "✅",
                    }, {
                        label: "Reformulé Votre Choix",
                        value: "cancel",
                        emoji: "❌",
                    },
                   
                ])
                let used1 = false;

                    const romsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })


         

        
        const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
            filter: (i => i.user.id === message.author.id)
        });
        filter2 = (m) => m.author.id === message.author.id

        collector.on("collect", async (i) => {
            i.deferUpdate()
            const value = i.values[0];
            //retour

            if (value === "mdfc") {
                const ez = await message.channel.send(`Quel est le channel du reaction role?`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    ez.delete()

                    let msg = collected.first();

                    let ch = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                    db.set(`rolemenusalon_${message.guild.id}`, ch.id)
                    console.log(ch)


                    collected.first().delete()

                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Rolemenu`)
                    embed.setColor(color)
                    embed .addField("Message", db.get(`rolemenumsg_${message.guild.id}`) === null ? "❌" : `[${db.get(`rolemenumsg_${message.guild.id}`)}]`)
                    embed.addField("Channel", `<#${db.get(`rolemenusalon_${message.guild.id}`)}>` || "❌")
                    embed .addField("Rôle", db.get(`rolemenurole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${message.guild.id}`)}> (${db.get(`rolemenurole_${message.guild.id}`)})`)
                    embed.addField("Réaction", db.get(`rolemenuemoji_${message.guild.id}`) === null ? "❌" : `${db.get(`rolemenuemoji_${message.guild.id}`)}`)
                    embed.setFooter({text: `Cloud's ${client.config.version}` })

                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })


                })
            }

            if (value === "mdfr") {
                const ez = await message.channel.send(`Quel est le role du reaction role?`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    ez.delete()

                    let msg = collected.first();
                    let role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\``);
                    db.set(`rolemenurole_${message.guild.id}`, role.id)
                    collected.first().delete()

                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Rolemenu`)
                    embed.setColor(color)
                    embed .addField("Message", db.get(`rolemenumsg_${message.guild.id}`) === null ? "❌" : `[${db.get(`rolemenumsg_${message.guild.id}`)}]`)
                    embed.addField("Channel", `<#${db.get(`rolemenusalon_${message.guild.id}`)}>`)
                    embed .addField("Rôle", db.get(`rolemenurole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${message.guild.id}`)}> (${db.get(`rolemenurole_${message.guild.id}`)})`)
                    embed.addField("Réaction", db.get(`rolemenuemoji_${message.guild.id}`) === null ? "❌" : `${db.get(`rolemenuemoji_${message.guild.id}`)}`)
                    embed.setFooter({text: `Cloud's ${client.config.version}` })

                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                })
            }

            if (value === "mdfre"){
                const ez = await message.channel.send(`Quel est la reaction?`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Rolemenu`)
                    embed.setColor(color)
                    embed .addField("Message", db.get(`rolemenumsg_${message.guild.id}`) === null ? "❌" : `[${db.get(`rolemenumsg_${message.guild.id}`)}]`)
                    embed.addField("Channel", `<#${db.get(`rolemenusalon_${message.guild.id}`)}>`)
                    embed .addField("Rôle", db.get(`rolemenurole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${message.guild.id}`)}> (${db.get(`rolemenurole_${message.guild.id}`)})`)
                    embed.addField("Réaction", db.get(`rolemenuemoji_${message.guild.id}`) === null ? "❌" : `${db.get(`rolemenuemoji_${message.guild.id}`)}`)
                    embed.setFooter({text: `Cloud's ${client.config.version}` })

                    let msg = collected.first();
                    collected.first().react(msg.content).then(() => {
                        db.set(`rolemenuemoji_${message.guild.id}`, msg.content)
                        ez.delete()
                        collected.first().delete()
                        romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                    }).catch(() => {
                        ez.delete()
                        collected.first().delete()
                        return message.channel.send(`Je n'est pas accès à cette emoji`)

                    })
                })
            }

            if (value === "mdfm") {
                const ez = await message.channel.send(`Quel est le message du reaction role?`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {

                    let msg = collected.first();

                    
                    let roleid = db.get(`rolemenusalon_${message.guild.id}`)
                    let role =  message.guild.channels.cache.get(roleid)
                    console.log(role)
                    let rolee = role.messages.fetch(msg.content);

                    



                    if (!rolee) return message.channel.send(`Aucun message trouvé pour \`${msg.content}\`.`);
                    db.set(`rolemenumsg_${message.guild.id}`, msg.content)

                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Rolemenu`)
                    embed.setColor(color)
                    embed .addField("Message", db.get(`rolemenumsg_${message.guild.id}`) === null ? "❌" : `[${db.get(`rolemenumsg_${message.guild.id}`)}]`)
                    embed.addField("Channel", `<#${db.get(`rolemenusalon_${message.guild.id}`)}>`)
                    embed .addField("Rôle", db.get(`rolemenurole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${message.guild.id}`)}> (${db.get(`rolemenurole_${message.guild.id}`)})`)
                    embed.addField("Réaction", db.get(`rolemenuemoji_${message.guild.id}`) === null ? "❌" : `${db.get(`rolemenuemoji_${message.guild.id}`)}`)
                    embed.setFooter({text: `Cloud's ${client.config.version}` })

                    ez.delete()
                    collected.first().delete()
                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                })
            }

            if (value === "confirm") {
                 
                if(db.get(`rolemenustyle_${message.guild.id}`) === "Réactions" || db.get(`rolemenustyle_${message.guild.id}`) === null) {

                    let channel = message.guild.channels.cache.get(db.get(`rolemenusalon_${message.guild.id}`)) || message.channel
                    channel.messages.fetch(db.get(`rolemenumsg_${message.guild.id}`)).then(async mmm => {
                        if (!mmm) return mmm == channel.lastMessage
                        if (!mmm) return message.channel.send(`Aucun **message** valide n'est configuré !`)

                        let role = message.guild.roles.cache.get(db.get(`rolemenurole_${message.guild.id}`))

                        if (!channel) return message.channel.send(`Aucun **salon** valide n'est configuré !`)

                        if (!role) return message.channel.send(`Aucun **rôle** valide n'est configuré !`)
                        mmm.react(db.get(`rolemenuemoji_${message.guild.id}`)).then(() => {
                            db.push(`reactions_${message.guild.id}`, {
                                msg: mmm.id,
                                channel: channel.id,
                                emoji: db.get(`rolemenuemoji_${message.guild.id}`),
                                roleId: role.id
                            });
                            return message.channel.send(`Rolemenu crée`)
                        }).catch(() => {
                            return message.channel.send(`Aucune **réaction** valide n'est configuré !`)

                        })
                  
                    
                    }).catch(() => {
                        return message.channel.send(`Aucun **message** valide n'est configuré !`)

                    })
            }
        }

        if (value ==="cancel") {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Configuration Rolemenu`)
            embed.setColor(color)
            embed .addField("Message", db.get(`rolemenumsg_${message.guild.id}`) === null ? "❌" : `[${db.get(`rolemenumsg_${message.guild.id}`)}]`)
            embed.addField("Channel", `<#${db.get(`rolemenusalon_${message.guild.id}`)}>`)
            embed .addField("Rôle", db.get(`rolemenurole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${message.guild.id}`)}> (${db.get(`rolemenurole_${message.guild.id}`)})`)
            embed.addField("Réaction", db.get(`rolemenuemoji_${message.guild.id}`) === null ? "❌" : `${db.get(`rolemenuemoji_${message.guild.id}`)}`)
            embed.setFooter({text: `Cloud's ${client.config.version}` })
            romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
        }
    
    })
}
    } catch (err) {
        console.log(err)
    }
}
        }
      
        
     

}
