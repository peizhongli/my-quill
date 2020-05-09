import Quill from 'quill'
let BlockEmbed = Quill.import('blots/embed');
import Link from '../link';

const ATTRIBUTES = ['height', 'width'];

class Video extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', this.sanitize(value));
    node.setAttribute('controls', 'controls');
    // node.setAttribute('style', 'display:block');
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
    const { video } = this.value();
    return `<a href="${video}">${video}</a>`;
  }
}
Video.blotName = 'video';
Video.tagName = 'VIDEO';


export default Video;
