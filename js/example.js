﻿var TodoApp2 = Nuclear.create({
    add: function (evt) {
        evt.preventDefault();
        this.option.items.push(this.textBox.value);
    },
    render: function () {
        return '<div>\
                    <h3>TODO</h3>\
                <ul> {{#items}} <li>{{.}}</li> {{/items}}</ul>\
                    <form onsubmit="add(event)" >\
                    <input nc-id="textBox" type="text"  />\
                    <button>Add #{{items.length}}</button>\
                    </form>\
                </div>';
    }
});
new TodoApp2({ items: [] }, "#todoListContainer");

var TodoList = Nuclear.create({
    render: function () {
        return '<ul> {{#items}} <li>{{.}}</li> {{/items}}</ul>';
    }
});
var TodoApp = Nuclear.create({
    install: function () {
        this.todoList = new TodoList({ items: [] })
    },
    add: function (evt) {
        evt.preventDefault();
        this.todoList.option.items.push(this.textBox.value);
        //触发父容器的刷新
        this.refresh();
    },
    render: function () {
        return '<div>\
                    <h3>TODO</h3>'
                    + this.todoList.render() +
                    '<form onsubmit="add(event)" >\
                    <input nc-id="textBox" type="text"  />\
                    <button>Add #'+ this.todoList.option.items.length + '</button>\
                    </form>\
                </div>';
    }
});
new TodoApp({}, "#todoList2Container");

var HelloMessage = Nuclear.create({
    render: function () {
        return '<div>Hello , {{name}} !</div>';
    }
})
new HelloMessage({ name: "Nuclear" }, "#helloContainer");

var Timer = Nuclear.create({
    install: function () {
        //react这里不需要加bind(this),会导致对javascript上下文的误解
        this.interval = setInterval(this.tick.bind(this), 1000);
    },
    uninstall: function () {
        clearInterval(this.interval);
    },
    tick: function () {
        this.option.secondsElapsed++;
    },
    render: function () {
        return ' <div>Seconds Elapsed: {{secondsElapsed}}</div>';
    }
});

new Timer({ secondsElapsed: 0 }, "#timerContainer");

var TodoList = Nuclear.create({
    render: function () {
        return '<ul> {{#items}} <li>{{.}}</li> {{/items}}</ul>';
    }
});

var TodoApp = TodoList.create({
    onRefresh: function () {
        this.form = this.node.querySelector("form");
        this.textBox = this.node.querySelector("input");
        this.form.addEventListener("submit", function (evt) {
            evt.preventDefault();
            this.option.items.push(this.textBox.value);
        }.bind(this), false);
    },
    render: function () {
        return '<div>\
                         <h3>TODO</h3>'
                  + this._super.render() +
                  '<form >\
                           <input type="text"  />\
                           <button>Add #{{items.length}}</button>\
                         </form>\
                       </div>';
    }
});

new TodoApp({ items: [] }, "#todoContainer");


var Progress = Nuclear.create({
    install: function () {
        this.option.percent = function () {
            return this.value * 100 + "%";
        }
    },
    render: function () {
        if (this.option.displayNumber) {
            return '<div class="progress">\
                                    <div style="width:{{percent}};" class="progress-bar progress-bar-primary">{{percent}}</div>\
                                </div>';
        } else {
            return '<div class="progress">\
                                    <div style="width:{{percent}};" class="progress-bar progress-bar-primary"></div>\
                                </div>';
        }
    }
})
var progress = new Progress({ value: 0.6, displayNumber: true }, "#progressContainer");
//操作数据自动刷新Dom
progress.option.value = 0.3;
var progress = new Progress({ value: 0.6, displayNumber: false }, "#progressContainer2");


var Button = Nuclear.create({
    install: function () {
        this.option.disable = false;
    },
    installed: function () {
        this.node.addEventListener("click", function (evt) {
            if (this.option.onClick) {
                this.option.onClick.call(this.node, evt);
            }
        }.bind(this), false);
    },
    render: function () {
        return ' <a class="btn {{#disable}}disable{{/disable}}">{{text}}</a>';
    }
})



//new Drag({
//    dragElement: "#dragger1",
//    moveElement: "#dragger1",
//    direction: "y",
//    cursor: "n-resize"
//})

//new Drag({
//    dragElement: "#dragger2",
//    moveElement: "#dragger2",
//    start: function () {},
//    move: function () {},
//    end: function () {}
//})

//new Drag({
//    dragElement: "#dragger3",
//    moveElement: "#dragger3",
//    cursor: "e-resize",
//    direction: "x"
//})

//var PieChart = Nuclear.createCanvas({
//    sector: function (x, y, r, begin, end, color, clock, isStroke, lineWidth) {
//        var ctx = this.ctx;
//        ctx.save();
//        ctx.beginPath();
//        if (lineWidth) ctx.lineWidth = lineWidth;
//        ctx[isStroke ? "strokeStyle" : "fillStyle"] = color;
//        ctx.moveTo(x, y);
//        ctx.arc(x, y, r, begin, end, clock)
//        ctx.lineTo(x, y);
//        ctx[isStroke ? "stroke" : "fill"]();
//        ctx.restore();
//    },
//    render: function () {
//        var option = this.option;
//        var ctx = this.ctx;
//        var totalCount = 0, begin = 0;
//        var i = 0, len = option.data.length;
//        for (; i < len; i++) {
//            totalCount += option.data[i].count;
//        }
//        //Sector
//        for (i = 0; i < len; i++) {
//            var item = option.data[i];
//            var end = Math.PI * 2 * (item.count / totalCount) + begin;
//            this.sector(option.x, option.y, option.r, begin, end, item.color);
//            begin = end;
//        }
//        //Sector Border
//        for (i = 0; i < len; i++) {
//            var item = option.data[i];
//            var end = Math.PI * 2 * (item.count / totalCount) + begin;
//            this.sector(option.x, option.y, option.r, begin, end, "white", true, true, 2);
//            begin = end;
//        }
//        //Text
//        for (i = 0; i < len; i++) {
//            var item = option.data[i];
//            var end = Math.PI * 2 * (item.count / totalCount) + begin;
//            var angle = begin + (end - begin) / 2;
//            var x = option.x + option.r * Math.cos(angle);
//            var y = option.y + option.r * Math.sin(angle);
//            ctx.save();
//            ctx.font = "bold 14px Arial";
//            ctx.fillText(item.name, x - ctx.measureText(item.name).width / 2, y);
//            ctx.restore();
//            begin = end;
//        }
//    }
//})

//var pc = new PieChart(300, 300, {
//    x: 140,
//    y: 140,
//    r: 120,
//    data: [
//       { name: "Javascript", count: 100, color: "#A8322E" },
//       { name: "C#", count: 97, color: "#8FB443" },
//       { name: "C++", count: 109, color: "#2D9EBC" },
//       { name: "Java", count: 12, color: "#D3731F" },
//       { name: "PHP", count: 55, color: "#FA9416" }
//    ]
//},"#pieChartContainer");
////更改数据自动刷新Canvas
//pc.option.data[0].count = 200;


//var LineChart = Nuclear.createCanvas({
//    render: function () {
//        var canvas = this.canvas, option = this.option,
//            offset = [option.offset[0], option.offset[1]],
//            xLen = option.xValueGrid.length,
//            yLen = option.yValueGrid.length,
//            cellHeight = Math.ceil((canvas.height - offset[1]) / yLen),
//            cellWidth = Math.ceil((canvas.width - offset[0]) / xLen),
//            bottom = offset[1] + cellHeight * (yLen - 1);
//        this.renderGird(offset, xLen, yLen, cellWidth, cellHeight, bottom);
//        this.renderData(cellWidth, bottom);

//    },
//    renderGird: function (offset, xLen, yLen, cellWidth, cellHeight, bottom) {
//        var option = this.option, canvas = this.canvas, ctx = this.ctx;
//        ctx.strokeStyle = option.gridBoderColor,
//        ctx.fillStyle = option.gridFontColor,
//        ctx.lineWidth = 2;
//        var f = offset[0] + cellWidth * (xLen - 1);
//        ctx.fillStyle = option.fontColor;
//        ctx.fillText(option.yUnit, offset[0] - 22, offset[1] - 15);
//        ctx.beginPath();


//        for (var c = 0; c < yLen; c++) {
//            ctx.moveTo(offset[0], offset[1]),
//            ctx.fillText(option.yValueGrid[yLen - c - 1], offset[0] - 22, offset[1] + 5),
//            ctx.lineTo(f, offset[1]),
//            offset[1] += cellHeight;
//        }

//        offset = [option.offset[0], option.offset[1]];
//        for (var c = 0; c < xLen; c++) {
//            ctx.moveTo(offset[0], offset[1]),
//            ctx.fillText(option.xValueGrid[c] + option.xUnit, offset[0] - 10, bottom + 15),
//            ctx.lineTo(offset[0], bottom),
//            offset[0] += cellWidth;
//        }
//        ctx.stroke();
//    },
//    renderData: function (cellWidth, bottom) {
//        var option = this.option, ctx = this.ctx;
//        var h = option.yValueGrid[option.yValueGrid.length - 1] - option.yValueGrid[0];
//        offset = [option.offset[0], option.offset[1]];
//        for (var c = 0, p = option.lines.length; c < p; c++) {
//            var d = option.lines[c];
//            ctx.strokeStyle = d.lineColor,
//            ctx.beginPath();
//            for (var v = 0, m = d.data.length - 1; v < m; v++) ctx.moveTo(offset[0] + cellWidth * v, bottom - (bottom - offset[0]) * d.data[v] / h),
//            ctx.lineTo(offset[0] + cellWidth * (v + 1), bottom - (bottom - offset[0]) * d.data[v + 1] / h);
//            ctx.stroke()
//        }

//        offset = [option.offset[0], option.offset[1]];
//        for (var c = 0, p = option.lines.length; c < p; c++) {
//            var d = option.lines[c];
//            ctx.strokeStyle = d.lineColor;
//            for (var v = 0, m = d.data.length; v < m; v++) {
//                var g = offset[0] + cellWidth * v,
//                y = bottom - (bottom - offset[0]) * d.data[v] / h;
//                ctx.beginPath(),
//                ctx.lineWidth = 3,
//                ctx.arc(g, y, 4, 0, Math.PI * 2, !1),
//                ctx.stroke(),
//                ctx.beginPath(),
//                ctx.fillStyle = option.fontColor;
//                ctx.arc(g, y, 4, 0, Math.PI * 2, !1),
//                ctx.fill(),
//                v === m - 1 && (ctx.fillText(d.data[v], g + 10, y + 10))
//            }
//        }
//    }

//})

//var lineChart = new LineChart(600, 300, {
//    offset: [40, 40],
//    fontColor: "white",
//    gridBoderColor: "#ccc",
//    gridFontColor: "black",
//    yValueGrid: [0, 50, 100, 150, 200, 250, 300],
//    yUnit: "万元/㎡",
//    xValueGrid: [10, 11, 12, 1, 2, 3],
//    xUnit: "月",
//    lines: [{
//        lineColor: "#A8322E",
//        data: [23, 40, 33, 76, 20, 19]
//    },
//    {
//        lineColor: "#8FB443",
//        data: [123, 10, 23, 176, 200, 34]
//    },
//    {
//        lineColor: "#2D9EBC",
//        data: [13, 2, 7, 76, 100, 134]
//    },
//    {
//        lineColor: "#FA9416",
//        data: [11, 60, 33, 116, 1, 119]
//    }]
//}, "#lcContainer")

//setInterval(function () {
//    //数据改变自动通知视图
//    lineChart.option.lines[0].data = [random1To200(), random1To200(), random1To200(), random1To200(), random1To200(), random1To200()];
//    lineChart.option.lines[1].data = [random1To200(), random1To200(), random1To200(), random1To200(), random1To200(), random1To200()];
//    lineChart.option.lines[2].data = [random1To200(), random1To200(), random1To200(), random1To200(), random1To200(), random1To200()];
//    lineChart.option.lines[3].data = [random1To200(), random1To200(), random1To200(), random1To200(), random1To200(), random1To200()];
//}, 1000)

//function random(min, max) {
//    return min + Math.floor(Math.random() * (max - min + 1));
//}

//function random1To200() {
//    return random(1, 200);
//}

var Marquee = Nuclear.create({
    installed: function () {
        this.scroll = this.node.querySelector(".marquee-scroll");
        this.end = -20 + parseInt(window.getComputedStyle(this.scroll)["width"]) * -1;
        this.loop = setInterval(function () {
            this.option.left -= 5;
            if (this.option.left < this.end) this.option.left = this.option.width;
        }.bind(this), 100);
    },
    update: function () {
        this.scroll.style.left = this.option.left + "px";
    },
    render: function () {
        return '<div style="width:{{width}}px;overflow:hidden;position:relative;"><div  style="visibility:hidden;">a核</div><div class="marquee-scroll" style="position:absolute; white-space:nowrap;left:{{left}}px;top:0;">{{content}}</div></div>';
    }
});
new Marquee({ width: 280, left: 280, content: "张三中了 笔记本电脑  李四中了 苹果手机  王五中了 QQ靓号  孙六中了 马尔代夫双人游  ", }, "#marqueeContainer");

var Tab = Nuclear.create({
    onRefresh: function () {
        this.tabs = this.node.querySelectorAll('.nuclear-tab-nav a');
        var self = this;
        util.addEvent(this.tabs, "click", function () {
            self.option.selectedIndex = util.getNodeIndex(this);
        });
    },
    render: function () {
        var tpl = '<div class="nuclear-tab">\
                        <div class="nuclear-tab-nav">', selectedIndex = this.option.selectedIndex;
        this.option.tabs.map(function (tab, index) {
            tpl += '<a class="' + (selectedIndex === index ? "nuclear-tab-navActive" : "") + '">' + tab.title + '</a>';
        }.bind(this));
        tpl += '</div>\
                        <div class="nuclear-tab-content">\
                            <div>' + this.option.tabs[selectedIndex].content + '</div>\
                        </div>\
                    </div>';
        return tpl;
    }
});

new Tab({
    tabs: [
           { title: "tab1", content: "tab1-content" },
           { title: "tab2", content: '<a href="##">tab2-content</a>' },
           { title: "tab3", content: "<em>tab3-content</em>" }
    ],
    selectedIndex: 0
}, "#tabContainer");

var Alert = Nuclear.create({
    installed: function () {
        this.ok.addEventListener("click", function (evt) {
            this.option.display = false;
            evt.stopPropagation();
        }.bind(this), false);
    },
    render: function () {
        if (!this.option.display) return;
        return '<div>\
                    <div class="ui-mask" style="height:' + (Math.max(document.body.scrollHeight, document.body.clientHeight) - 1) + 'px;"></div>\
                    <div class="ui-dialog" style="top:' + ((document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight / 2) + 'px">\
                        <div class="ui-dialog-title">\
                            <h3>{{title}}</h3>\
                        </div>\
                        <div class="ui-dialog-content">\
                            <div title="{{msg}}">\
                                <p>{{msg}}</p></div>\
                            </div>\
                        <div nc-id="ok" class="ui-dialog-btns"><a class="ui-btn ui-btn-1">好</a>\
                        </div>\
                    </div>\
                </div>';
    }
});
Nuclear.alert = function (msg, title) {
    new Alert({ msg: msg, title: title || "提示", display: true }, "body");
};

new Button({
    text: "点我试试alert",
    onClick: function () {
        Nuclear.alert("Nuclear大法好");
    }
}, "#alertContainer");

var Carousel = Nuclear.create({
    installed: function () {
        this.links = this.nav.querySelectorAll('a');
        this.active();
    },
    to: function (index) {
        this.option.index = index;
    },
    active: function () {
        util.removeClass(this.links, "active");
        util.addClass(this.links[this.option.index], "active");
    },
    onOptionChange: function (prop, value, oldValue, path) {
        if (prop === "index") {
            this.carouselScroll.style.left = value * -100 + "%";
            this.active();
            return false;
        }
    },
    style: function () {
        return ".nuclear-carousel-box { transition: left 1s cubic-bezier(0.22, 0.61, 0.36, 1); }";
    },
    render: function () {
        var imgCount = this.option.imgs.length;
        return '<div class="nuclear-carousel">\
                    <div style="width: ' + imgCount * 100 + '%; left: ' + this.option.index * -100 + '%;" nc-id="carouselScroll" class="nuclear-carousel-box">\
                        {{#imgs}}<img style=" width:'+ 100 / imgCount + '%;" src="{{url}}" /> {{/imgs}}\
                    </div>\
                    <div nc-id="nav"  class="nuclear-nav"> \
                        {{#imgs}}<a onclick="to({{@index}})"></a> {{/imgs}}</div>\
                </div>';
    }
});

new Carousel({
    imgs: [{url:"img/room.jpg"}, {url:"img/sleep.jpg"}, {url:"img/watch.jpg"}],
    index: 0
}, "#carouselContainer");

//var Pagination = Nuclear.create({
//    install: function () {
//        this.option = util.merge({
//            total: 0,
//            pageSize: 10,
//            numDisplay: 10,
//            currentPage: 3,
//            numEdge: 0,
//            linkTo: "#",
//            prevText: "Prev",
//            nextText: "Next",
//            ellipseText: "...",
//            prevShow: true,
//            nextShow: true,
//            callback: function () { return false; }
//        }, this.option);
//        this.pageNum = Math.ceil(this.option.total / this.option.pageSize);
//    },
//    onRefresh: function () {
//        if (this.option.currentPage > 0) {
//            this.prev.addEventListener("click", function (evt) {
//                this.option.currentPage--;
//                evt.preventDefault();
//            }.bind(this), false);
//        }
//        if (this.option.currentPage < this.pageNum - 1) {
//            this.next.addEventListener("click", function (evt) {
//                this.option.currentPage++;
//                evt.preventDefault();
//            }.bind(this), false);
//        }
//
//        this.links = this.node.querySelectorAll(".link");
//        var self = this;
//        util.addEvent(this.links, "click", function (evt) {
//            self.option.currentPage = parseInt(this.getAttribute("data-pageIndex"));
//            evt.preventDefault();
//        });
//    },
//    onOptionChange: function (prop, value, oldValue, path) {
//        if (prop === "currentPage") {
//            this.option.callback(value);
//        }
//    },
//    render: function () {
//        var tpl = '<div class="pagination">';
//        var opt = this.option, interval = this.getInterval();
//        //上一页
//        if (opt.prevShow) {
//            tpl += this.getPrev();
//        }
//        //起始点
//        if (interval[0] > 0 && opt.numEdge > 0) {
//            var end = Math.min(opt.numEdge, interval[0]);
//            for (var i = 0; i < end; i++) {
//                tpl += this.getItem(i, i + 1);
//            }
//            if (opt.numEdge < interval[0] && opt.ellipseText) {
//                tpl += "<span>" + opt.ellipseText + "</span>";
//            }
//        }
//        //内部的链接
//        for (var i = interval[0]; i < interval[1]; i++) {
//            tpl += this.getItem(i, i + 1);
//        }
//        // 结束点
//        if (interval[1] < this.pageNum && opt.numEdge > 0) {
//            if (this.pageNum - opt.numEdge > interval[1] && opt.ellipseText) {
//                tpl += "<span>" + opt.ellipseText + "</span>";
//            }
//            var begin = Math.max(this.pageNum - opt.numEdge, interval[1]);
//            for (var i = begin; i < this.pageNum ; i++) {
//                tpl += this.getItem(i, i + 1);
//            }
//        }
//        //下一页
//        if (opt.nextShow) {
//            tpl += this.getNext();
//        }
//        tpl += '</div>';
//        return tpl;
//    },
//    getInterval: function () {
//        var ne_half = Math.ceil(this.option.numDisplay / 2);
//        var upper_limit = this.pageNum - this.option.numDisplay;
//        var start = this.option.currentPage > ne_half ? Math.max(Math.min(this.option.currentPage - ne_half, upper_limit), 0) : 0;
//        var end = this.option.currentPage > ne_half ? Math.min(this.option.currentPage + ne_half, this.pageNum) : Math.min(this.option.numDisplay, this.pageNum);
//        return [start, end];
//    },
//    getPrev: function () {
//        if (this.option.currentPage === 0) {
//            return '<span nc-id="prev" class="current prev">{{prevText}}</span>';
//        }
//        return '<a nc-id="prev" href="{{linkTo}}" class="prev">{{prevText}}</a>';
//    },
//    getNext: function () {
//        if (this.option.currentPage === this.pageNum - 1) {
//            return '<span nc-id="next" class="current next">{{nextText}}</span>';
//        }
//        return '<a nc-id="next" href="{{linkTo}}" class="next">{{nextText}}</a>';
//    },
//    getItem: function (pageIndex, text) {
//        if (this.option.currentPage === pageIndex) {
//            return '<span class="current">' + text + '</span>';
//        }
//        return '<a class="link" data-pageIndex="' + pageIndex + '" href="{{linkTo}}">' + text + '</a>';
//    }
//})
//new Pagination({
//    total: 100,//总个数80
//    pageSize: 10, //每页显示10项
//    numEdge: 1, //边缘页数
//    numDisplay: 4, //主体页数
//    callback: function (currentIndex) { }
//}, "#paginationContainer");

//new Layout({
//    topHeight: 40,
//    leftWidth: 60,
//    rightWidth: 50,
//    bottomHeight: 30,
//    container: "#layoutContainer"
//});

//(function () {
//var CircularProgress = Nuclear.createCanvas({
//    sector: function (x, y, r, begin, end, color, clock) {
//        var ctx = this.ctx;
//        ctx.beginPath();
//        ctx.fillStyle = color;
//        ctx.moveTo(x, y);
//        ctx.arc(x, y, r, begin, end, clock)
//        ctx.lineTo(x, y);
//        ctx.fill();
//    },
//    circle: function (x, y, r, color) {
//        this.sector(x, y, r, 0, 2 * Math.PI, color);
//    },
//    getColor: function (percent) {
//        if (percent < 20) return "#6B0300";
//        if (percent < 40) return "#814700";
//        if (percent < 60) return "#847A00";

//        if (percent < 80) return "#556C02";
//        if (percent <= 100) return "#367D00";
//    },
//    text: function (x, y, text, color) {
//        this.ctx.fillStyle = color;
//        this.ctx.font = "bold 20px Verdana";
//        this.ctx.fillText(text, x - this.ctx.measureText(text).width / 2, y + 8);
//    },
//    render: function () {
//        var x = this.canvas.width / 2, y = this.canvas.height / 2, r = x - 20, innerR = r - this.option.ringWidth;
//        this.circle(x, y, r, "#DCDCDC")
//        this.sector(x, y, r, -Math.PI / 2, 2 * Math.PI * this.option.percent / 100 - Math.PI / 2, this.getColor(this.option.percent));
//        this.circle(x, y, innerR, "white");
//        this.text(x, y, this.option.percent + "%", "black");
//    }
//})

//var cp = new CircularProgress(150, 150, { percent: 0, ringWidth: 15 }, "#circularProgressContainer");
////为了演示
//setInterval(function () {
//    if (cp.option.percent >= 100) cp.option.percent = 0;
//    cp.option.percent++;
//}, 100)
//})()



var Nav = Nuclear.create({
    scrollTo: function (evt, element) {

        evt.preventDefault();
        $("html")[0].scrollTop = $($(element).attr("href")).offset().top - 60;
        $("body")[0].scrollTop = $($(element).attr("href")).offset().top - 60;
        //$("html").scrollToTop($($(element).attr("href")).offset().top-60);
    },
    render: function () {
        return '<ul class="nc-nav">\
                      <li><a href="#e1" onclick="scrollTo(event,this)">声明式事件绑定</a></li>\
                      <li><a href="#e3" onclick="scrollTo(event,this)">模板引擎可替换</a></li>\
                      <li><a href="#e2" onclick="scrollTo(event,this)">无限嵌套</a></li>\
                      <li><a href="#e6" onclick="scrollTo(event,this)">轮播组件</a></li>\
                      <li><a href="#e5" onclick="scrollTo(event,this)">分页组件</a></li>\
                      <li><a href="#e7" onclick="scrollTo(event,this)">Alert组件</a></li>\
                      <li><a href="#e8" onclick="scrollTo(event,this)">选项卡</a></li>\
                      <li><a href="#e9" onclick="scrollTo(event,this)">跑马灯</a></li>\
                      <li><a href="#e10" onclick="scrollTo(event,this)">简单的示例</a></li>\
                      <li><a href="#e11" onclick="scrollTo(event,this)">有配置的组件</a></li>\
                      <li><a href="#e12" onclick="scrollTo(event,this)">Todo应用</a></li>\
                      <li><a href="#e16" onclick="scrollTo(event,this)">动态模板渲染</a></li>\
                 </ul>';
    }

})

new Nav({}, "body");