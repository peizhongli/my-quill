import Quill from 'quill'
let Inline = Quill.import('blots/inline');
Inline.order.push('ask')
console.log(1111,Inline)
class Ask extends Inline {
  static create(value) {

    let node = document.createElement('ask')
    if(value.value) {
      value = value.value
    }
    node.setAttribute('value', value);
    return node;

  }

  static formats(domNode) {
    return {
      value: domNode.getAttribute('value'),
      inner: domNode.innerText
    };
  }


  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute('value', value);
    }
  }
}
Ask.blotName = 'ask';
Ask.tagName = 'ASK';

export default Ask;
