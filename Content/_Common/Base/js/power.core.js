
/**
 * 此文件的头部注释
 */

/*global jQuery: false, window: false */

(function ($) {
    'use strict';

    var pe,
        tools;

    pe = window.pe = {};

    tools = {
        /**
         * 生成一组随机的Id号码
         * @param len 长度
         * @param radix   参数
         * @returns {string}  id号码
         */
        uuid: function (len, radix) {
            len = len || 8;
            radix = radix || 2;
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
                .split(''); // UNDONE [2014-4-17] [关海明] 变量小写命名。这里为什么要把CHARS变量赋值给chars，而不直接用CHARS。
            var chars = CHARS,
                uuid = [],
                i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    uuid[i] = chars[0 | Math.random() * radix];
                }
            } else {
                var r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        },
        errorResultHandler: {
            'NotAuthenticated': function (result) {
                window.top.location.href = result.LogOnUrl;

                return '';
            },

            'NotAuthorized': function (result) {
                return '您没有权限查看所请求的内容';
            }

        },
        RegexHelper: {
            Url: /(http:\/)?\/[^\/]+/

        },
        /**
         * 裁剪字符串
         * @param str {string} 要剪裁的字符串
         * @param n {Number} 剪裁的长度
         * @returns {string}  剪裁好的字符串。
         */
        truncateStr: function (str, n) { // UNDONE [2014-4-17] [关海明] 函数命名不要使用简写；变量命名问题；变量统一在代码块开头命名，还是就近命名（变量i）？
            var r = /[^\x00-\xff]/g;
            var i;
            if (str.replace(r, 'mm').length <= n) {
                return str;
            }
            // n = n - 3;
            var m = Math.floor(n / 2);
            for (i = m; i < str.length; i++) {
                if (str.substr(0, i).replace(r, 'mm').length >= n) {
                    return str.substr(0, i) + '...';
                }
            }

            return str;
        },
        HTMLEncode: function (text) {
            return $('<div/>').text(text).html();
        },
        HTMLDecode: function (text) {
            return $('<div/>').html(text).text();
        }

    };

    pe.tools = tools;

    //object .create
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            var F = function () {};
            f.prototype = o;

            return new F();
        };
    }

    //Function method

    if (typeof Function.method !== 'function') {
        Function.prototype.method = function (name, func) {
            this.prototype[name] = func;
            return this;
        };
    }

}(jQuery));