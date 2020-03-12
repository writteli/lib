const path = require('path')
const fse = require('fs-extra')

export default {
  getFiles (_path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path.normalize(_path), (error, files) => {
        if (!error) {
          const results = []
          files.forEach(file => {
            results.push(path.normalize(_path, file))
          })
          resolve(results.reverse())
        } else {
          reject(error)
        }
      })
    })
  },
  readFile (_path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.normalize(_path), 'utf8', (error, data) => {
        if (!error) {
          resolve(data)
        } else {
          reject(error)
        }
      })
    })
  },
  // method below source: https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
  deleteFolder: (_path) => {
    if (fs.existsSync(_path)) {
      fs.readdirSync(_path).forEach(file => {
        const currentPath = path.normalize(_path, file)
        if(fs.lstatSync(currentPath).isDirectory()) { // recurse
          module.exports.deleteFolder(path.normalize(currentPath))
        } else { // delete file
          fs.unlinkSync(currentPath)
        }
      })
      fs.rmdirSync(_path)
    }
  },
  copyFolder (_sourcePath, _targetPath) {
    return new Promise((resolve, reject) => {
      fse.copy(path.normalize(_sourcePath), path.normalize(_targetPath)).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}