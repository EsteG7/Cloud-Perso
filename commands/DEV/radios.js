const Discord = require ("discord.js");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior
} = require('@discordjs/voice');
const db = require('quick.db');
const cl = new db.table('Color')
module.exports = {
    name: "radio",
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

        const menu = new MessageActionRow ()
        .addComponents(
            new MessageSelectMenu()
.setCustomId('radios-select')
.setPlaceholder('Choisis ta Radio')
.addOptions([{
    label: 'NRJ',
    description: '',
    value: 'nrj'
}, {
    label: 'SkyRock',
    description: '',
    value: 'skyrock'
 },
{
    label: 'Cherie FM',
    description: '',
    value: 'cherie'
}
])
)


const embed0 = new Discord.MessageEmbed()
.setColor(color)
.setFooter(footer)
.setTitle(`Choisis Ta Radio`)


const collector = message.channel.createMessageComponentCollector({
    component_type: 'SELECT_MENU'
    })


    collector.on('collect', async (collected) => {
        collected.deferUpdate()
        const value = collected.values[0]
       
        
        if(value === 'nrj') {
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://cdn.nrjaudio.fm/audio1/fr/40101/aac_576.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply({content: `J'écoute \`NRJ\` dans <#${message.member.voice.channel.id}>.`})
       
             
        }

                    
        if(value === 'skyrock') {

            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://www.skyrock.fm/stream.php/tunein16_64mp3.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`SkyRock\` dans <#${message.member.voice.channel.id}>.`)
     
             
        }

        if(value === 'mouv') {

            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://direct.mouv.fr/live/mouv-midfi.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Mouv\` dans <#${message.member.voice.channel.id}>.`)
     
             
        }


        if(value === 'finfo') {

            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://icecast.radiofrance.fr/franceinfo-midfi.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`France Info\` dans <#${message.member.voice.channel.id}>.`)
     
             
        }


        if(value === 'rtl') {

            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://icecast.rtl.fr/rtl-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`RTL\` dans <#${message.member.voice.channel.id}>.`)
     
             
        }

        if(value === "virgin"){
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://stream.virginradio.fr/virgin.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Virgin\` dans <#${message.member.voice.channel.id}>.`)
        }


        if(value === "latina"){
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://start-latina.ice.infomaniak.ch/start-latina-high.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Radio Latina\` dans <#${message.member.voice.channel.id}>.`)
            
        }


        if(value === "nostalgie"){
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://scdn.nrjaudio.fm/adwz2/fr/30601/mp3_128.mp3?origine=fluxradios")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Nostalgie\` dans <#${message.member.voice.channel.id}>.`)
            
        }


        if(value === "evasion"){
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://stream1.evasionfm.com/Oise")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Evasion\` dans <#${message.member.voice.channel.id}>.`)
            
        }
    })
return message.channel.send({
    embeds: [embed0],
    components: [menu]

    
})}
        
    }
}