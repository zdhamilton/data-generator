const Generator = require('./utilities/generator');
const Shipper = require('./utilities/shipper');

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
                    var timestamp = '';
                    var loadbalancer = '';
                    var client_ip = '';
                    var client_port = '';
                    var backend_ip = '';
                    var backend_port = '';
                    var request_processing_time = '';
                    var backend_processing_time = '';
                    var response_processing_time = '';
                    var elb_status_code = '';
                    var backend_status_code = '';
                    var received_bytes = '';
                    var sent_bytes = '';
                    var verb = ''; 
                    var http_protocol = '';
                    var request = '';
                    var httpversion = '';
                    var userAgent = '';
                    var ssl_cipher = '';
                    var ssl_protocol = '';
                    logger.send({
                        message: `${timestamp} ${loadbalancer} ${client_ip}:${client_port} ${backend_ip}:${backend_port} ${request_processing_time} ${backend_processing_time} ${response_processing_time} ${elb_status_code} ${backend_status_code} ${received_bytes} ${sent_bytes} "${request}" "${userAgent}" ${ssl_cipher} ${ssl_protocol}`
                    })
                    break;
                case 'haproxy':
                    var client_ip = '';
                    var client_port = '';
                    var haproxy_timestamp = '';
                    var frontend_name = '';
                    var backend_name = '';
                    var server_name = '';
                    var time_client_req = '';
                    var time_queue = '';
                    var time_backend_connect = ''; 
                    var time_server_response = '';
                    var time_duration = '';
                    var status_code = '';
                    var bytes_read = '';
                    var captured_response_cookie = '-';
                    var captured_request_cookie = '-'; 
                    var termination_state_with_cookie_status = ''; 
                    break;
                default:
                    throw Error('[Loadbalancer].generator(): ERROR "No supported \'type\' provided."');
            }
        }, 1000)
    }
}
const elb = {
    "timestamp": "2020-03-30T20:14:14.171998Z",
    "loadbalancer": "producation-site-lb",
    "client_ip": "204.246.168.192",
    "client_port": 35888,
    "backend_ip": "172.31.62.236",
    "backend_port": 80,
    "request_processing_time": 0.000066,
    "backend_processing_time": 0.266638,
    "response_processing_time": 0.000044,
    "elb_status_code": 200,
    "backend_status_code": 200,
    "received_bytes": 0,
    "sent_bytes": 24314,
    "verb": "GET",
    "http_protocol": "http",
    "request": "http://site.logz.io:80/blog/deploy-elk-production/",
    "httpversion": 1.1,
    "userAgent": "Amazon CloudFront",
    "ssl_cipher": "-",
    "ssl_protocol": "-",
}
const haproxy = {
    "client_ip": "108.162.216.47",
    "client_port": 45734,
    "haproxy_timestamp": "06/Apr/2020:16:47:12.045",
    "frontend_name": "jwapps_proxy_SSL~",
    "backend_name": "jwapp_cluster_C",
    "server_name": "CLCJWAPP6",
    "time_client_req": 77,
    "time_queue": 0,
    "time_backend_connect": 1,
    "time_server_response": 1,
    "time_duration": 79,
    "status_code": 200,
    "bytes_read": 1427,
    "captured_response_cookie": "-",
    "captured_request_cookie": "-",
    "termination_state_with_cookie_status": "--VN",
    "actconn": 8,
    "feconn": 8,
    "beconn": 0,
    "srvconn": 0,
    "retries": 0,
    "srv_queue": 0,
    "backend_queue": 0,
    "agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1|https://www.jwpepper.com/sheet-music/search.jsp?keywords=Feel+it+still&x=0&y=0&perPage=12&pageview=list-view|www.jwpepper.com",
    "http_verb": "POST",
    "http_request": "/sheet-music/login.jsp",
    "http_version": "1.1",
}
module.exports = Loadbalancer;