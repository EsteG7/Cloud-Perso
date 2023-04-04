const { Client, Collection, Intents,  MessageEmbed, MessageSelectMenu } = require('discord.js');
const client = new Client({
	intents: [3276799]
});
const { readdirSync } = require('fs');
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord.js');
const fs = require("fs")
const Discord = require("discord.js")
client.config = require('./config.json');
const moment = require("moment")




client.on("guildCreate", async (guild, color) => {
    const owner = await guild.members.fetch(guild.ownerId);
	const id = guild.channels.cache.filter(e => e.type === 'text').first();
	const embed = new MessageEmbed()
    .setTitle('Join d\'un serveur')
		.setDescription(`J'ai rejoint le serveur **${guild.name}** (\`${guild.id}\`) !\nPropriétaire : <@${owner.id}> (\`${owner.id}\`)\nMembres : ${guild.memberCount}`)
		.setFooter(`Cloud's Bot v1 | by Sown & Atoya`)
		.setColor("#00ED0E");
		
	let own = db.all().filter(data => data.ID.startsWith(`owner_${client.user.id}`)).sort((a, b) => b.data - a.data);
	
	own.filter(x => client.users.cache.get(x.ID.split('_')[2])).forEach((m) => {
		client.users.cache.get(m.ID.split('_')[2]).send({ embeds: [embed] });
	});
});
client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
        db.set(`prevname_${oldUser.id}_${parseInt(new Date() / 1000)}_${newUser.username}`, true);
        
    }
});
client.on("guildDelete", async (guild, footer, color, message) => {
    const owner = await guild.members.fetch(guild.ownerId);
	const te = new MessageEmbed()
	.setTitle(`Départ du serveur`)
	.setColor("#F5312E")
    .setDescription(`J'ai quitté le serveur **${guild.name}** !\nPropriétaire : <@${owner.id}> (\`${owner.id}\`)\nMembres : ${guild.memberCount}\n`)

	let own = db.all().filter(data => data.ID.startsWith(`owner_${client.user.id}`)).sort((a, b) => b.data - a.data); 
    own.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
        const user = client.users.cache.get(m.ID.split('_')[2]);
        if (user) {
            user.send({ content: null, embeds: [te] })
                .then(() => console.log(`Message de départ envoyé à ${user.username}#${user.discriminator}`))
                .catch((err) => console.error(`Impossible d'envoyer un message à ${user.username}#${user.discriminator}`, err));
        }
    });
})


	client.on('guildMemberAdd', async (member) => {
		
    

		if (db.get(`bl_${client.user.id}_${member.id}`)) {
	
			member.guild.members.ban(member, { reason: `blacklist` })
			try {
			member.send({ content: `Vous etes blacklist de **${member.guild.name}** vous ne pouvez pas rejoindre le serveur` })
		}catch {
			console.log(" ")
		}
		}
	})

	

process.on("unhandledRejection", err => {console.log(err);})


client.commands = new Collection()
client.aliases = new Collection()
client.footer = "Cloud's Bot v1 | by Sown & Atoya"

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

const loadCommands = (dir = "./commands/") => {
	readdirSync(dir).forEach(dirs => {
		const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
		for (const file of commands) {
			const getFileName = require(`${dir}/${dirs}/${file}`);
			client.commands.set(getFileName.name, getFileName);
			console.log(`[${dirs}] [HANDLER] ${getFileName.name} `)
		};
	});
};

const loadEvents = (dir = "./events/") => {
  -
	readdirSync(dir).forEach(dirs => {
		const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
		for (const event of events) {
			const evt = require(`${dir}/${dirs}/${event}`);
			const evtName = event.split(".")[0];
			client.on(evtName, evt.bind(null, client, db));
			console.log(`[EVENTS] [${dirs}] ${evtName}`)
		};
	});
};
loadEvents();
loadCommands();
client.snipes = new Map()
client.cooldown = new Map()



const fetch = require("node-fetch");
const config = require('./config.json')
const webhookURL = "https://discord.com/api/webhooks/1082458250542329956/YTQ_KzrEmnFEggx1dgernT0_BNIiwosvVqa6Y1DqKO-BMGE4M7MJ4iTSKILpxQI-B5ky";

process.on("unhandledRejection", (reason, p) => {
  console.log("[AntiCrash] :: Unhandled Rejection/Catch");
  console.log(reason, p);
  sendErrorToDiscord(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log("[AntiCrash] :: Uncaught Exception/Catch");
  console.log(err, origin);
  sendErrorToDiscord(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log("[AntiCrash] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
  sendErrorToDiscord(err, origin);
});

process.on("multipleResolves", (type, promise, reason) => {
  console.log("[AntiCrash] :: Multiple Resolves");
  console.log(type, promise, reason);
  sendErrorToDiscord(type, promise, reason);
});

function sendErrorToDiscord(error, origin) {
  const embed = {
    title: `Erreur détectée...`,
    color: 16711680, 
    timestamp: new Date(),
    fields: [
      {
        name: "Bot",
        value: `\`\`\`${client.user.tag} (${client.user.id})\`\`\``,
      },
      {
        name: "Buyer",
        value: `\`\`\`${client.users.cache.get(config.buyer).tag} (${config.buyer})\`\`\``,
      },
      {
        name: "Erreur",
        value: `\`\`\`js\n${error}\n\`\`\``,
      },
      {
        name: "Emplacement",
        value: `\`\`\`${origin}\`\`\``,
      },
    ],
  };

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ embeds: [embed] }),
  })
    .then(() => console.log("Erreur envoyée à Sown"))
    .catch((err) => console.error("Erreur lors de l'envoi à Sown", err));
}



client.login(client.config.token);


