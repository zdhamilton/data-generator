const Generator = require('./utilities/generator');
const Shipper = require('./utilities/shipper');

class Kubernetes {
    constructor(settings) {
        // TO-DO
        this.shipper = new Shipper(this.type, process.env.DATA_TOKEN, process.env.DATA_URL);
    }
    log = (event) => {
        this.shipper.send(event);
    }
    static generator(settings) {
        const logger = new Shipper('k8s', process.env.DATA_TOKEN, process.env.DATA_URL);
        var account_id = '123456789100';
        var fingerprint = Generator.id('alphanumeric', 64);
        var region = 'us-east-1';
        var registry = 'icecoldregistry';
        var pods = [];
        settings.namespaces.forEach(namespaces => {
            namespaces.pods.forEach(pod => {
                const template_hash = Generator.id('alphanumeric', 9);
                for (let i=0; i<pod.replicas; i++) {
                    const pod_name_id = Generator.id('alphanumeric', 5);
                    pods.push({
                        container_name: pod.container,
                        container_id: Generator.id('alphanumeric', 64),
                        container_image: `${account_id}.dkr.ecr.${region}.amazonaws.com/${registry}/${pod.container}:latest`,
                        container_image_id: `docker-pullable://${account_id}.dkr.ecr.${region}.amazonaws.com/${registry}/${pod.container}@sha256:${fingerprint}`,
                        pod_template_hash: template_hash,
                        pod_name: `${pod.container}-${template_hash}-${pod_name_id}`,
                        pod_id: Generator.uuid(),
                        namespace_name: namespaces.name,
                        namespace_id: Generator.uuid(),
                    })
                }
            })
        })
        setInterval(() => {
            var message = {
                timestamp: new Date(Date.now()).toISOString(),
                level: Generator.chooseRandom(['ERROR', 'WARN', 'INFO'])
            }
            var pod = Generator.chooseRandom(pods);
            var kubernetes = {
                container_name: pod.container_name,
                container_image: pod.container_image,
                conatiner_image_id: pod.container_image_id,
                pod_name: pod.pod_name,
                pod_id: pod.pod_id,
                namespace_name: pod.namespace_name,
                namespace_id: pod.namespace_id,
                host: 'host',
                master_url: 'https://172.20.0.1:443/api',
                labels: {
                    "pod-template-hash": pod.pod_template_hash,
                },
                fluentd_tags: `kubernetes.var.log.containers.${pod.pod_name}_${pod.namespace_name}_${pod.container_name}-${pod.container_id}.log`,
                message: `${message.timestamp} [${message.level}][${pod.container_name}]: Something happened here.`,
                docker: {
                    container_id: pod.container_id,
                },
                stream: message.level === 'ERROR' ? 'stderr' : 'stdout',
            }
            logger.send(kubernetes)
        }, 1000)
    }
}

module.exports = Kubernetes;