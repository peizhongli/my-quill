import Quill from 'quill'
let Parchment = Quill.import('parchment')
class BoldStyleAttributor extends Parchment.Attributor.Style {
    value(domNode) {
        let value = super.value(domNode);
        return value;
    }

    add(node) {
        console.log(this,node)
        node.style.fontWeight = 'bold';
        return true;
    }
    remove(node) {
        console.log(node)
        node.style.fontWeight = 'normal';
    }
}
let BoldStyle = new BoldStyleAttributor('bold', 'font-weight', {
    scope: Parchment.Scope.INLINE,
    whitelist: [true, false]
});

export default BoldStyle;