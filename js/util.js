/**
 * @desc: 工具箱
 * @author: yiyh
 */

const util = (function () {
  /**
   * @desc 某元素进入全屏
   * @param {*} elem
   * @param {*} cb
   */
  const reqFullScreen = (elem, cb) => {
    const reqFullScreenApi = elem.requestFullScreen ||
      elem.webkitRequestFullScreen ||
      elem.mozRequestFullScreen ||
      elem.msRequestFullScreen;
      if (reqFullScreenApi) {
        reqFullScreenApi.call(elem);
        Promise.resolve().then(params => {
          debugger;
          cb && cb();
        });
      }
      else {
        console.log('requstFullScreen is not supported!');
      }
  };
/**
 * 某元素退出全屏
 * @param {*} elem 
 * @param {*} cb 
 */
  const exitFullScreen = (elem, cb) => {
    const exitFullScreenApi = document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitCancelFullScreen  ||
      document.msRequestFullScreen;
      console.log('exit');
      if (exitFullScreenApi) {
        exitFullScreenApi.call(document);
        Promise.resolve().then(params => {
          cb && cb();
        })
      }
      else {
        console.log('exitFullScreen is not supported!');
      }
  }
  /**
   * 返回全屏的元素或者null
   */
  const getCurrFullscreenDom = () => 
    document.currentFullScreenElement ||
    document.webkitCurrentFullScreenElement ||
    document.mozCurrentFullScreenElement ||
    document.msCurrentFullScreenElement
  

  const addFullScreenChangedEvent = (elem, fullScreenCb, exitFullscreenCb) => {
    elem.addEventListener('webkitfullscreenchange', function (e) {
      let currFullScreenElement = getCurrFullscreenDom();
      if (currFullScreenElement) {
        fullScreenCb && fullScreenCb();
        console.log('do sth when fullscreened');
      }
      else {
        exitFullscreenCb && exitFullscreenCb();
        
        console.log('do sth when exitFullscreened');
      }
    });
  }

  return {
    reqFullScreen,
    exitFullScreen,
    getCurrFullscreenDom,
    addFullScreenChangedEvent
  };
})();
