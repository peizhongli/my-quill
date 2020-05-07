
const config = {
    theme: 'snow', // 主题 工具栏式
    modules: {
        toolbar: {
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
            container: '#toolbar', // 指定工具栏的dom元素
            handlers: {
                // 重置字体大小
                'size': function (value) {
                    let range = this.quill.selection.savedRange;
                    this.quill.formatText(range.index, range.length, {
                        'size': value,
                    });
                },
                // 重置table
                'table': function () {
                    this.quill.getModule('table').insertTable(2, 2)
                },
                // 重置link
                link(value) {
                    console.log(value)
                    // if (value === true) {
                    //     value = prompt('Enter link URL:'); // eslint-disable-line no-alert
                    // }
                    // this.quill.format('link', value, "user");
                },
                
            },
        },
        table: true,
        // clipboard: {
        //     matchVisual: false
        // },
    },
    placeholder: '点击输入 ...'
}

export default config