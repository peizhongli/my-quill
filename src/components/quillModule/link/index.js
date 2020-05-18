import Quill from 'quill'
let Inline = Quill.import('blots/inline');

class Link extends Inline {
  static create(value) {
    let node = document.createElement('a')
    if(value.href) {
      value = value.href
    } else {
      value = this.sanitize(value)
    }
    node.setAttribute('href', value);
    node.setAttribute('target', '_blank');
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
      this.domNode.setAttribute('href', this.constructor.sanitize(value));
    }
  }
}
Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

function sanitize(url, protocols) {
  // const anchor = document.createElement('a');
  // anchor.href = url;

  // const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  // return protocols.indexOf(protocol) > -1;
  return protocols.find(i=>url.indexOf(i)==0);
}

export { Link as default, sanitize };
