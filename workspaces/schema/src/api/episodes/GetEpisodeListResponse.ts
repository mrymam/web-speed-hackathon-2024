import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author, book, episode, episodePage, image } from '../../models';

const episodeSchema = createSelectSchema(episode)
.pick({
  chapter: true,
  description: true,
  id: true,
  name: true,
  nameRuby: true,
  imageId: true,
})
.extend({
  book: createSelectSchema(book)
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
      image: createSelectSchema(image).pick({
        alt: true,
        id: true,
      }),
    }),
  image: createSelectSchema(image).pick({
    alt: true,
    id: true,
  }),
  pages: createSelectSchema(episodePage)
    .pick({
      id: true,
      page: true,
    })
    .extend({
      image: createSelectSchema(image).pick({
        alt: true,
        id: true,
      }),
    })
    .array(),
})
export const GetEpisodeListResponseSchema = episodeSchema.array();

export type GetEpisodeListResponse = z.infer<typeof GetEpisodeListResponseSchema>;
export type GetEpisodeListResponse_episode = z.infer<typeof episodeSchema>;
