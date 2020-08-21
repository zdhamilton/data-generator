require('dotenv').config();
const fs = require('fs');
const Webserver = require('./components/webserver');
const Kubernetes = require('./components/kubernetes');
const Network = require('./components/network');
const Loadbalancer = require('./components/loadbalancer');

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
            case 'loadbalancer':
                Loadbalancer.generator(generator.settings);
                console.log(`[Builder].build() INFO 'Built '${generator.component}' generator with settings: '`+JSON.stringify(generator.settings)+"'");
                break; 
            default:
                throw Error("[Builder].build() ERROR 'No valid generator component provided.'");
        }
    })
})