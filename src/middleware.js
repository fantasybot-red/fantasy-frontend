import { defineMiddleware } from "astro:middleware";

let fake_header = ["Express", "PHP", "ASP.NET", "Next.js", "JSF", "web2py", "Virgool", "Alpine", "Vanilla", 
                    "WP Engine", "PageFly", "ZendServer", "Alpine", "CentOS", "Darwin", "XeoraCube", 
                    "Red Hat", "Ubuntu", "PlatformOS"];

export const onRequest = defineMiddleware(async (context, next) => {
    if (context.url.pathname.endsWith("/") && context.url.pathname !== "/") {
        context.url.protocol = "https://";
        context.url.pathname = context.url.pathname.slice(0, -1);
        return Response.redirect(context.url);
    }
    let data = await next();
    data.headers.set("Status", `https://httpstatusdogs.com/img/${data.status}.jpg`);
    data.headers.set("X-Powered-By", fake_header);
    return data;
});