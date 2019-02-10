const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', message => {
    if(message.content.includes("uwu")) {
        message.channel.send('Pay ur taxes pleb');
    }
});

client.login(config.token);