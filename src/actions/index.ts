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
      const response = await fetch('/recaptcha', {
        method: 'POST',
        body: JSON.stringify({ recaptcha: token }),
      });
      const gResponse = await response.json();
      if (gResponse.success) {
        // Captcha verification was a success
      } else {
        // Captcha verification failed
      }
    },
  }),
};
