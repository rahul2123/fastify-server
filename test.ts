import fastify, { FastifyInstance } from 'fastify';
const { fastifyRequestContextPlugin } = require('fastify-request-context');

const server: FastifyInstance = fastify();

server.register(fastifyRequestContextPlugin);

const preHandlerFn = (req, reply, done): any => {
	req.requestContext.set('hello', 'hello world');
	console.log(req.requestContext.get('hello'));
	done();
};

const handlerFn = (req, reply): any => {
	console.log(req.requestContext.get('hello'));
	reply.send('hello world');
};

server.route({
	method: ['GET','POST'],
	url: '/test',
	preHandler: preHandlerFn,
	handler: handlerFn
});

console.log('Starting fastify Typescript server ');

server.listen(8085, '0.0.0.0', (err, address): void => {
	if (err) {
		console.warn(err);
		process.exit(1);
	}
	console.warn(`Server listening at ${address}`);
});
