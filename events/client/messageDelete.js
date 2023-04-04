module.exports = async (client, db, message) => {
 
    let snipes = client.snipes.get(message.channel.id) || [];
    if (snipes.lenght > 1000) snipes = snipes.slice(0, 99);
    
    snipes.unshift({
        msg: message,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        time: Date.now(),
    });
    
    client.snipes.set(message.channel.id, snipes);
    
    
    }
        