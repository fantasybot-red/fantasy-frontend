import { decryptData, encryptData } from '../js/encryption.js';

var API_ENDPOINT = import.meta.env.API_ENDPOINT;

export async function getuser(Astro) {
    let data_decode;
    try {
        data_decode = decryptData(Astro.cookies.get("TOKEN").value);
        data_decode = JSON.stringify(data_decode);
    } catch {
        data_decode = null;
    }

    let rep = await fetch(API_ENDPOINT+'/@me', {method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data_decode,
    });
    if (rep.status === 429) {
        document.body.innerHTML = ratelimit;
        throw Error("Rate Limit");
    }
    let data = await rep.json();
    return data;
}

export async function get_user_status(Astro) {
    let userinfo = await getuser(Astro);
    if (userinfo.status) {
        let user_display = userinfo.user.username + '#' + userinfo.user.discriminator;
        if (userinfo.discriminator == "0") {
            user_display = "@"+userinfo.user.username;
        }
        return `<span>${user_display}</span> <img class="useravatar" src="${userinfo.user.avatar}" alt="" width="30" height="auto"></img>`;
    }
    return 'Login';
}

export async function check_login(Astro) {
    let user_data = await getuser(Astro);
    return user_data.status;
}

export async function getserver(Astro) {
    let data_decode;
    try {
        data_decode = decryptData(Astro.cookies.get("TOKEN").value);
        data_decode = JSON.stringify(data_decode);
    } catch {
        data_decode = null;
    }
     
    let rep = await fetch(API_ENDPOINT+'/@me/guilds', {method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data_decode,
    });
    if (rep.status === 429) {
        document.body.innerHTML = ratelimit;
        throw Error("Rate Limit");
    }
    let data = await rep.json();
    return data;
}