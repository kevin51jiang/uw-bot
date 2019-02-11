import csv
from discord.ext import commands
from modules.embed import Embed


class Adjustment:
    def __init__(self, bot):
        self.bot = bot
        with open('adjustment.csv') as csv_file:
            adjustment_csv = csv.reader(csv_file, delimiter=',')
            self.adjustments = [line for line in adjustment_csv]

    @commands.command(name='adjustment')
    @commands.has_permissions(manage_channels=True)
    async def adjustment(self, ctx, *keywords):
        search_line = " ".join(keywords).lower()
        school_list = []
        for line in self.adjustments:
            if search_line in line[0].lower() or search_line in line[1].lower():
                school_list.append((line[0], line[2]))
        if not school_list:
            sorry_message = Embed("Sorry! We couldn't find the school :(",
                                  "You weren't on our database, so you probably had an adjustment factor of 16.1. ",
                                  self.bot,
                                  ctx)
            await sorry_message.launch_normal()
        else:
            bangladesh_message = Embed("Bazinga!",
                            "The following adjustment factors were found...",
                            self.bot,
                            ctx)
            for school in school_list:
                bangladesh_message.message.add_field(name=f"{school[0]}: ",
                                                     value=school[1],
                                                     inline=False)
            await bangladesh_message.launch_normal()


def setup(bot):
    bot.add_cog(Adjustment(bot))
