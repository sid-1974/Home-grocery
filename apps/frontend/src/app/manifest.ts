import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HomeGrocery',
    short_name: 'HomeGrocery',
    description: 'Smart Grocery Shopping List & Sharing',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4ade80',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
