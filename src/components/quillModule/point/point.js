import Quill from 'quill'
let Inline = Quill.import('blots/inline');

class Point extends Inline {
  static create(value) {
    let node = document.createElement('point')
    if(value.value) {
      value = value.value
    } else {
      value = jsStr(value)
    }
    node.setAttribute('onclick', value);
    node.setAttribute('style', setStyle());
    return node;
  }

  static formats(domNode) {
    return {
      value: getId(domNode.getAttribute('onclick')),
      inner: domNode.innerText
    };
  }

  

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute('onclick', jsStr(value));
    }
  }
}
Point.blotName = 'point';
Point.tagName = 'POINT';

function jsStr(id) {
  return `javascript:location.href='#${id}'`;
}
function setStyle() {
  return 'color: #06c;';
}
function getId(str) {
  let id = null
  let reg = /javascript:location.href='#(.*)'/
  if(str.match(reg)) {
    id = str.match(reg)[0]
  }
  return id;
}

export default Point;
