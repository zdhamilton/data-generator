const Generator = require('./utilities/generator');
const Shipper = require('./utilities/shipper');

const verbs = ['GET','POST','PUT','DELETE'];
const paths = ['/home','/dispatch','/items','/categories','/checkout'];
const responses = ['200','300','400','404','500','503'];
 

class Webserver {
    constructor(settings) {
        this.type = settings.type;
        this.logger = new Shipper(this.type, process.env.DATA_TOKEN, process.env.DATA_URL);
        this.start();
    }
    log = (event) => {
        this.logger.send(event);
    }
    static generator(settings) {
        const type = settings.type;
        const interval = settings.rate ? (1000/settings.rate) : 1000;
        const logger = new Shipper(type, process.env.DATA_TOKEN, process.env.DATA_URL);
        setInterval(() => {
            switch (type) {
                case 'apache':
                    var clientip = Generator.ip('public');
                    var ident = '-';
                    var auth = '-';
                    var timestamp = Generator.timestamp('d/f/Y:H:M:S +0000', 4);
                    var verb = Generator.chooseRandom(verbs);
                    var path = Generator.chooseRandom(paths);
                    var httpversion = Generator.chooseRandom(['1.0','1.1']);
                    var response = Generator.chooseRandom(responses);
                    var bytes = Generator.normalDistribution(150000, 50000);
                    var referrer = '-';
                    var agent = Generator.userAgent();
                    logger.send({
                        message: `${clientip} ${ident} ${auth} [${timestamp}] "${verb} ${path} HTTP/${httpversion}" ${response} ${bytes} "${referrer}" "${agent}"`
                    })
                    break;
                case 'iis':
                    var timestamp = Generator.timestamp('Y-m-d H:M:S');
                    var s_sitename = Generator.chooseRandom(['10.1.0.1', '10.2.0.1','10.3.0.1']);
                    var cs_method = Generator.chooseRandom(verbs);
                    var cs_uri_stem = Generator.chooseRandom(paths);
                    var cs_uri_query = '&plumbus=true';
                    var s_port = Generator.chooseRandom(['443','80']);
                    var cs_user_name = Generator.chooseRandom(['Rick', 'Jerry', 'Summer', 'Beth', 'Morty', 'MrBeauregard', 'MrPBH']);
                    var c_ip = Generator.ip('public');
                    var cs_user_agent = Generator.userAgent().replace(/\s/g,'+');
                    var cs_referrer = "-";
                    var response = Generator.chooseRandom(responses);
                    var cs_status = 0;
                    var cs_substatus = 0;
                    var time_taken = Generator.normalDistribution(15, 8);
                    logger.send({
                        message: `${timestamp} ${s_sitename} ${cs_method} ${cs_uri_stem} ${cs_uri_query} ${s_port} ${cs_user_name} ${c_ip} ${cs_user_agent} ${cs_referrer} ${response} ${cs_status} ${cs_substatus} ${time_taken}`,
                    })
                    break;
                case 'nginx':
                    var clientip = Generator.ip('public');
                    var ident = '-';
                    var auth = '-';
                    var timestamp = Generator.timestamp('d/f/Y:H:M:S +0000', 4);
                    var verb = Generator.chooseRandom(verbs);
                    var path = Generator.chooseRandom(paths);
                    var httpversion = Generator.chooseRandom(['1.0','1.1']);
                    var response = Generator.chooseRandom(responses);
                    var bytes = Generator.normalDistribution(150000, 50000);
                    var referrer = '-';
                    var agent = Generator.userAgent();
                    logger.send({
                        message: `${clientip} ${ident} ${auth} [${timestamp}] "${verb} ${path} HTTP/${httpversion}" ${response} ${bytes} "${referrer}" "${agent}"`
                    })
                    break;
                case 'express':
                    var clientip = Generator.ip('public');
                    var ident = '-';
                    var auth = '-';
                    var timestamp = Generator.timestamp('d/f/Y:H:M:S +0000', 4);
                    var verb = Generator.chooseRandom(verbs);
                    var path = Generator.chooseRandom(paths);
                    var httpversion = Generator.chooseRandom(['1.0','1.1']);
                    var response = Generator.chooseRandom(responses);
                    var bytes = Generator.normalDistribution(150000, 50000);
                    var referrer = '-';
                    var agent = Generator.userAgent();
                    logger.send({
                        message: `${clientip} ${ident} ${auth} [${timestamp}] "${verb} ${path} HTTP/${httpversion}" ${response} ${bytes} "${referrer}" "${agent}"`
                    })
                    break;
                default:
                    throw Error('[Webserver].generator(): ERROR "No supported \'type\' provided."');
            }
        }, interval)
    }
}
module.exports = Webserver;