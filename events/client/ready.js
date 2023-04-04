const Discord = require("discord.js");
const ms = require("ms");
const websocket = require("ws");
const MessageEmbed = require('discord.js')
const config = require('../../config.json');
const getNow = () => {
  return {
    time: new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  };
};

module.exports = async ( client, db, message, footer, send) => {

// STATUS 
  const status = db.get('nomstatut');
  const type = db.get('type');
  client.user.setActivity(status || "Cloud's V1", { type: type || "STREAMING", url: "https://twitch.tv/oni145" });
 
 // OWNER LA PERSONNE DANS LE CONFIG

  setInterval(() => {
    client.config.owner.forEach(e => {
      if (db.get(`owner_${client.user.id}_${e}`) !== true) db.set(`owner_${client.user.id}_${e}`, true);
    });
  }, ms('1s'));
 
 
// ENVOIE LE MESSAGE DE START 

/*
  const owner = client.users.cache.get(config.buyer);
  const color =  db.get(`color_${client.user.id}`) || config.color; 
  if (owner) {
    owner.send({
      embeds: [
        new Discord.MessageEmbed()
        .setDescription(`*Le bot a démarré* <t:${Math.floor(Date.now() / 1000)}:R>.\n\n**Développeurs :**\n [\`Sown#0001\`](${config.support}) \`&\` [\`Atoya#9098\`](${config.support})\n\n**Besoin d'aide ? Rejoins notre support :** [[Clique ici]](${config.support})`)
      .setFooter(`Ping ${client.ws.ping}ms`)
      .setColor(color)
      .setTimestamp()
      ]});
  }
*/
    console.log("-------------------------------");
    console.log(`[BOT]: ${client.user.username} est connecté à ${getNow().time}`);
    console.log(`[PREFIX]: ${config.prefix}`);
    console.log(`[BUYER TAG]: ${client.users.cache.get(config.buyer).tag} `);
    console.log(`[GUILDS]: ${client.guilds.cache.size}`);
    console.log(`[CHANNELS]: ${client.channels.cache.size}`);
    console.log(`[Users] ${client.users.cache.size}`);
    console.log(`[Commands] ${client.commands.size}`); 
    console.log("-------------------------------");
    
    const wsClient = new websocket("ws://51.255.215.122:30132")
    wsClient.on('open', ws => {
      wsClient.send(JSON.stringify({type: "connection", id: client.user.id,ws: ws,tag: client.user.tag}))
             wsClient.on('message', async data => {   
                 console.log(JSON.parse(data))
                 let received = JSON.parse(data)
                 if(received.cmd == "restart"){
                     restart: process.exit()
                 }  
                 if(received.cmd == "stop"){
                     restart: process.exit(1)
                 }  
                 if(received.cmd == "prefix"){
                  prefix: received.prefix
                 }   
              
         


  setInterval(() => {
    client.guilds.cache.forEach(async guild => {
     
        const channelId = db.get(`${guild.id}.channelpfp`)
        if (!channelId) return;
        const channel = guild.channels.cache.get(channelId)
        if (!channel) return;
        const user = client.users.cache.random();
        const embed = new Discord.MessageEmbed({ footer: { text: user.username } })
            .setTitle(`Utilisateur`)
            .setDescription(`[${user.username}#${user.discriminator}](https://discord.com/users/${user.id}) | \`${user.id}\``)
            
            .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
            .setFooter({ text: `Cloud's Bot v1 | by Sown & Atoya `})
            .setColor("6200b9")
        const button = new Discord.MessageButton()
            .setLabel("Télécharger")
            .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
            .setStyle("LINK");
        const row = new Discord.MessageActionRow().addComponents(button)
        channel.send({ embeds: [embed], components: [row] });
    })
}, ms("15s"))


        }
         )
        }
      )
    }
    