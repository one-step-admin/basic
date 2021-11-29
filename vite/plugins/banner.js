import banner from 'vite-plugin-banner'

export default function createBanner() {
    return banner(`
/**
 * 由 One-step-admin 提供技术支持
 * https://hooray.gitee.io/one-step-admin/
 * Powered by One-step-admin
 * https://hooray.github.io/one-step-admin/
 */
    `)
}
