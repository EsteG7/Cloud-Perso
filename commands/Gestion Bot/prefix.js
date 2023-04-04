module.exports = {
    name: 'prefix',
    usage: 'prefix <prefix>',
    description: `Permet de changer le prefix du bot sur un serveur.`,
    go: async (client, db, message, args, prefix, color, footer) => {
      if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        const newprefix = args[0];
  
        if (!newprefix) {
          return message.reply("Merci d'indiquer le prefix que vous souhaitez");
        }
  
        if (newprefix.length > 10) {
          return message.reply("Merci de choisir un prefix qui contient maximum 10 caractères");
        }
  
        const guild = message.guild;
        await db.set(`prefix_${guild.id}`, newprefix);
        message.channel.send(`Mon prefix sur le serveur \`${guild.name}\` est désormais \`${newprefix}\``);
        console.log(`Prefix changer Pour: [${newprefix}] sur le serveur ${guild.name} (${guild.id})`)
      }
    }
  }