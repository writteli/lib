export default class Cms{
  constructor (options) {
    this.fs = options.fs
    this.config = options.config
    this.parse = options.parse
  }

  getConfig () {
    if (this.configUrl && this.configUrl.length) {
      return this.fs.readFile(this.configUrl)
    } else {
      throw new Error('Config URL has not been provided.')
    }
  }
}
