﻿

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
    text: "普通按钮",
    click: function (evt) {
        console.log(this.option.text);//output: 普通按钮
    }
}, "#buttonContainer");

new SwitchButton({
    text: "开关按钮",
    open: function () { },
    close: function () { }
}, "#switchButtonContainer");

var SVGApple = Nuclear.create({
    click: function (evt) {
        this.option.scale++;
    },
    render: function () {
        return '<svg>\
                    <path\
                      onclick="click(event)"\
					  d="M24.32,10.85c-1.743,1.233-2.615,2.719-2.615,4.455c0,2.079,1.078,3.673,3.232,4.786c-0.578,1.677-1.416,3.134-2.514,4.375c-1.097,1.241-2.098,1.862-3.004,1.862c-0.427,0-1.009-0.143-1.748-0.423l-0.354-0.138c-0.725-0.281-1.363-0.423-1.92-0.423c-0.525,0-1.1,0.11-1.725,0.331l-0.445,0.16l-0.56,0.229c-0.441,0.176-0.888,0.264-1.337,0.264c-1.059,0-2.228-0.872-3.507-2.616c-1.843-2.498-2.764-5.221-2.764-8.167c0-2.095,0.574-3.781,1.725-5.061c1.149-1.279,2.673-1.92,4.568-1.92c0.709,0,1.371,0.13,1.988,0.389l0.423,0.172l0.445,0.183c0.396,0.167,0.716,0.251,0.959,0.251c0.312,0,0.659-0.072,1.04-0.217l0.582-0.229l0.435-0.16c0.693-0.251,1.459-0.377,2.297-0.377C21.512,8.576,23.109,9.334,24.32,10.85zM19.615,3.287c0.021,0.267,0.033,0.473,0.033,0.617c0,1.317-0.479,2.473-1.438,3.467s-2.075,1.49-3.347,1.49c-0.038-0.297-0.058-0.51-0.058-0.639c0-1.12,0.445-2.171,1.337-3.153c0.891-0.982,1.922-1.558,3.096-1.725C19.32,3.329,19.447,3.311,19.615,3.287z" fill="white"\
                      transform="scale({{scale}})">\
                    </path>\
                </svg>';
    },
    style: function () {
        return 'svg{background-color:#ccc; width:230px;height:150px;}\
                path{cursor:pointer;}';
    }
});

new SVGApple({ scale: 2 }, '#SVGContainer');
})()