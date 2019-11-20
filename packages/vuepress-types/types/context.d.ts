import { PluginConfig, SiteConfig, ThemeConfig } from './config'
import { Markdown } from './markdown'
import { Page, PageOptions } from './page'

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/App.js
 * @see https://vuepress.vuejs.org/plugin/context-api.html
 */

export interface ContextConstructor {
  new (options: ContextOptions): Context
}

export type App = Context

export interface Context {
  /**
   * Docs
   */
  isProd: boolean
  pages: Page[]
  sourceDir: string
  tempPath: string
  outDir: string
  base: string
  writeTemp: (file: string, content: string) => void

  /**
   * Other
   */
  options: ContextOptions
  vuepressDir: string
  libDir: string
  cwd: string
  siteConfig: SiteConfig
  themeConfig: ThemeConfig
  markdown: Markdown
  // TODO
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pluginAPI: any
  themeAPI: any
  ClientComputedMixinConstructor: any
  /* eslint-enable @typescript-eslint/no-explicit-any */
  ssrTemplate: string
  devTemplate: string
  globalLayout: string

  // private
  resolveConfigAndInitialize: () => void
  process: () => Promise<void>
  applyInternalPlugins: () => void
  applyUserPlugins: () => void
  normalizeHeadTagUrls: () => void
  resolveCacheLoaderOptions: () => void
  resolveTemplates: () => void
  resolveGlobalLayout: () => void
  resolveCommonAgreementFilePath: () => void | string
  resolvePages: () => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getThemeConfigValue: (key: string) => any
  resolveThemeAgreementFile: (filepath: string) => string | void
  resolveSiteAgreementFile: (filepath: string) => string | void

  // public
  addPage: (options: PageOptions) => Promise<void>
  getSiteData: () => SiteData
  getLibFilePath: (relative: string) => string
  dev: () => Promise<Context>
  build: () => Promise<Context>
}

export interface ContextOptions {
  sourceDir?: string
  dest?: string
  temp?: string
  siteConfig?: SiteConfig
  plugins?: PluginConfig[]
}

export interface SiteData extends SiteConfig {
  pages: string[]
}
