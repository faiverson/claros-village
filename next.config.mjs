import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push({
  //     test: /\.wasm$/,
  //     loader: 'base64-loader',
  //     type: 'javascript/auto',
  //   })

  //   config.module.noParse = /\.wasm$/

  //   config.module.rules.forEach((rule) => {
  //     ;(rule.oneOf || []).forEach((oneOf) => {
  //       if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
  //         oneOf.exclude.push(/\.wasm$/)
  //       }
  //     })
  //   })

  //   if (!isServer) {
  //     config.resolve.fallback.fs = false
  //   }

  //   // Perform customizations to webpack config
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }),
  //   )

  //   // Important: return the modified config
  //   return config
  // },
  // webpack(config) {
  //   config.experiments = {
  //     asyncWebAssembly: true,
  //     layers: true,
  //   }

  //   return config
  // },
}

export default withNextIntl(nextConfig)
