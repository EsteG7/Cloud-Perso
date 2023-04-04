module.exports = {
    name: 'avatar',
    usage: 'avatar <image>',
    description: `Permet de changer l'avatar du bot.`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            if (message.attachments.size > 0) {
                message.attachments.forEach(attachment => {
                    client.user.setAvatar(attachment.url)
                        .then(u => message.channel.send(`${message.author}, Vous avez changé la **photo de profil** de votre bot.`))
                        .catch(() => message.reply("Veuillez patienter avant de rechanger mon avatar"))
                });
            } else if (args.length) {
                let str_content = args.join(" ")
                client.user.setAvatar(str_content)
                    .then(u => message.reply(`Vous avez changé la **photo de profil** de votre bot.`))
                    .catch(() => message.reply("Veuillez patienter avant de rechanger mon avatar"))
            } else {
                message.channel.send(`Format accépté : Image **&** Lien`);
            }

        }
    }
}