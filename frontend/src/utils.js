let url_events = "http://localhost:5000/events/";
let url_users = "http://localhost:5000/users/";

let globalRequestParameters = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

module.exports.globalRequestParameters = globalRequestParameters;
module.exports.url_events = url_events;
module.exports.url_users = url_users;