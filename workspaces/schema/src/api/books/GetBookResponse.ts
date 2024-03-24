import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author, book, episode, image } from '../../models';

const episodeSchema = createSelectSchema(episode)
.pick({
  id: true,
  imageId: true,
  name: true,
  chapter: true,
  description: true,
})

export const GetBookResponseSchema = createSelectSchema(book)
  .pick({
    description: true,
    id: true,
    name: true,
    nameRuby: true,
  })
  .extend({
    author: createSelectSchema(author)
      .pick({
        description: true,
        id: true,
        name: true,
      })
      .extend({
        image: createSelectSchema(image).pick({
          alt: true,
          id: true,
        }),
      }),
    episodes: episodeSchema.array(),
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  });

export type GetBookResponse = z.infer<typeof GetBookResponseSchema>;
export type GetBookResponse_episode = z.infer<typeof episodeSchema>; 
