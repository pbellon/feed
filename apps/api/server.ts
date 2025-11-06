// https://fastify.dev/docs/latest/Reference/TypeScript/

import Fastify from 'fastify'

import { EventsQuerystringSchema } from './types.js';
import { Type, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { EventSchema } from '@feed/types';

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

server.get('/users', (request, reply) => {

})

const DEFAULT_PAGE_SIZE = 10;

server.get('/events', {
  schema: {
    querystring: EventsQuerystringSchema,
    response: {
      200: Type.Array(EventSchema)
    }
  },
}, (request, reply) => {
    const { status, page = 0, pageSize = DEFAULT_PAGE_SIZE, endDate, startDate, type } = request.query;
    console.log({ status, page, pageSize, endDate, startDate, type });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})