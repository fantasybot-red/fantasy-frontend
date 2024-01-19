if (window.temp_cache == undefined) {
    window.temp_cache = {};
}
if (window.req == undefined) {
    window.req = {};
}

let rate_limit_mess = "you have been rate limited\nPlease wait and try again !";

async function request(path, method = "GET", body = null) {
    let headers = {};
    let raw_body = body ? JSON.stringify(body) : null;
    if (body) {
        headers["Content-Type"] = "application/json";
    }
    let token = localStorage.getItem("TOKEN");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    let rep = await fetch(window.API_ENDPOINT + path, {
        method: method,
        headers: headers,
        body: raw_body,
        mode: 'cors',
    });
    if (rep.status == 401) {
        localStorage.clear();
        sessionStorage.clear();
    }
    return rep;
}

async function waitForKey(dict, key) {
    while (!dict.hasOwnProperty(key)) {
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    return dict[key];
}

export async function logout() {
    await request('/logout');
}

async function cache_check_support(key, cache, new_req) {
    let cache_data = load_cache(key);
    if (cache_data && cache) {
        return cache_data;
    } else if (key in window.temp_cache) {
        return window.temp_cache[key];
    } else if (key in window.req && !new_req) {
        await waitForKey(window.temp_cache, key);
        return window.temp_cache[key];
    }
    window.req[key] = true;
}

function save_cache(key, data) {
    window.temp_cache[key] = data;
    sessionStorage.setItem(key, JSON.stringify(data));
}

function load_cache(key) {
    if (key in temp_cache) {
        return temp_cache[key];
    }
    let data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}


export async function get_user(cache = true, new_req = false) {
    let cache_data = await cache_check_support('user', cache, new_req);
    if (cache_data) {
        return cache_data;
    }
    let rep = await request('/@me');
    if (rep.status === 429) {
        alert(rate_limit_mess);
        throw Error("Rate Limit");
    }
    let data = await rep.json();
    save_cache('user', data);
    return data;
}

export async function get_user_status() {
    let userinfo = await get_user(false);
    if (userinfo.status) {
        let user_display = userinfo.user.username + '#' + userinfo.user.discriminator;
        if (userinfo.user.discriminator * 1 == 0) {
            user_display = "@" + userinfo.user.username;
        }
        let user_name = document.getElementById("user-name");
        let user_avatar = document.getElementById("user-avatar");
        user_avatar.src = userinfo.user.avatar;
        user_name.innerText = user_display;
        document.getElementById("user-icon").removeAttribute("hidden");
        document.getElementById("login-link").setAttribute("hidden", "");
    }
}

export async function check_login(cache = false) {
    let user_data = await get_user(cache);
    if (!user_data.status) {
        localStorage.clear();
        sessionStorage.clear();
    }
    return user_data.status;
}

export async function get_guilds(cache = true, new_req = false) {
    let cache_data = await cache_check_support('guilds', cache, new_req);
    if (cache_data) {
        return cache_data;
    }
    let rep = await request('/@me/guilds');
    if (rep.status === 429) {
        alert(rate_limit_mess);
        throw Error("Rate Limit");
    }
    let data = await rep.json();
    save_cache('guilds', data);
    return data;
}