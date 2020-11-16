let webPush = require("web-push");

const vapidKeys = {
    publicKey: "BHrDsMuF21vDB2UH9eMlWn3e6vdvcQyfdvAvPHntPkVTckoqAWFKPJ5d4z7A8pqEmXteRAy_vFopeT9LZzE5xz0",
    privateKey: "hgM55m6ommsAuBptFSgC-wngPf1deXHHdmO4fCfIUKs"
};

webPush.setVapidDetails("mailto:example@domain.org", vapidKeys.publicKey, vapidKeys.privateKey)

let pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/dQS13NvdXcM:APA91bHsT4UCdHVaabSJEtZUqkkEwLuLmvRvT2Du5QVj2zfpwavvPnDSIm1XLSZx65iHNr87R37NrigWjn3GihB7xd--S7r_FM7rSZBfYph10LFMkTxksjDVqGrA3c4T10mODN3vxrR1",
    keys: {
        p256dh: "BDpJpRKst32g4xyJKiMz4scMgXELYNp5LRhjozTbPsx++er8BXUIX+ZPi9AiEFlhpDJvAJqhKWmRpZqA9nwFCpA=",
        auth: "AakMhNQO11X0uftZfydhtA==",
    },
};

let payload = "Selamat Aplikasi Anda sudah dapat menerima push notifikasi";

let options = {
    gcmAPIKey: "852074121555",
    TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);