const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const openaiApiKey = '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';

module.exports = {
  name: 'chat',
  description: 'Posez une question à ChatGPT',
  usage: 'chat <question>',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    const query = args.join(' ');
    if (!query) return message.channel.send(`Veuillez poser une question. Usage: \`${this.usage}\``);
    askChatGPT(query)
      .then(response => {
        const embed = new MessageEmbed()
          .setTitle('ChatGPT')
          .addField('Question:', query)
          .addField('Réponse:', response);
        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error(error);
        message.channel.send('Une erreur est survenue lors de la communication avec ChatGPT.');
      });
  }
}

async function askChatGPT(query) {
    const prompt = `Me: ${query}\nChatGPT:`;
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
    };
    const data = {
        prompt,
        max_tokens: 1024,
        n: 1,
        stop: '\n',
        temperature: 0.7
    };
    const response = await axios.post(apiUrl, data, { headers });
    const answer = response.data.choices[0].text.trim();
    return answer;
}
