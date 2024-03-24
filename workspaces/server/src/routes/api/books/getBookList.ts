import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetBookListRequestQuerySchema } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';
import { GetBookListResponseSchema } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { bookRepository } from '../../../repositories';

import { init as ucaInit } from 'unicode-collation-algorithm2';
import { isContains } from '../../../lib/filter/isContainer'

// /src/lib/filter/isContains

ucaInit();

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/books',
  request: {
    query: GetBookListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookListResponseSchema,
        },
      },
      description: 'Get book list.',
    },
  },
  tags: ['[App] Books API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');
  const res = await bookRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  let books = res.value
  console.log("query",query.q)
  // console.log(isContains({ query: "コノ", target: "このあどけない恋愛に日常を" }))
  if (!!query.q) {
    const name = query.q
    books = books.filter((book) => {
      // console.log(isContains({ query: name, target: book.name }), name, book.name)
      if (isContains({ query: name, target: book.name })) {
        return true
      }
      if (isContains({ query: name, target: book.nameRuby })) {
        return true
      }
      return false
  });
  }
  return c.json(books);
});

export { app as getBookListApp };
