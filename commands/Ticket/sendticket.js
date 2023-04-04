const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    name: 'ticketsend',
    usage: 'ticketsend',
    category: "Ticket",
    description: `Commande qui permet d'envoyer l'embed du ticket`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

    
            message.delete()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder(`Cliquez pour ouvrir un ticket`)
                        .addOptions([
                            {
                                label: 'Ticket',
                                emoji: '998562005155860510',
                                description: `Cliquez ici si vous souhaitez ouvrir un ticket`,
                                value: 'open',
                            },
                            {
                                label: 'Annulé',
                                emoji: '988389407730040863',
                                description: "Annulé l'action",
                                value: 'rien',
                            },
                        ])
                );

            message.channel.send({
                embeds: [{
                    title: `Support ${message.guild.name}`,
                    description: `**Pour ouvrir un Ticket cliquez sur l'un des menus ci-dessous et choisissez l'option qui correspond à votre demande**`,
                    color: color,
                    footer: footer,
                }],
                components: [row]
            })
        }
    }
}