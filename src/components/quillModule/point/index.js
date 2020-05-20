import Quill from 'quill'
let Inline = Quill.import('blots/inline');

class Point extends Inline {
  static create(value) {
    let node = document.createElement('point')
    if(value.value) {
        value = value.value
    }
    node.setAttribute('id', value);
    return node;
  }

  static formats(domNode) {
    return {
      value: domNode.getAttribute('id'),
      inner: domNode.innerText
    };
  }

  

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute('id', value);
    }
  }
}
Point.blotName = 'point';
Point.tagName = 'POINT';

export default Point;
