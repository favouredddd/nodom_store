;
(() => {
    function setFontSize() {
        var width = window.innerWidth;
        if (width > 600) {
            width = 600;
        }
        // 得到默认fontsize
        var doc = DD.get('html');
        var fontSize = parseFloat(DD.css(doc, 'fontSize')) || 16;
        var x = width * 16 / (20 * fontSize);
        doc.style.fontSize = x + "px";
    }

    setFontSize();
    class rotate {
        init(view) {
            view.innerHTML = `<figure style="transform: translateX(-50%) scale3d(1,1,1) rotateX(0) rotateY({{start}}deg) rotateZ(0);    width: 120px;
    height: 120px;" class="animation">
            <section class="select" x-repeat="select"></section>
        </figure>
        <figure style="transform: translateX(-50%) scale3d(.5,.5,.5) rotateX(0) rotateY({{-1*start}}deg) rotateZ(0);    width: 120px;
    height: 120px;" class="animation small">
            <section class="select" x-repeat="repeat" style="background:#1D78C1"></section>
        </figure>`
        }
        render(view) {
            const me = this;
            me.data = view.$getData().data;
            setTimeout(() => {
                if (me.data.init) {
                    me.selects = [...view.querySelectorAll(".select")];
                    me.view = view.querySelector(".animation");
                    me.data.select.forEach((i, index) => {
                        let rotate = `rotateX`;
                        if (index >= 3) {
                            rotate = `rotateY`;
                        }
                        DD.css(me.selects[index], "transform", `${rotate}(${i.x}deg) translateZ(60px)`);
                    });
                    me.data.repeat.forEach((i, index) => {
                        let rotate = `rotateX`;
                        if (index >= 3) {
                            rotate = `rotateY`;
                        }
                        DD.css(me.selects[index + 6], "transform", `${rotate}(${i.x}deg) translateZ(60px)`);
                    });
                    me.timer = setInterval(me.startTime.bind(me), 2000);
                    me.data.init = false;
                    window.addEventListener("visibilitychange", () => {
                        if (document.hidden) {
                            clearInterval(me.timer);
                        } else {
                            me.timer = setInterval(me.startTime.bind(me), 2000);
                        }
                    }, false);
                let tem=document.querySelector(".pluginWrap");
                new DD.Event({
                    view: tem,
                    eventName: "swipeleft",
                    handler() {
                        clearInterval(me.timer);
                        me.data.start -= 90;
                        me.timer = setInterval(me.startTime.bind(me), 2000);
                    }
                });
                new DD.Event({
                    view: tem,
                    eventName: "swiperight",
                    handler() {
                        clearInterval(me.timer);
                        me.data.start += 90;
                        me.timer = setInterval(me.startTime.bind(me), 2000);
                    }
                });
            }
            }, 100);

        }
        startTime() {
            let me = this;
            me.data.start += 90;
        }
    }
    DD.Plugin.create("rotate", rotate);
    DD.createModule({
        el: ".wrapanimation",
        data: {
            animation: {
                init: true,
                rotate: 0,
                start: 0,
                select: [{ x: 0 }, { x: -90 }, { x: 90 }, { x: -90 }, { x: 90 }, { x: 180 }],
                repeat: [{ x: 0 }, { x: -90 }, { x: 90 }, { x: -90 }, { x: 90 }, { x: 180 }]
            }
        }
    })
})()