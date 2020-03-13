import fs from 'modules/fs.js'
import Cms from 'modules/cms.js'

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
    this.cms = new Config({
      configUrl: options.configUrl,
      fs: options.fs,
      parse: {
        content: options.parseContent,
        template: options.parseTemplate
      },
      config: this.config
    })
  }
}
