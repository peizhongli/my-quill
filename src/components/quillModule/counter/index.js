class Counter {
    constructor(quill, options) {
      this.quill = quill;
      this.maxLength = options.maxLength;
      this.container = document.querySelector('#counter');
      this.container.style.opacity = options.show?1:0;
      quill.on('text-change', this.update.bind(this));
      this.update();  // 初始化内容
    }
  
    calculate() {
    //   let text = this.quill.getText();
    //   console.log('text',text)
    //   if (this.options.unit === 'word') {
    //     text = text.trim();
    //     // Splitting empty text returns a non-empty array
    //     return text.length > 0 ? text.split(/\s+/).length : 0;
    //   } else {
    //     return text.length;
    //   }
      return this.quill.getText().length - 1;
    }
  
    update() {
      let length = this.calculate();
      
      if (length > this.maxLength) {
        this.quill.deleteText(this.maxLength, length-this.maxLength);
        length = this.calculate();
      }
      this.container.innerText = `当前字数 ${length}/${this.maxLength}`;
    }
  }
  export default Counter;
