require('dotenv').config();
const fs = require('fs') //.promises;
const Webserver = require('./content/webserver');
const Kubernetes = require('./content/kubernetes');
const Network = require('./content/network');

fs.readFile('./settings/settings.json', 'utf8', (error, data) => {
    if (error) {
        return console.log(error);
    }
    const settings = JSON.parse(data);
    settings.generators.forEach(generator => {
        switch (generator.component) {
            case 'webserver':
                Webserver.generator(generator.settings);
                console.log(`[Builder].build() INFO 'Built '${generator.component}' generator with settings: '`+JSON.stringify(generator.settings)+"'");
                break;
            case 'kubernetes':
                Kubernetes.generator(generator.settings);
                console.log(`[Builder].build() INFO 'Built '${generator.component}' generator with settings: '`+JSON.stringify(generator.settings)+"'");
                break;
            case 'network':
                Network.generator(generator.settings);
                console.log(`[Builder].build() INFO 'Built '${generator.component}' generator with settings: '`+JSON.stringify(generator.settings)+"'");
                break;
            default:
                throw Error("[Builder].build() ERROR 'No valid generator component provided.'");
        }
    })
})