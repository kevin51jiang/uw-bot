const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if(msg.includes("uwu")) {
        msg.reply('Pay ur taxes pleb');
    }
});

client.login('NTQ0MDA2NjE3NzAwNDk5NDY2.D0E1uw.5EF7e45UlIDFqvhl2XwvXWYCgGY');