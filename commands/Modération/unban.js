module.exports = {
    name: 'unban',
    usage: 'unban',
    description: `Permet de unban`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

            const userID = args[0];
            if (!userID) {
                return message.reply('Veuillez spécifier l\'ID de l\'utilisateur à débannir.');
            }
            message.guild.members.unban(userID)
                .then(user => {
                    message.reply({ content: `**${user.tag}** a été unbanni du serveur.`, allowedMentions: { repliedUser: false } });
                })
                .catch(err => {
                    console.error(err);
                    message.reply('Une erreur est survenue lors de la tentative de débannissement de l\'utilisateur.');
                });
        }
    }
  
    
    
    
    
    

        }
    