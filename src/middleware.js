import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
    if (context.url.pathname.endsWith("/")) {
        context.url.protocol = "https://";
        context.url.pathname = context.url.pathname.slice(0, -1);
        return Response.redirect(context.url);
    }
    return next();
});