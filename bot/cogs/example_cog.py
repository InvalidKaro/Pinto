# cogs/example_cog.py
from discord.ext import commands

class ExampleCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name="example")
    async def example_command(self, ctx):
        await ctx.send("This is an example command!")

def setup(bot):
    bot.add_cog(ExampleCog(bot))
