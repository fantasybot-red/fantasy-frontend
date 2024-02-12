export function GET ({ request }) {
    let headers = { 
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": "attachment; filename=\"README\""
    };
    let body = `
Try To become a Hacker :>>
Then sory this page is not build by "Wordpress"
    `.trim();
    return new Response(body, { headers });
};