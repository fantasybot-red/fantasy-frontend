export function GET ({ request }) {
    let headers = { 
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": "attachment; filename=\"README\""
    };
    let body = `
Try To become a Hacker :>
Hmm maybe this page is not build using "Wordpress"
if you want to help me build this page please contact me through discord support server.
or contact us if hacking success for bounty.
    `.trim();
    return new Response(body, { headers });
};