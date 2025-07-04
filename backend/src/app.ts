import Fastify from 'fastify';

const server = Fastify({
  logger: true,
});

server.listen({ port: 3000 }, (errorMessage: Error | null) => {
  if (errorMessage) {
    server.log.error(errorMessage);
    process.exit(1);
  }
});
