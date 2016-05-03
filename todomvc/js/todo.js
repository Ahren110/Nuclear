/// <reference path="../node_modules/alloynuclear/dist/nuclear.js" />
var Todo = Nuclear.create({
    install:function(){
        this.editingIndex = -1;
        this.focus=true;
    },
    installed: function () {
        window.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 13 ) {
                if( document.activeElement.id === 'new-todo' && this.textBox.value.trim() !== '') {
                    this.option.items.push({
                        text: this.textBox.value.trim(),
                        isCompleted: false,
                        show: true,
                        isEditing: false
                    });
                    this.option.inputValue = '';
                    this.focus = true;
                }else{
                    if(this.editingIndex!==-1){
                        this.focus = false;
                        var input=this.node.querySelectorAll('.edit')[this.editingIndex];
                        input.blur();
                        this.option.items[this.editingIndex].text=input.value;
                        this.editingIndex=-1;
                    }
                }
            }
        }.bind(this), false);
    },
    focusHandler:function(){
        this.focus=true;
    },
    onRefresh: function () {
        this.focus&&this.textBox.focus();
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
            } else if (type === 'active'&&!item.isCompleted) {
                item.show = true;
            } else if (type === 'completed' && item.isCompleted) {
                item.show = true;
            } else {
                item.show = false;
            }
        });
    },
    edit: function (currentIndex,li) {
        var input=li.querySelector('.edit');
        this.editingIndex = currentIndex;
        util.addClass( li,'editing');
        input.focus();
        input.value=input.value;
    },
    endEdit: function (currentIndex,input) {
        var li= input.parentNode;
        util.removeClass( li,'editing');
        this.editValue=input.value;
        li.querySelector('label').innerHTML= input.value;

    },
    render: function () {
        var left = 0, filter = this.option.filter;
        this.option.items.forEach(function (item) {
            if(!item.isCompleted ){
                left++
            }
        })
        var completed = this.option.items.length - left;

        return '<header id="header">\
				    <h1>todos</h1>\
				    <input nc-id="textBox" onfocus="focusHandler()" id="new-todo" value="{{inputValue}}"  placeholder="What needs to be done?" autofocus>\
			    </header>\
			    <section id="main">\
				    <input id="toggle-all" type="checkbox">\
				    <label for="toggle-all">Mark all as complete</label>\
				    <ul id="todo-list">\
                       {{#items}}\
                         {{#show}}\
                            <li ondblclick="edit({{@index}},this)" class="{{#isCompleted}}completed{{/isCompleted}} {{#isEditing}}editing{{/isEditing}}">\
                                <div class="view" >\
                                    <input  onclick="toggleState({{@index}})" class="toggle" type="checkbox" {{#isCompleted}}checked{{/isCompleted}}><label >{{text}}</label>\
                                    <button  onclick="destroy({{@index}})" class="destroy"></button>\
                                </div>\
                                <input class="edit"  onblur="endEdit({{@index}},this)"  nc-class="itemTextBox" value="{{text}}">\
                            </li>\
                        {{/show}}\
                    {{/items}}\
				    </ul>\
			    </section>\
			    <footer id="footer">\
				    <span id="todo-count"><strong>' + left + '</strong> item left</span>\
				    <ul id="filters">\
					    <li>\
						    <a id="filterAll"  onclick="filter(event,\'all\')" class="' + (filter === 'all' ? 'selected' : '') + '" href="#/">All</a>\
					    </li>\
					    <li>\
						    <a id="filterActive"  onclick="filter(event,\'active\')"  class="' + (filter === 'active' ? 'selected' : '') + '"  href="#/active">Active</a>\
					    </li>\
					    <li>\
						    <a id="filterCompleted" onclick="filter(event,\'completed\')"  class="' + (filter === 'completed' ? 'selected' : '') + '"   href="#/completed">Completed</a>\
					    </li>\
				    </ul>\
				    <button id="clear-completed" onclick="clearCompleted()">' + (completed > 0 ? ' Clear completed' : '') + '</button>\
			    </footer>';
    }


})