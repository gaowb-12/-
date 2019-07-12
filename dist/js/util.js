"use strict";

/**
 * @desc: 工具箱
 * @author: yiyh
 */
var util = function () {
  /**
   * @desc 某元素进入全屏
   * @param {*} elem
   * @param {*} cb
   */
  var reqFullScreen = function reqFullScreen(elem, cb) {
    var reqFullScreenApi = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen;

    if (reqFullScreenApi) {
      reqFullScreenApi.call(elem);
      Promise.resolve().then(function (params) {
        debugger;
        cb && cb();
      });
    } else {
      console.log('requstFullScreen is not supported!');
    }
  };
  /**
   * 某元素退出全屏
   * @param {*} elem 
   * @param {*} cb 
   */


  var exitFullScreen = function exitFullScreen(elem, cb) {
    var exitFullScreenApi = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msRequestFullScreen;
    console.log('exit');

    if (exitFullScreenApi) {
      exitFullScreenApi.call(document);
      Promise.resolve().then(function (params) {
        cb && cb();
      });
    } else {
      console.log('exitFullScreen is not supported!');
    }
  };
  /**
   * 返回全屏的元素或者null
   */


  var getCurrFullscreenDom = function getCurrFullscreenDom() {
    return document.currentFullScreenElement || document.webkitCurrentFullScreenElement || document.mozCurrentFullScreenElement || document.msCurrentFullScreenElement;
  };

  var addFullScreenChangedEvent = function addFullScreenChangedEvent(elem, fullScreenCb, exitFullscreenCb) {
    elem.addEventListener('webkitfullscreenchange', function (e) {
      var currFullScreenElement = getCurrFullscreenDom();

      if (currFullScreenElement) {
        fullScreenCb && fullScreenCb();
        console.log('do sth when fullscreened');
      } else {
        exitFullscreenCb && exitFullscreenCb();
        console.log('do sth when exitFullscreened');
      }
    });
  };

  return {
    reqFullScreen: reqFullScreen,
    exitFullScreen: exitFullScreen,
    getCurrFullscreenDom: getCurrFullscreenDom,
    addFullScreenChangedEvent: addFullScreenChangedEvent
  };
}();