import Quill from 'quill'
let BlockEmbed = Quill.import('blots/embed');
import Link from '../link';

const ATTRIBUTES = ['height', 'width'];

class Iframe extends BlockEmbed {
  static create(value) {
    if(value.indexOf('</iframe>')>-1) {
      return new DOMParser().parseFromString(value,'text/html').body.childNodes[0]
    }
    const node = super.create(value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.setAttribute('src', this.sanitize(value));
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static sanitize(url) {
    return Link.sanitize(url); 
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

  html() {
    const { iframe } = this.value();
    return `<a href="${iframe}">${iframe}</a>`;
  }
}
Iframe.blotName = 'iframe';
Iframe.tagName = 'IFRAME';


export default Iframe;
