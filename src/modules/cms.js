export default class Cms{
  constructor (options) {
    this.fs = options.fs
    this.configUrl = options.configUrl
    this.parser = options.parser
    this.cache = {
      listEntryLayouts: {},
      listEntries: {}
    }
    this.config = ''
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

  getPages () {
    if (!this.config) {
      throw new Error('Config file has not been loaded yet.')
    }
    if (this.config && this.config.content && this.config.content.pages && Object.keys(this.config.content.pages).length) {
      return Object.keys(this.config.content.pages).map(page => this.config.content.pages[page])
    } else {
      throw new Error('Pages definition is missing in config file.')
    }
  }

  getPageData (page) {
    if (!this.config) {
      throw new Error('Config file has not been loaded yet.')
    }
    if (this.config && this.config.content && this.config.content.pages && this.config.content.pages[page]) {
      const pageConfig = this.config.content.pages[page]
      const pageContentPath = this.fs.$path.normalize(this.config.content.src, pageConfig.content)
      const pageLayoutPath = this.fs.$path.normalize(this.config.theme.url, pageConfig.layout)
      const pageContent = this.fs.readFile(pageContentPath)
      const layoutContent = this.fs.readFile(pageLayoutPath)
      return {
        content: pageContent,
        layout: layoutContent
      }
    } else {
      throw new Error(`There is no such page as ${page}.`)
    }
  }

  // TODO - not sure if longer needed
  // getPageListEntryFiles (page) {
  //   if (!this.config) {
  //     throw new Error('Config file has not been loaded yet.')
  //   }
  //   if (this.config && this.config.content && this.config.content.pages && this.config.content.pages[page] && this.config.content.pages[page].type === 'list') {
  //     const pageContent = this.config.content.pages[page]
  //     if (pageContent.entry && pageContent.entry.content && pageContent.entry.content.length) {
  //       if (!this.cache.listEntries.hasOwnProperty(page)) {
  //         this.cache.listEntries[page] = []
  //       }
  //       const pageListEntry
  //       this.cache.listEntries[page].push()
  //     } else {
  //       throw new Error(`Path for list entry contents has not been provided for ${page}.`)
  //     }
  //   } else {
  //     throw new Error(`There is no such list page as ${page}.`)
  //   }
  // }

  getListSingleEntryData (contentFileName, page) {
    if (!this.config) {
      throw new Error('Config file has not been loaded yet.')
    }
    if (this.config && this.config.content && this.config.content.pages && this.config.content.pages[page] && this.config.content.pages[page].type === 'list') {
      const pageConfig = this.config.content.pages[page]
      const pageEntryContentPath = this.fs.$path.normalize(this.config.content.src, pageConfig.entry.content)
      const pageEntryContent = this.fs.readFile(pageEntryContentPath)
      let data = {
        content: pageEntryContent
      }
      if (this.cache.listEntryLayouts[page]) {
        data.layout = this.cache.listEntryLayouts[page]
      } else {
        const pageEntryLayoutPath = this.fs.$path.normalize(this.config.content.src, pageConfig.entry.layout)
        const layoutEntryContent = this.fs.readFile(pageEntryLayoutPath)
        data.layout = layoutEntryContent
      }
      return data
    } else {
      throw new Error(`There is no such list page as ${page}.`)
    }
  }
}
