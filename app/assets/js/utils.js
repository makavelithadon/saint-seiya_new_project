/*jshint esversion: 6 */
var utils = {
    style: {
        getStyle: (el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
        },
        addClass: (el, newClass) => {
            el.className += newClass;
        },
        removeClass: (el, classToRemove) => {
            var sep = el.className.indexOf(classToRemove) > 0 ? ' ' : '';
            el.className = el.className.replace(sep + classToRemove,'').trim();
        },
        hasClass: (el, searchClass) => {
            return el.className.indexOf(searchClass) > -1 ? true : false;
        }
    },
    service: {
        event: {
            registerHandler: function (target, type, callback) {
                if (target.addEventListener) target.addEventListener(type, callback, false);
            }
        },
        request: {
            fetch: (url) => {
                return window.fetch(url);
            },
            status: (response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                throw new Error(response.statusText);
            },
            json: (response) => {
                return response.json();
            },
            html: (response) => {
                return response.text();
            }
        }
    }
};

export {utils};
