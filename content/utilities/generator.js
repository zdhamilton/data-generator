const randomip = require('random-ip');
const randomua = require('random-useragent');
const randomnormal = require('random-normal');
const { v4: uuidv4 } = require('uuid');
const datetime = require('node-datetime');

class Generator {
    static normalDistribution(mean, stddev, rounded=true) {
        var num = randomnormal({ mean: mean, dev: stddev })
        if (rounded) {
            num = Math.round(num);
        } 
        return num;
    }
    static id(type, length) {
        const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
        switch (type) {
            case "alphabetical":
                var options = alphanumeric.slice(0,26);
                var id = '';
                for (let i=0; i<length; i++) {
                    id += options[Math.floor(Math.random()*options.length)];
                }
                return id;
            case 'numeric':
                var options = alphanumeric.slice(26);
                var id = '';
                for (let i=0; i<length; i++) {
                    id += options[Math.floor(Math.random()*options.length)];
                }
                return id;
            case 'alphanumeric':
                var options = alphanumeric;
                var id = '';
                for (let i=0; i<length; i++) {
                    id += options[Math.floor(Math.random()*options.length)];
                }
                return id;
        }
    }
    static uuid() {
        return uuidv4();
    }
    static ip(type='public') {
        switch (type) {
            case 'public':
                return randomip('0.0.0.0');
            case 'private':
                return randomip('10.0.0.0', 16);
        }
    }
    static chooseRandom(array) {
        return array[Math.floor(Math.random()*array.length)];
    }
    static randomRequestPath() {
        const data = [
            { "all": ["fleeb","flurbo","purgenol","schmeckle","smidgen","sneezy_xl","turbulent_juice","kalaxian_crystal","crystalized_xanthenite","butter_robot","mega_seeds","mr_meeseeks_box","space_cruiser"] },
            { "tools": ["mr_meeseeks_box","butter_robot"] },
            { "drinks": ["purgenol","turbulent_juice"] },
            { "materials": ["mega_seeds","kalaxian_crystal","crystalized_xanthenite"] },
            { "vehicles": ["space_cruiser","sneezy_xl"] },
            { "currency": ["currency","schmeckle","brapple","blemflarck","flurbo","smidgen"] }
        ]
    }
    static userAgent() {
        return randomua.getRandom();
    }
    static timestamp(format, offset=0) {
        var dt = datetime.create();
        dt.offsetInHours(offset)
        return dt.format(format);
    }
}

module.exports = Generator;