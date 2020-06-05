import Quill from 'quill'
let Inline = Quill.import('blots/inline');
class Point extends Inline {
  static create(value) {
    const node = document.createElement('a')
    node.setAttribute('id', value);
    node.setAttribute('href', 'javascript:void(0);');
    node.setAttribute('class', 'point');
    node.setAttribute('style', 'text-decoration: none;color:inherit;');
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('id');
  }

  

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute('id', value);
      node.setAttribute('class', 'point');
      this.domNode.setAttribute('href', 'javascript:void(0);');
      this.domNode.setAttribute('style', 'text-decoration: none;color:inherit;');
    }
  }
}
Point.blotName = 'point';
Point.className = 'point';
Point.tagName = 'A';

export default Point;
