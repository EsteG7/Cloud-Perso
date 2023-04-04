module.exports = {
    name: 'name',
    usage: 'name <name>',
    description: `Permet de changer le nom du bot.`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {


            if (args.length) {
                let str_content = args.join(" ")
                client.user.setUsername(str_content)
                    .then(u => message.reply(`Vous avez changé le nom de votre bot en **${str_content}**`))
                    .catch(() => message.reply("Veuillez patienter avant de rechanger mon pseudo"))
            } else {
                message.reply(`${message.author}, Vous n'avez pas fournie de **nom valide**`);
            }

        }
    }
}