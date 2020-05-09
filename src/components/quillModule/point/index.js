import Quill from 'quill'
let Inline = Quill.import('blots/inline');

class Point extends Inline {
  static create(value) {
    let node = document.createElement('a')
    node.setAttribute('href', value);
    return node;
  }

  static formats(domNode) {
    return {
      href: domNode.getAttribute('href'),
      inner: domNode.innerText
    };
  }

  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : `http://${url}`;
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute('href', value);
    }
  }
}
Link.blotName = 'point';
Link.tagName = 'A';

function sanitize(url, protocols) {
  return protocols.find(i=>url.indexOf(i)==0);
}

export default Point;
