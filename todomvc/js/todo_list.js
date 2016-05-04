var TodoList = Nuclear.create({
    install:function(){
        this.tpl = document.querySelector('#todoList').innerHTML;
    },
    add:function(item){
        this.option.items.push(item);
    },
    destroy:function(index){
        this.option.items.splice(index, 1);
    },
    toggleState: function (index) {
        this.option.items[index].isCompleted = this.option.items[index].isCompleted ? false : true;
    },
    edit: function (currentIndex, li) {
        var input = li.querySelector('.edit');
        this.editingIndex = currentIndex;
        util.addClass(li, 'editing');
        input.focus();
        input.value = input.value;
    },
    clearCompleted :function(){
        var i = 0,
            items = this.option.items;
        for (; i < items.length; ++i) {
            if (items[i].isCompleted) {
                items.splice(i--, 1);
            }
        }
    },
    endEdit: function (currentIndex, input) {
        var li = input.parentNode;
        util.removeClass(li, 'editing');
        li.querySelector('label').innerHTML = input.value;

    },
    onOptionChange:function(){
        this.left=0;
        this.option.items.forEach(function (item) {
            if (!item.isCompleted) {
                item.checked = "";
                this.left++;
            } else {
                item.checked = "checked";
            }
        }.bind(this))
        this.length=this.option.items.length;
        this.completeCount=this.length-this.left;
        this.option.change&&this.option.change();
    },
    render:function(){

        return this.tpl;
    }
})