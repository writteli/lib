import fs from './modules/fs.js'
import Cms from './modules/cms.js'

export default class Writteli {
  constructor (options) {
    // abstract class check
    if (new.target === Writteli) {
      throw new Error('Cannot instantiate Base Class')
    }
    this.parse = {
      content: options.parseContent,
      template: options.parseTemplate
    }
    this.fs = fs
    this.configUrl = options.configUrl
    this.config = ''
    this.cms = new Cms({
      configUrl: options.configUrl,
      fs: options.fs,
      parser: {
        content: options.contentParser,
        template: options.templateParser
      },
      config: this.config
    })
  }
}
