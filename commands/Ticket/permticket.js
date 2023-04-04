module.exports = {
    name: 'ticket-role',
    usage: 'ticket-role @role/id',
    aliases:["ticketrole", "roleticket"],
    category: "Ticket",
    description: `Permet configurer le role qui a acces au ticket`,

    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

            message.delete();
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

            if (!role) return message.channel.send({ content: `Merci de spécifiez le rôle à ajouter` })
            
            message.channel.send({ content: `Le role peut désormais accéder aux tickets` })
            db.set(`rolestaff_${message.guild.id}`, role.id)
}
        
    }
}
