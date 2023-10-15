# dashboard/routes.py
from flask import Flask, render_template, redirect, url_for
from flask_dance.contrib.discord import make_discord_blueprint, discord
from flask_dance.consumer import OAuth2ConsumerBlueprint
from config import DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI

app = Flask(__name__)

# Configure OAuth2 for Discord
discord_bp = make_discord_blueprint(
    client_id=DISCORD_CLIENT_ID,
    client_secret=DISCORD_CLIENT_SECRET,
    redirect_to='discord_login',
    redirect_to='discord.login',
)

app.register_blueprint(discord_bp, url_prefix='/discord_login')

# Define a route for user login
@app.route('/')
def home():
    if not discord.authorized:
        return redirect(url_for('discord.login'))
    resp = discord.get('/api/users/@me')
    assert resp.ok, resp.text
    user_data = resp.json()
    return render_template('home.html', user=user_data)
