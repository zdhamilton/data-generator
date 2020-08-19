const fetch = require('node-fetch');

class Shipper {
    constructor(type, token, listener) {
        this.type = type;
        this.token = token;
        this.listener = listener;
        this.url = `https://${listener}/?token=${token}&type=${type}`
    }
    send = (data) => {
        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .catch(res => {
            console.log("[Shipper] Error: "+res)
        })
    }
}

module.exports = Shipper;