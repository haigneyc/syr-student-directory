import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cuse Student Deals',
    short_name: 'Cuse Deals',
    description: 'Every legit student discount in Syracuse — verified, local, and updated.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#ea580c',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'shopping', 'lifestyle'],
    screenshots: [
      {
        src: '/screenshots/home.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
  };
}
