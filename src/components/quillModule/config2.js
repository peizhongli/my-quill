const config = {
  // container: [
  //     ['bold', 'italic', 'underline', 'strike'],
  //     ['blockquote', 'code-block'],
  //     [{ 'header': 1 }, { 'header': 2 }],
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //     [{ 'script': 'sub' }, { 'script': 'super' }],
  //     // [{ 'indent': '-1' }, { 'indent': '+1' }],
  //     // [{ 'direction': 'rtl' }],
  //     // [{ 'size': ['small', false, 'large', 'huge'] }],
  //     // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //     [{ 'color': [] }, { 'background': [] }],
  //     // [{ 'font': [] }],
  //     // [{ 'align': [] }],
  //     ['clean'],
  //     ['link', 'image', 'video'],
  //     [
  //         { 'table': 'TD' },
  //         { 'table-insert-row': 'TIR' },
  //         { 'table-insert-column': 'TIC' },
  //         { 'table-delete-row': 'TDR' },
  //         { 'table-delete-column': 'TDC' }
  //     ]
  // ],
  container: '#toolbar',
  handlers: {
    'size': function(value) {
    let range = this.quill.selection.savedRange;
    // let formats = this.quill.getFormat(range);
    console.log(range,value)
    this.quill.formatText(range.index,range.length,{
        'size': value,
    });
    },
    'table': function () {
        this.quill.getModule('table').insertTable(2, 2)
    },
    'table-insert-row': function () {
        this.quill.getModule('table').insertRowBelow()
    },
    'table-insert-column': function () {
        this.quill.getModule('table').insertColumnRight()
    },
    'table-delete-row': function () {
        this.quill.getModule('table').deleteRow()
    },
    'table-delete-column': function () {
        this.quill.getModule('table').deleteColumn()
    },
    'table-delete': function () {
        this.quill.getModule('table').deleteTable()
    },
    'link': function() {
        console.log('超链接')
    }
  },
}
export default config