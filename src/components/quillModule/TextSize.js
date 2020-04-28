import Quill from 'quill'
let Parchment = Quill.import('parchment')
class SizeStyleAttributor extends Parchment.Attributor.Style {
    value(domNode) {
        let value = super.value(domNode);
        console.log(domNode)
        return value;
    }

    add(node) {
        console.log(node)
        console.log(this)
        node.style.fontWeight = 'bold';
        return true;
    }
    remove(node) {
        console.log(node)
        node.style.fontWeight = 'normal';
    }
}
let SizeStyle = new SizeStyleAttributor('size', 'font-size', {
    scope: Parchment.Scope.INLINE,
    whitelist: ['12px','14px','16px','18px']
});

export default SizeStyle;