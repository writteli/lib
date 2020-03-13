export default class Cms{
  constructor (options) {
    this.fs = options.fs
    this.configUrl = options.configUrl
    this.parse = options.parse
    this.config = options.config
  }

  getConfig () {
    if (this.configUrl && this.configUrl.length) {
      this.fs.readFile(this.configUrl).then(configData => {
        this.config = configData
      })
    } else {
      throw new Error('Config URL has not been provided.')
    }
  }
}
