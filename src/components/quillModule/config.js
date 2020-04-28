
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video'],
    [
        { 'table': 'TD' },
        { 'table-insert-row': 'TIR' },
        { 'table-insert-column': 'TIC' },
        { 'table-delete-row': 'TDR' },
        { 'table-delete-column': 'TDC' }
    ]
];
// const toolOptions = [
//   ['bold', 'italic', 'underline', 'strike',{'header': 1}, {'header': 2},{'list': 'ordered'}, {'list': 'bullet'},{'script': 'sub'}, {'script': 'super'},{'color': []}, {'background': []},{'align': []},{'clean':'源码编辑'},'link', 'image', 'video','sourceEditor'],
// ];
// import QuillBetterTable from 'quill-better-table'

const handlers = {
  shadeBox:null,
  sourceEditor: function(){
    const reg = /<br>/g,
      toolbar = this.container,
      editor = this.quill.container.firstChild;

    if(!this.shadeBox){
      let shadeBox = this.shadeBox = document.createElement('div');
      shadeBox.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:102%; background:rgba(0,0,0,0.5); cursor:pointer';
      shadeBox.addEventListener('click',function(){
        this.style.display = 'none';
        editor.innerHTML = editor.innerText.trim();
      },false);
      toolbar.appendChild(shadeBox);
      let innerHTML = editor.innerHTML;
      innerHTML = innerHTML.replace(reg,'');
      editor.innerText = innerHTML;
    }else {
      let innerHTML = editor.innerHTML;
      innerHTML = innerHTML.replace(reg,'');
      editor.innerText = innerHTML;
      this.shadeBox.style.display = 'block';
    }
  },
  image: function(value) {
    console.log('点击图片',value)
  },
  size: function(value) {
    console.log(this.quill.selection)
    let range = this.quill.selection.savedRange;
    // let formats = this.quill.getFormat(range);
    this.quill.formatText(range.index,range.length,{
      'size': value,
    });
  },
  bold: function(value) {
    console.log(this.quill.selection)
    let range = this.quill.selection.savedRange;
    // let formats = this.quill.getFormat(range);
    this.quill.formatText(range.index,range.length,{
      'bold': value,
    });
  }
};
 
export default {
  placeholder: '',
  theme: 'snow',  // 主题
  modules: {
    toolbar: {
      container: toolOptions,  // 工具栏选项
      handlers: handlers,  // 事件重写
    },
    table: true,  // disable table module
    // 'better-table': {
    //   operationMenu: {
    //     items: {
    //       unmergeCells: {
    //         text: 'Another unmerge cells name'
    //       }
    //     }
    //   }
    // },
    // keyboard: {
    //   bindings: QuillBetterTable.keyboardBindings
    // }
  },
  // register(quill){
  //   //注册标签(因为在富文本编辑器中是没有div,table等标签的，需要自己去注册自己需要的标签)
  //   class div extends quill.import('blots/block/embed') {}
  //   class table extends quill.import('blots/block/embed') {}
  //   class tr extends quill.import('blots/block/embed') {}
  //   class td extends quill.import('blots/block/embed') {}
  //   div.blotName =div.tagName='div';
  //   table.blotName =table.tagName='table';
  //   tr.blotName =tr.tagName='tr';
  //   td.blotName =td.tagName='td';
  //   quill.register(div);
  //   quill.register(table);
  //   quill.register(tr);
  //   quill.register(td);
  // }
}