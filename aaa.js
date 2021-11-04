const delay = (minutes) => new Promise((res) => setTimeout(res, minutes * 60000));
const getRandomInt = (max) => Math.floor(Math.random() * max);

const makeFetch = (phrase) => {
    let body = { content: phrase, tts: false };

    body = JSON.stringify(body);

    fetch("https://discord.com/api/v9/channels/897543160606105630/messages", {
        headers: {
            accept: "*/*",
            "accept-language": "en-US",
            authorization: "NDc4NjA3NzA2NDIxNDYxMDI0.X0GCZQ.Vq7XCADS_U0QZge9eO_iV3jcP1g",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua": '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-debug-options": "bugReporterEnabled",
            "x-fingerprint": "901911094942130207.wseQgkCsv78Og-4KP1AdzOpHRZI",
            "x-super-properties":
                "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkNocm9tZSIsImRldmljZSI6IiIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85NS4wLjQ2MzguNTQgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6Ijk1LjAuNDYzOC41NCIsIm9zX3ZlcnNpb24iOiIxMC4xNS43IiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjEwMjYwNCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=",
        },
        referrer: "https://discord.com/channels/886594640348848189/897543160606105630",
        referrerPolicy: "strict-origin-when-cross-origin",
        body,
        method: "POST",
        mode: "cors",
        credentials: "include",
    }).then((el) => console.log(el));
};

const phrases = [
    "so pumped for this",
    "whats up ladies",
    "diamon hands",
    "yeah same",
    "me too",
    "word",
    "good how are you",
    "hi",
    "Hellooo",
    "To the moon",
    "Moonshots",
];

const numLoops = 90;
const minutesWait = 1.05;

let run = true;

for (let i = 1; i < numLoops; i++) {
    const max = phrases.length;

    const randumNum = getRandomInt(max - 1);

    const phrase = phrases[randumNum];

    await makeFetch(phrase);

    await delay(minutesWait);
}
