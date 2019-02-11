import logging
import discord
from discord.ext import commands

with open('token') as file:
    TOKEN = file.read()

STARTUP_EXTENSIONS = ['cogs.adjustment']
bot = commands.Bot(command_prefix='~')

logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log',
                              encoding='utf-8',
                              mode='w')
handler.setFormatter(logging.Formatter(
    '%(asctime)s:%(levelname)s:%(name)s:%(message)s'))
logger.addHandler(handler)


@bot.event
async def on_ready():
    print(f"Logged in as: {bot.user.name}, {bot.user.id}")
    game = discord.Game("Fighting geese ")
    await bot.change_presence(status=discord.Status.idle, activity=game)


@bot.command()
@commands.is_owner()
async def load(ctx, extension_name):
    try:
        bot.load_extension(extension_name)
    except (AttributeError, ImportError) as error:
        await ctx.send(f"```py\n{type(error).__name__}: {str(error)}\n```")
        return
    await ctx.send(f"{extension_name} loaded.")


@bot.command()
@commands.is_owner()
async def unload(ctx, extension_name):
    bot.unload_extension(extension_name)
    await ctx.send(f"{extension_name} unloaded.")

if __name__ == "__main__":
    for extension in STARTUP_EXTENSIONS:
        try:
            bot.load_extension(extension)
        except Exception as e:
            exc = f"{type(e).__name__}: {e}"
            print(f'Failed to load extension {extension}\n{exc}')
    bot.run(TOKEN, bot=True, reconnect=True)