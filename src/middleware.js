import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    if (context.url.pathname.endsWith("/") && context.url.pathname !== "/") {
        context.url.protocol = "https://";
        context.url.pathname = context.url.pathname.slice(0, -1);
        return Response.redirect(context.url);
    }
    let data = await next();
    data.headers.set("Status", `https://httpstatusdogs.com/img/${data.status}.jpg`);
    return data;
});