/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'de'],
    localeDetection: true,
    defaultLocale: 'en',
  }
}

module.exports = nextConfig
