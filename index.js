const Cube = require('cano-cube');
const requireAll = require('require-all');
const map = require('lodash/map');
const path = require('path');

/**
  * @class ServicesCube
  * @classdesc This cube is for instance and load services to the cano app core
  * @extends Cube
  * @author Antonio Mejias
  */
class ServicesCube extends Cube {

    /**
     * @constructs
     * @author Antonio Mejias
     */
    constructor(cano) {
        super(cano)
    }

    /**
     * @override
     * @method prepare
     * @description Ask if the cano.app.services object exist, if not exist
     * the method create the proton.app.services object
     * @author Antonio Mejias
     */
    prepare() {
        return new Promise((resolve) => {
            if (!this.cano.app.services) this.cano.app.services = {};
            resolve();
        })
    }

    /**
     * @override
     * @method up
     * @description This method run the cube services main logic, in this case, instance
     * all the services in the api folder and bind it to the cano app core
     * @author Antonio Mejias
     */
    up() {
        return new Promise((resolve) => {
            const requiredServices = requireAll(this.servicePath)
            map(requiredServices, (Service, fileName) => {
                const service = new Service();
                this.bindToApp('services', fileName, service)
            })
            resolve()
        })
    }

    /**
     * @method servicePath
     * @description This method is a getter that return the absolute path where the
     * services are located
     * @author Antonio Mejias
     */
    get servicePath() {
        return path.join(this.cano.app.paths.api, '/services')
    }
}

module.exports = ServicesCube;
