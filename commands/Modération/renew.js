const Discord = require('discord.js')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }

module.exports = {
    name: 'renew',
    aliases: ["nuke","purge"],
    description: 'Permet de recréer un salon',
    usage: `renew [salon]`,
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            if(args[0] === "all") {
         
             
                if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {    
                const channels = message.channel.guild.channels.cache.filter(ch => ch.type !== 'category');
    
                channels.forEach(async channele => {
                    await channele.clone({
                        name: channele.name,
                        permissions: channele.permissionsOverwrites,
                        type: channele.type,
                        topic: channele.withTopic,
                        nsfw: channele.nsfw,
                        birate: channele.bitrate,
                        userLimit: channele.userLimit,
                        rateLimitPerUser: channele.rateLimitPerUser,
                        permissions: channele.withPermissions,
                        position: channele.rawPosition,
                        reason:  `Tout les salon recréé par ${message.author.tag} (${message.author.id})`
                    })
                    .catch(err => {})
                    channele.delete().catch(err => {})  })



                
    
            
                }
               
            } else {
                
           if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {    
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel 
    if(channel === message.channel) {
        try {
            let ee =    await channel.clone({
                name: channel.name,
                permissions: channel.permissionsOverwrites,
                type: channel.type,
                topic: channel.withTopic,
                nsfw: channel.nsfw,
                birate: channel.bitrate,
                userLimit: channel.userLimit,
                rateLimitPerUser: channel.rateLimitPerUser,
                permissions: channel.withPermissions,
                position: channel.rawPosition,
                reason:  `Salon recréé par ${message.author.tag} (${message.author.id})`
            })
            channel.delete() 
            ee.send({ content: `${message.author} salon recréé` })
        } catch (error) {
            return;
        }
    } else {
    
        try {
          let ee =  await channel.clone({
                name: channel.name,
                permissions: channel.permissionsOverwrites,
                type: channel.type,
                topic: channel.withTopic,
                nsfw: channel.nsfw,
                birate: channel.bitrate,
                userLimit: channel.userLimit,
                rateLimitPerUser: channel.rateLimitPerUser,
                permissions: channel.withPermissions,
                position: channel.rawPosition,
                reason:  `Salon recréé par ${message.author.tag} (${message.author.id})`
            })
            channel.delete() 
            ee.send({ content: `${message.author} salon recréé` })
           
    
        } catch (error) {
            return;
        }
       
       
       
        
      
    }
           
    
    }
    }
    }
}  }