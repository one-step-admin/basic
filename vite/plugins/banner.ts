import banner from 'vite-plugin-banner'

export default function createBanner() {
  return banner(`
/**
 * 由 One-step-admin 提供技术支持
 * Powered by One-step-admin
 * https://one-step-admin.github.io
 */
  `)
}
