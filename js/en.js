

(function () {

    var MarkdownEditor = Nuclear.create({
        install: function () {
            this.option.html = marked(this.option.value);
        },
        keyup: function () {
            this.option.html = marked(this.textarea.value);
        },
        render: function () {
            return '<div>\
                <h3>Input</h3>\
                <textarea nc-id="textarea" onkeyup="keyup()" rows="10" cols="25">{{value}}</textarea>\
                <h3>Output</h3>\
                <div class="content" nc-refresh >\
                    {{{html}}}\
                </div>\
            </div>';

        }
    });

    new MarkdownEditor({ value: 'Type some *markdown* here!', html: '' }, "#markdownContainer");

var Button = Nuclear.create({
    install: function () {
        this.option.disable = false;
    },
    click: function (evt) {
        if (this.option.click) {
            this.option.click.call(this, evt);
        }
    },
    render: function () {
        return ' <a onclick="click(event)" class="btn {{#disable}}disable{{/disable}}">{{text}}</a>';
    }
})

var SwitchButton = Button.create({
    click: function (evt) {
        this.option.disable = !this.option.disable;
        if (this.option.disable) {
            this.option.close && this.option.close.call(this, evt);
        } else {
            this.option.open && this.option.open.call(this, evt);
        }
    }
})


new Button({
    text: "I am a Button",
    click: function (evt) {
        console.log(this.option.text);//output: I am a Button
    }
}, "#buttonContainer");

new SwitchButton({
    text: "SwitchButton",
    open: function () { },
    close: function () { }
}, "#switchButtonContainer");

})()