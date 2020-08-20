const Generator = require('./utilities/generator');
const Shipper = require('./utilities/shipper');

const verbs = ['GET','POST','PUT','DELETE'];
const paths = ['/home','/dispatch','/items','/categories','/checkout'];
const responses = ['200','300','400','404','500','503'];

class Loadbalancer {
    constructor(settings) {
        // TO-DO
    }
    static generator(settings) {
        const type = settings.type;
        const logger = new Shipper(type, process.env.DATA_TOKEN, process.env.DATA_URL);
        setInterval(() => {
            switch(type) {
                case 'elb':
                    var timestamp = new Date(Date.now()).toISOString();
                    var loadbalancer = 'prod-lb';
                    var client_ip = Generator.ip('public');
                    var client_port = Generator.chooseRandom(['80','443']);
                    var backend_ip = Generator.ip('private');
                    var backend_port = Generator.chooseRandom(['80','443']);
                    var request_processing_time = 1000/Generator.normalDistribution(15, 5);
                    var backend_processing_time = 1000/Generator.normalDistribution(15, 5);
                    var response_processing_time = 1000/Generator.normalDistribution(15, 5);
                    var elb_status_code = Generator.chooseRandom(responses);
                    var backend_status_code = Generator.chooseRandom(responses);
                    var received_bytes = Generator.normalDistribution(150000, 50000);
                    var sent_bytes = Generator.normalDistribution(150000, 50000);
                    var verb = Generator.chooseRandom(verbs); 
                    var http_protocol = Generator.chooseRandom(['HTTP', 'HTTPS']);
                    var request = Generator.chooseRandom(paths);
                    var httpversion = Generator.chooseRandom(['1.0', '1.1']);
                    var userAgent = Generator.userAgent();
                    var ssl_cipher = '-';
                    var ssl_protocol = '-';
                    logger.send({
                        message: `${timestamp} ${loadbalancer} ${client_ip}:${client_port} ${backend_ip}:${backend_port} ${request_processing_time} ${backend_processing_time} ${response_processing_time} ${elb_status_code} ${backend_status_code} ${received_bytes} ${sent_bytes} "${verb} ${request} ${http_protocol}/${httpversion}" "${userAgent}" ${ssl_cipher} ${ssl_protocol}`
                    })
                    break;
                case 'haproxy':
                    var client_ip = Generator.ip('public');
                    var client_port = Generator.chooseRandom(['80', '443']);
                    var haproxy_timestamp = new Date(Date.now()).toISOString();
                    var frontend_name = 'haproxy-prod';
                    var backend_name = 'service-prod';
                    var server_name = 'node-prod';
                    var time_client_req = Generator.normalDistribution(15, 5);
                    var time_queue = Generator.normalDistribution(15, 5);
                    var time_backend_connect = Generator.normalDistribution(15, 5); 
                    var time_server_response = Generator.normalDistribution(15, 5);
                    var time_duration = Generator.normalDistribution(15, 5);
                    var status_code = Generator.chooseRandom(responses);
                    var bytes_read = Generator.normalDistribution(15000, 5000);
                    var captured_response_cookie = '-';
                    var captured_request_cookie = '-'; 
                    var termination_state_with_cookie_status = '----';
                    var actconn = Generator.normalDistribution(50, 15);
                    var feconn = Generator.normalDistribution(50, 15);
                    var beconn = Generator.normalDistribution(50, 15);
                    var srv_conn = Generator.normalDistribution(50, 15);
                    var retries = Generator.normalDistribution(3, 1);
                    var srv_queue = Generator.normalDistribution(5, 2);
                    var backend_queue = Generator.normalDistribution(5, 2);
                    var http_verb = Generator.chooseRandom(verbs);
                    var http_request = Generator.chooseRandom(paths);
                    var http_version = Generator.chooseRandom(['1.0','1.1']);
                    logger.send({
                        message: `${client_ip}:${client_port} [${haproxy_timestamp}] ${frontend_name} ${backend_name}/${server_name} ${time_client_req}/${time_queue}/${time_backend_connect}/${time_server_response}/${time_duration} ${status_code} ${bytes_read} ${captured_request_cookie} ${captured_response_cookie} ${termination_state_with_cookie_status} ${actconn}/${feconn}/${beconn}/${srv_conn}/${retries} ${srv_queue}/${backend_queue} "${http_verb} ${http_request} HTTP/${http_version}"`
                    }) 
                    break;
                default:
                    throw Error('[Loadbalancer].generator(): ERROR "No supported \'type\' provided."');
            }
        }, 1000)
    }
}

module.exports = Loadbalancer;