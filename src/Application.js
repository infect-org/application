{
	'use strict';



	const distributed 		= require('distributed-prototype');
	const Website 			= require('frontend');
	const InfectService 	= require('infect-service');
	const log 			 	= require('ee-log');



	module.exports = class Application {


		constructor(config) {
			this.config = config;


			// service host
			this.services = new distributed.ServiceManager();


			// api gateway
			this.services.registerService(new distributed.APIGatewayService({
				  port: 8000
				, name: 'api-gateway'
			}));


			// website
			this.services.registerService(new Website({
				  port: 9000
				, name: 'frontend'
			}));


			// datasource
			this.services.registerService(new InfectService(config));


			// go
			this.services.load().then(() => {
				console.log('INFECT loaded\n'.blue.bold);
				console.log('API Gateway'.cyan.bold+'  '.grey+'http://infect.l.dns.porn:8000'.white);
				console.log('WWW'.cyan.bold+'          '.grey+'http://infect.l.dns.porn:9000'.white);
			}).catch(log);
		}
	};
}
