require('dotenv').config();
const Generator = require('./utilities/generator');
const Shipper = require('./utilities/shipper');

class Network {
    constructor(settings) {
        // TO-DO
    }
    static generator(settings) {
        const type = settings.type;
        const logger = new Shipper(type, process.env.DATA_TOKEN, process.env.DATA_URL);
        setInterval(() => {    
            switch(type) {
                case 'vpcflow':
                    var version = 2;
                    var account_id = Generator.id('numeric', 12);
                    var interface_id = 'eni-'+Generator.id('alphanumeric', 17);
                    var srcaddr = Generator.ip('public');
                    var dstaddr = Generator.ip('private');
                    var srcport = Generator.id('numeric', 4);
                    var dstport = Generator.id('numeric', 4);
                    var protocol = 6;
                    var window_packets = 1;
                    var window_bytes = Generator.normalDistribution(150000, 50000);
                    var window_start = Date.now();
                    var window_end = Date.now();
                    var action = Generator.chooseRandom(['ACCEPT', 'REJECT']);
                    var log_status = Generator.chooseRandom(['OK', 'NODATA', 'SKIPDATA']);
                    logger.send({
                        message: `${version} ${account_id} ${interface_id} ${srcaddr} ${dstaddr} ${srcport} ${dstport} ${protocol} ${window_packets} ${window_bytes} ${window_start} ${window_end} ${action} ${log_status}`
                    })
                    break;
                default:
                    throw Error('[Network].generator(): ERROR "No supported \'type\' provided."');
            }
        }, 1000);
    }
}

module.exports = Network;