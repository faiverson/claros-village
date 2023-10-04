/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  webpack: (config) =>
  {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static",
            outputPath: "static"
          }
        }
      ]
    });

    return config;
  }
}

module.exports = nextConfig
