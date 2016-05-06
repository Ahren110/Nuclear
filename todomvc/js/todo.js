/// <reference path="../node_modules/alloynuclear/dist/nuclear.js" />
var Todo = Nuclear.create({
    install: function () {
        this.editingIndex = -1;
        this.focus = true;
        //神坑：模板里的allChecked会变成allchecked
        this.tpl = document.querySelector('#myTpl').innerHTML;
    },
    installed: function () {
        window.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 13) {
                if (this.textBox.value.trim() !== '') {
                    this.option.items.unshift({
                        text: this.textBox.value.trim(),
                        isCompleted: false,
                        show: true,
                        isEditing: false
                    });
                    this.option.inputValue = '';
                    this.focus = true;
                } else {
                    if (this.editingIndex !== -1) {
                        this.focus = false;
                        var input = this.node.querySelectorAll('.edit')[this.editingIndex];
                        input.blur();
                        this.option.items[this.editingIndex].text = input.value;
                        this.editingIndex = -1;
                    }
                }
            }
        }.bind(this), false);
    },
    toggleAll:function() {
        var isChecked = this.toggleAllBtn.checked;
        this.option.items.forEach(function (item) {
            item.isCompleted = isChecked;
        })
    },
    focusHandler: function () {
        this.focus = true;
    },
    blurHandler:function(){
        this.focus = false;
    },
    onRefresh: function () {
        this.focus && this.textBox.focus();
    },
    toggleState: function (index) {
        this.option.items[index].isCompleted = this.option.items[index].isCompleted ? false : true;
    },
    destroy: function (index) {
        this.option.items.splice(index, 1);
    },
    clearCompleted: function () {
        var i = 0,
            items = this.option.items;
        for (; i < items.length; ++i) {
            if (items[i].isCompleted) {
                items.splice(i--, 1);
            }
        }
    },
    filter: function (evt, type) {
        evt.preventDefault();
        this.option.filter = type;
        this.option.items.forEach(function (item) {
            if (type === 'all') {
                item.show = true;
            } else if (type === 'active' && !item.isCompleted) {
                item.show = true;
            } else if (type === 'completed' && item.isCompleted) {
                item.show = true;
            } else {
                item.show = false;
            }
        });
    },
    edit: function (currentIndex, li) {
        var input = li.querySelector('.edit');
        this.editingIndex = currentIndex;
        this.option.items[currentIndex].isEditing = true;
        input.focus();
        input.value = input.value;


    },
    endEdit: function (currentIndex, input) {
        this.option.items[currentIndex].text = input.value;
        this.option.items[currentIndex].isEditing = false;
    },
    render: function () {
        var left = 0;
        this.option.items.forEach(function (item) {
            if (!item.isCompleted) {
                item.checked = "";
                left++
            } else {
                item.checked = "checked";
            }
        })
        this.option['all'] = '';
        this.option['active'] = '';
        this.option['completed'] = '';
        this.option[this.option.filter] = 'selected';
        this.option.clearWording = this.option.items.length - left > 0 ? 'Clear completed' : '';
        this.option.left = left;
        this.option.allchecked = left === 0 ? 'checked' : '';

        return this.tpl;
    }
})