// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     proxy: {
// //       '/api': 'http://127.0.01:5000'
// //     }
// //   }
// // })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.png', 'logo.png'], // static files
//       manifest: {
//         name: 'Chronous',
//         short_name: 'Chronous',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#1a202c',
//         theme_color: '#6b46c1',
//         icons: [
//           { src: '/logo.png', sizes: '192x192', type: 'image/png' },
//           { src: '/logo.png', sizes: '512x512', type: 'image/png' },
//         ],
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/chronous-production\.up\.railway\.app\/api\/.*$/,
//             handler: 'NetworkFirst', // try network, fallback to cache
//             options: {
//               cacheName: 'api-cache',
//               expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60  }, // 1 day
//             },
//           },
//         ],
//       },
//     }),
//   ],
// });





// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.png', 'logo.png'], // static files in public/
//       manifest: {
//         name: 'Chronous',
//         short_name: 'Chronous',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#1a202c',
//         theme_color: '#6b46c1',
//         icons: [
//           { src: '/logo.png', sizes: '192x192', type: 'image/png' },
//           { src: '/logo.png', sizes: '512x512', type: 'image/png' },
//         ],
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/chronous-production\.up\.railway\.app\/api\/tasks.*$/,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'api-cache',
//               expiration: {
//                 maxEntries: 100,
//                 maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
//               },
//               cacheableResponse: {
//               statuses: [0, 200], // cache even opaque responses
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
//   server: {
//     proxy: {
//       '/api': 'http://127.0.0.1:5000', // ✅ fixed localhost
//     },
//   },
// });







import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'logo.png'], // static files in public/
      manifest: {
        name: 'Chronous',
        short_name: 'Chronous',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a202c',
        theme_color: '#6b46c1',
        icons: [
          { src: '/logo.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        runtimeCaching: [
          // ✅ Production API (Railway)
          {
            urlPattern: /^https:\/\/chronous-production\.up\.railway\.app\/api\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // ✅ Local API (when running via Vite proxy)
          {
            urlPattern: /\/api\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000', // ✅ fixed localhost
    },
  },
});

