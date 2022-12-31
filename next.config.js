/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'de', 'fr'],
    localeDetection: true,
    defaultLocale: 'en',
  }
}

module.exports = nextConfig
