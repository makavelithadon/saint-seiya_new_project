/*jshint esversion: 6 */
import 'babel-polyfill';
var Promise = require('es6-promise').Promise;
var fetch = require('fetch-ie8');
var Vue = require('vue');
import {utils} from './utils';
import {app as App} from './app';
(function (Promise) {
    'use strict';

    // App variables

    var app = Object.create(App);
    ['Seiya', 'Shiryu', 'Hyoga', 'Shun', 'Ikki'].forEach((knight) => {
        app.knights.push(
            app.knight.create({
                name: knight,
                styles: {
                    height:0,position:'relative',top:0
                },
                html: {
                    navBar:document.querySelector('.menu__item.' + knight.toLowerCase())
                }
            })
        );
    });

    // Dom vars

    var navBarItems = app.knights,
        header = document.getElementById('header'),
        links = document.querySelectorAll('a[href]'),
        navItemMinHeight = parseInt(utils.style.getStyle(navBarItems[0].html.navBar, 'min-height')),
        navItemAnimated = false;

    utils.service.event.registerHandler(window, 'DOMContentLoaded', () => {
        var windowHeightIsLargeEnough = window.innerHeight > navItemMinHeight * navBarItems.length;
        app.setHeaderHeight(windowHeightIsLargeEnough ? window.innerHeight : navItemMinHeight * navBarItems.length);

        // animation fadeIn des knights
        navBarItems.forEach((knight, i) => {
            let el = knight.html.navBar;
            el.style.height = windowHeightIsLargeEnough ? (window.innerHeight / navBarItems.length) + 'px' : navItemMinHeight + 'px';
            el.style.position = 'absolute';
            el.style.transform = 'translateX(-100%)';
            el.style.top = windowHeightIsLargeEnough ? i * (window.innerHeight / navBarItems.length) + 'px' : i * navItemMinHeight + 'px';
            window.setTimeout(function () {
                app.initKnightsNavBar();
            }, 1000);
            if (el.addEventListener) {
                el.addEventListener('click', function () {
                    if (!app.animatedKnight) {
                        let knight = this,
                            knightName = knight.getAttribute('data-name').toLowerCase();
                        utils.service.request.fetch(knightName + '.html')
                        .then(utils.service.request.status)
                        .then(utils.service.request.html)
                        .then((html) => {
                            let temp = document.createElement('section');
                            temp.innerHTML = html;
                            let newSection = document.createElement('section');
                            newSection.setAttribute('class','page page-knight ' + knightName);
                            newSection.appendChild(temp.querySelector('#container'));
                            window.setTimeout(function () {
                                app.animateKnightNavBar(knight);
                                window.setTimeout(function () {
                                    knight.querySelector('a').style.display = 'none';
                                    document.body.appendChild(newSection);
                                }, 1000);
                            }, 250);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }, false);
            }
        });

        // annulation de la re-direction au click sur les knights
        for (let i = 0, j = links.length; i < j; i++) {
            utils.service.event.registerHandler(links[i], 'click', (e) => {
                e.preventDefault();
            });
        }

        utils.service.event.registerHandler(window, 'resize', () => {
            if (!app.focusOnKnight) {
                var windowHeight = window.innerHeight,
                    windowHeightIsLargeEnough = windowHeight > navItemMinHeight * navBarItems.length;
                if (windowHeightIsLargeEnough) app.setHeaderHeight(windowHeight);
                navBarItems.forEach((knight, i) => {
                    let el = knight.html.navBar;
                    el.style.height = windowHeightIsLargeEnough ? windowHeight / navBarItems.length + 'px' : navItemMinHeight + 'px';
                    el.style.top = windowHeightIsLargeEnough ? i * (windowHeight / navBarItems.length) + 'px' : i * navItemMinHeight + 'px';
                });
            }
        });
    });

})(Promise);
