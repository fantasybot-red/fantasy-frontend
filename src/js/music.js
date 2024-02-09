import { get_guild, url_guild_id } from "./login_modun.js";
let guild = await get_guild(url_guild_id());
if (!guild.bot_joined && guild.permissions) {
    location.replace("/invite?gid=" + guild.id);
}
if (!guild.permissions) {
    document.getElementById("back-btn").href = "/dash";
}

