import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  captcha: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      terms: z.boolean(),
    }),
    handler: async ({ token }) => {
      fetch('/recaptcha', {
        method: 'POST',
        body: JSON.stringify({ recaptcha: token }),
      })
        .then((response) => response.json())
        .then((gResponse) => {
          if (gResponse.success) {
            // Captcha verification was a success
          } else {
            // Captcha verification failed
          }
        });
    },
  }),
};
