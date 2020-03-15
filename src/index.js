import fs from './modules/fs.js'
import Cms from './modules/cms.js'

export default class Writteli {
  constructor (options) {
    // abstract class check
    if (new.target === Writteli) {
      throw new Error('Cannot instantiate Base Class')
    }
    this.parser = {
      content: options.parseContent,
      template: options.parseTemplate,
      async: options.asyncParsing
    }
    this.fs = fs
    this.configUrl = options.configUrl
    this.config = ''
    this.cms = new Cms({
      configUrl: options.configUrl,
      fs: options.fs,
      parser: {
        content: this.parser.content,
        template: this.parser.template,
        async: this.parser.async
      },
      config: this.config
    })
  }
}
