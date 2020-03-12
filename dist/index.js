import fs from 'modules/fs.js';

class Writteli {
  constructor (options) {
    // abstract class check
    if (new.target === Writteli) {
      throw new Error('Cannot instantiate Base Class')
    }
    this.parse = {
      content: options.parseContent,
      template: options.parseTemplate
    };
    this.fs = fs;
  }
}

export default Writteli;
