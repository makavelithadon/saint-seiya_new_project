/*jshint esversion: 6 */
var app = {
    header:{
        style: {
            height:0
        },
        html: document.getElementById('header')
    },
    setHeaderHeight: function (height) {
        app.header.html.style.height = height + 'px';
        app.header.style.height = height + 'px';
    },
    knight: {
        create: function (values) {
            console.log('this',this);
            var instance = Object.create(this);
            Object.keys(values).forEach((key) => {
                instance[key] = values[key];
            });
            return instance;
        }
    },
    knights: [],
    animatedKnight: false,
    focusOnKnight: false,
    initKnightsNavBar: function () {
        for (let i = 0, j = this.knights.length; i < j; i++) {
            var el = this.knights[i];
            (function (el, i) {
                window.setTimeout(function () {
                    el.html.navBar.style.transform = 'translateX(0)';
                }, i * 200);
            })(el, i);
        }
    },
    animateKnightNavBar: function (knight) {
        app.animatedKnight = true;
        app.focusOnKnight = true;
        window.setTimeout(function () {
            if (knight.className.indexOf('focus') === -1) {
                knight.className += ' focus';
                knight.style.top = 0;
                knight.style.bottom = 0;
                knight.style.zIndex = 11;
                knight.style.height = app.header.style.height;
            }
        }, 300);
    }
};

export {app};
