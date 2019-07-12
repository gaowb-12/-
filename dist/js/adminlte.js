"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! AdminLTE app.js
* ================
* Main JS application file for AdminLTE v2. This file
* should be included in all pages. It controls some layout
* options and implements exclusive AdminLTE plugins.
*
* @Author  Almsaeed Studio
* @Support <https://www.almsaeedstudio.com>
* @Email   <abdullah@almsaeedstudio.com>
* @version 2.4.8
* @repository git://github.com/almasaeed2010/AdminLTE.git
* @license MIT <http://opensource.org/licenses/MIT>
*/
// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
  throw new Error('AdminLTE requires jQuery');
}
/* BoxRefresh()
 * =========
 * Adds AJAX content control to a box.
 *
 * @Usage: $('#my-box').boxRefresh(options)
 *         or add [data-widget="box-refresh"] to the box element
 *         Pass any option as data-option="value"
 */


+function ($) {
  'use strict';

  var DataKey = 'lte.boxrefresh';
  var Default = {
    source: '',
    params: {},
    trigger: '.refresh-btn',
    content: '.box-body',
    loadInContent: true,
    responseType: '',
    overlayTemplate: '<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>',
    onLoadStart: function onLoadStart() {},
    onLoadDone: function onLoadDone(response) {
      return response;
    }
  };
  var Selector = {
    data: '[data-widget="box-refresh"]'
  }; // BoxRefresh Class Definition
  // =========================

  var BoxRefresh = function BoxRefresh(element, options) {
    this.element = element;
    this.options = options;
    this.$overlay = $(options.overlayTemplate);

    if (options.source === '') {
      throw new Error('Source url was not defined. Please specify a url in your BoxRefresh source option.');
    }

    this._setUpListeners();

    this.load();
  };

  BoxRefresh.prototype.load = function () {
    this._addOverlay();

    this.options.onLoadStart.call($(this));
    $.get(this.options.source, this.options.params, function (response) {
      if (this.options.loadInContent) {
        $(this.element).find(this.options.content).html(response);
      }

      this.options.onLoadDone.call($(this), response);

      this._removeOverlay();
    }.bind(this), this.options.responseType !== '' && this.options.responseType);
  }; // Private


  BoxRefresh.prototype._setUpListeners = function () {
    $(this.element).on('click', this.options.trigger, function (event) {
      if (event) event.preventDefault();
      this.load();
    }.bind(this));
  };

  BoxRefresh.prototype._addOverlay = function () {
    $(this.element).append(this.$overlay);
  };

  BoxRefresh.prototype._removeOverlay = function () {
    $(this.$overlay).remove();
  }; // Plugin Definition
  // =================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), _typeof(option) == 'object' && option);
        $this.data(DataKey, data = new BoxRefresh($this, options));
      }

      if (typeof data == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option);
        }

        data[option]();
      }
    });
  }

  var old = $.fn.boxRefresh;
  $.fn.boxRefresh = Plugin;
  $.fn.boxRefresh.Constructor = BoxRefresh; // No Conflict Mode
  // ================

  $.fn.boxRefresh.noConflict = function () {
    $.fn.boxRefresh = old;
    return this;
  }; // BoxRefresh Data API
  // =================


  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this));
    });
  });
}(jQuery);
/* BoxWidget()
 * ======
 * Adds box widget functions to boxes.
 *
 * @Usage: $('.my-box').boxWidget(options)
 *         This plugin auto activates on any element using the `.box` class
 *         Pass any option as data-option="value"
 */

+function ($) {
  'use strict';

  var DataKey = 'lte.boxwidget';
  var Default = {
    animationSpeed: 500,
    collapseTrigger: '[data-widget="collapse"]',
    removeTrigger: '[data-widget="remove"]',
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    removeIcon: 'fa-times'
  };
  var Selector = {
    data: '.box',
    collapsed: '.collapsed-box',
    header: '.box-header',
    body: '.box-body',
    footer: '.box-footer',
    tools: '.box-tools'
  };
  var ClassName = {
    collapsed: 'collapsed-box'
  };
  var Event = {
    collapsing: 'collapsing.boxwidget',
    collapsed: 'collapsed.boxwidget',
    expanding: 'expanding.boxwidget',
    expanded: 'expanded.boxwidget',
    removing: 'removing.boxwidget',
    removed: 'removed.boxwidget'
  }; // BoxWidget Class Definition
  // =====================

  var BoxWidget = function BoxWidget(element, options) {
    this.element = element;
    this.options = options;

    this._setUpListeners();
  };

  BoxWidget.prototype.toggle = function () {
    var isOpen = !$(this.element).is(Selector.collapsed);

    if (isOpen) {
      this.collapse();
    } else {
      this.expand();
    }
  };

  BoxWidget.prototype.expand = function () {
    var expandedEvent = $.Event(Event.expanded);
    var expandingEvent = $.Event(Event.expanding);
    var collapseIcon = this.options.collapseIcon;
    var expandIcon = this.options.expandIcon;
    $(this.element).removeClass(ClassName.collapsed);
    $(this.element).children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer).children(Selector.tools).find('.' + expandIcon).removeClass(expandIcon).addClass(collapseIcon);
    $(this.element).children(Selector.body + ', ' + Selector.footer).slideDown(this.options.animationSpeed, function () {
      $(this.element).trigger(expandedEvent);
    }.bind(this)).trigger(expandingEvent);
  };

  BoxWidget.prototype.collapse = function () {
    var collapsedEvent = $.Event(Event.collapsed);
    var collapsingEvent = $.Event(Event.collapsing);
    var collapseIcon = this.options.collapseIcon;
    var expandIcon = this.options.expandIcon;
    $(this.element).children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer).children(Selector.tools).find('.' + collapseIcon).removeClass(collapseIcon).addClass(expandIcon);
    $(this.element).children(Selector.body + ', ' + Selector.footer).slideUp(this.options.animationSpeed, function () {
      $(this.element).addClass(ClassName.collapsed);
      $(this.element).trigger(collapsedEvent);
    }.bind(this)).trigger(collapsingEvent);
  };

  BoxWidget.prototype.remove = function () {
    var removedEvent = $.Event(Event.removed);
    var removingEvent = $.Event(Event.removing);
    $(this.element).slideUp(this.options.animationSpeed, function () {
      $(this.element).trigger(removedEvent);
      $(this.element).remove();
    }.bind(this)).trigger(removingEvent);
  }; // Private


  BoxWidget.prototype._setUpListeners = function () {
    var that = this;
    $(this.element).on('click', this.options.collapseTrigger, function (event) {
      if (event) event.preventDefault();
      that.toggle($(this));
      return false;
    });
    $(this.element).on('click', this.options.removeTrigger, function (event) {
      if (event) event.preventDefault();
      that.remove($(this));
      return false;
    });
  }; // Plugin Definition
  // =================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), _typeof(option) == 'object' && option);
        $this.data(DataKey, data = new BoxWidget($this, options));
      }

      if (typeof option == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option);
        }

        data[option]();
      }
    });
  }

  var old = $.fn.boxWidget;
  $.fn.boxWidget = Plugin;
  $.fn.boxWidget.Constructor = BoxWidget; // No Conflict Mode
  // ================

  $.fn.boxWidget.noConflict = function () {
    $.fn.boxWidget = old;
    return this;
  }; // BoxWidget Data API
  // ==================


  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this));
    });
  });
}(jQuery);
/* Layout()
 * ========
 * Implements AdminLTE layout.
 * Fixes the layout height in case min-height fails.
 *
 * @usage activated automatically upon window load.
 *        Configure any options by passing data-option="value"
 *        to the body tag.
 */

+function ($) {
  'use strict';

  var DataKey = 'lte.layout';
  var Default = {
    slimscroll: true,
    resetHeight: true
  };
  var Selector = {
    wrapper: '.wrapper',
    contentWrapper: '.content-wrapper',
    layoutBoxed: '.layout-boxed',
    mainFooter: '.main-footer',
    mainHeader: '.main-header',
    sidebar: '.sidebar',
    controlSidebar: '.control-sidebar',
    fixed: '.fixed',
    sidebarMenu: '.sidebar-menu',
    logo: '.main-header .logo'
  };
  var ClassName = {
    fixed: 'fixed',
    holdTransition: 'hold-transition'
  };

  var Layout = function Layout(options) {
    this.options = options;
    this.bindedResize = false;
    this.activate();
  };

  Layout.prototype.activate = function () {
    this.fix();
    this.fixSidebar();
    $('body').removeClass(ClassName.holdTransition);

    if (this.options.resetHeight) {
      $('body, html, ' + Selector.wrapper).css({
        'height': 'auto',
        'min-height': '100%'
      });
    }

    if (!this.bindedResize) {
      $(window).resize(function () {
        this.fix();
        this.fixSidebar();
        $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          this.fix();
          this.fixSidebar();
        }.bind(this));
      }.bind(this));
      this.bindedResize = true;
    }

    $(Selector.sidebarMenu).on('expanded.tree', function () {
      this.fix();
      this.fixSidebar();
    }.bind(this));
    $(Selector.sidebarMenu).on('collapsed.tree', function () {
      this.fix();
      this.fixSidebar();
    }.bind(this));
  };

  Layout.prototype.fix = function () {
    // Remove overflow from .wrapper if layout-boxed exists
    $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden'); // Get window height and the wrapper height

    var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
    var headerHeight = $(Selector.mainHeader).outerHeight() || 0;
    var neg = headerHeight + footerHeight;
    var windowHeight = $(window).height();
    var sidebarHeight = $(Selector.sidebar).height() || 0; // Set the min-height of the content and sidebar based on
    // the height of the document.

    if ($('body').hasClass(ClassName.fixed)) {
      $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
    } else {
      var postSetHeight;

      if (windowHeight >= sidebarHeight + headerHeight) {
        $(Selector.contentWrapper).css('min-height', windowHeight - neg);
        postSetHeight = windowHeight - neg;
      } else {
        $(Selector.contentWrapper).css('min-height', sidebarHeight);
        postSetHeight = sidebarHeight;
      } // Fix for the control sidebar height


      var $controlSidebar = $(Selector.controlSidebar);

      if (typeof $controlSidebar !== 'undefined') {
        if ($controlSidebar.height() > postSetHeight) $(Selector.contentWrapper).css('min-height', $controlSidebar.height());
      }
    }
  };

  Layout.prototype.fixSidebar = function () {
    // Make sure the body tag has the .fixed class
    if (!$('body').hasClass(ClassName.fixed)) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        $(Selector.sidebar).slimScroll({
          destroy: true
        }).height('auto');
      }

      return;
    } // Enable slimscroll for fixed layout


    if (this.options.slimscroll) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        // Destroy if it exists
        // $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')
        // Add slimscroll
        $(Selector.sidebar).slimScroll({
          height: $(window).height() - $(Selector.mainHeader).height() + 'px'
        });
      }
    }
  }; // Plugin Definition
  // =================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), _typeof(option) === 'object' && option);
        $this.data(DataKey, data = new Layout(options));
      }

      if (typeof option === 'string') {
        if (typeof data[option] === 'undefined') {
          throw new Error('No method named ' + option);
        }

        data[option]();
      }
    });
  }

  var old = $.fn.layout;
  $.fn.layout = Plugin;
  $.fn.layout.Constuctor = Layout; // No conflict mode
  // ================

  $.fn.layout.noConflict = function () {
    $.fn.layout = old;
    return this;
  }; // Layout DATA-API
  // ===============


  $(window).on('load', function () {
    Plugin.call($('body'));
  });
}(jQuery);
/* PushMenu()
 * ==========
 * Adds the push menu functionality to the sidebar.
 *
 * @usage: $('.btn').pushMenu(options)
 *          or add [data-toggle="push-menu"] to any button
 *          Pass any option as data-option="value"
 */

+function ($) {
  'use strict';

  var DataKey = 'lte.pushmenu';
  var Default = {
    collapseScreenSize: 767,
    expandOnHover: false,
    expandTransitionDelay: 200
  };
  var Selector = {
    collapsed: '.sidebar-collapse',
    open: '.sidebar-open',
    mainSidebar: '.main-sidebar',
    contentWrapper: '.content-wrapper',
    searchInput: '.sidebar-form .form-control',
    button: '[data-toggle="push-menu"]',
    mini: '.sidebar-mini',
    expanded: '.sidebar-expanded-on-hover',
    layoutFixed: '.fixed'
  };
  var ClassName = {
    collapsed: 'sidebar-collapse',
    open: 'sidebar-open',
    mini: 'sidebar-mini',
    expanded: 'sidebar-expanded-on-hover',
    expandFeature: 'sidebar-mini-expand-feature',
    layoutFixed: 'fixed'
  };
  var Event = {
    expanded: 'expanded.pushMenu',
    collapsed: 'collapsed.pushMenu'
  }; // PushMenu Class Definition
  // =========================

  var PushMenu = function PushMenu(options) {
    this.options = options;
    this.init();
  };

  PushMenu.prototype.init = function () {
    if (this.options.expandOnHover || $('body').is(Selector.mini + Selector.layoutFixed)) {
      this.expandOnHover();
      $('body').addClass(ClassName.expandFeature);
    }

    $(Selector.contentWrapper).click(function () {
      console.log();
      ; // Enable hide menu when clicking on the content-wrapper on small screens

      if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
        this.close();
      }
    }.bind(this)); // __Fix for android devices

    $(Selector.searchInput).click(function (e) {
      e.stopPropagation();
    });
  };

  PushMenu.prototype.toggle = function () {
    console.log('PushMenu.prototype.toggle');
    var windowWidth = $(window).width();
    var isOpen = !$('body').hasClass(ClassName.collapsed);

    if (windowWidth <= this.options.collapseScreenSize) {
      isOpen = $('body').hasClass(ClassName.open);
    }

    if (!isOpen) {
      this.open();
    } else {
      this.close();
    }
  };

  PushMenu.prototype.open = function () {
    console.log('PushMenu open');
    ;
    var windowWidth = $(window).width();

    if (windowWidth > this.options.collapseScreenSize) {
      $('body').removeClass(ClassName.collapsed).trigger($.Event(Event.expanded));
    } else {
      $('body').addClass(ClassName.open).trigger($.Event(Event.expanded));
    }
  };

  PushMenu.prototype.close = function () {
    console.log('PushMenu close');
    ;
    var windowWidth = $(window).width();

    if (windowWidth > this.options.collapseScreenSize) {
      $('body').addClass(ClassName.collapsed).trigger($.Event(Event.collapsed));
    } else {
      $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed).trigger($.Event(Event.collapsed));
    }
  };

  PushMenu.prototype.expandOnHover = function () {
    $(Selector.mainSidebar).hover(function () {
      if ($('body').is(Selector.mini + Selector.collapsed) && $(window).width() > this.options.collapseScreenSize) {
        this.expand();
      }
    }.bind(this), function (e) {
      if ($('body').is(Selector.expanded)) {
        if ($('body').hasClass('fixed') && window.isTreeViewMeunClicked) {
          return;
        }

        this.collapse();
      }
    }.bind(this));
  };

  PushMenu.prototype.expand = function () {
    setTimeout(function () {
      $('body').removeClass(ClassName.collapsed).addClass(ClassName.expanded);
    }, this.options.expandTransitionDelay);
  };

  PushMenu.prototype.collapse = function () {
    setTimeout(function () {
      $('body').removeClass(ClassName.expanded).addClass(ClassName.collapsed);
    }, this.options.expandTransitionDelay);
  }; // PushMenu Plugin Definition
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), _typeof(option) == 'object' && option);
        $this.data(DataKey, data = new PushMenu(options));
      }

      if (option === 'toggle') data.toggle();
    });
  }

  var old = $.fn.pushMenu;
  $.fn.pushMenu = Plugin;
  $.fn.pushMenu.Constructor = PushMenu; // No Conflict Mode
  // ================

  $.fn.pushMenu.noConflict = function () {
    $.fn.pushMenu = old;
    return this;
  }; // Data API
  // ========


  $(document).on('click', Selector.button, function (e) {
    e.preventDefault();
    Plugin.call($(this), 'toggle');
  });
  $(window).on('load', function () {
    Plugin.call($(Selector.button));
  });
}(jQuery);
/* Tree()
 * ======
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */

+function ($) {
  'use strict';

  var DataKey = 'lte.tree';
  var Default = {
    animationSpeed: 500,
    accordion: true,
    followLink: false,
    trigger: '.treeview a'
  };
  var Selector = {
    tree: '.tree',
    treeview: '.treeview',
    treeviewMenu: '.treeview-menu',
    open: '.menu-open, .active',
    li: 'li',
    data: '[data-widget="tree"]',
    active: '.active'
  };
  var ClassName = {
    open: 'menu-open',
    tree: 'tree'
  };
  var Event = {
    collapsed: 'collapsed.tree',
    expanded: 'expanded.tree'
  }; // Tree Class Definition
  // =====================

  var Tree = function Tree(element, options) {
    this.element = element;
    this.options = options;
    $(this.element).addClass(ClassName.tree);
    $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

    this._setUpListeners();
  };

  Tree.prototype.toggle = function (link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi = link.parent();
    var isOpen = parentLi.hasClass(ClassName.open);

    if (!parentLi.is(Selector.treeview)) {
      return;
    }

    if (!this.options.followLink || link.attr('href') === '#') {
      event.preventDefault();
    }

    window.isTreeViewMeunClicked = true;

    if (isOpen) {
      this.collapse(treeviewMenu, parentLi);
    } else {
      this.expand(treeviewMenu, parentLi);
    }

    window.isTreeViewMeunClicked = true;
    setTimeout(function () {
      window.isTreeViewMeunClicked = false;
    }, 200);
    console.log('window.isTreeViewMeunClicked ');
  };

  Tree.prototype.expand = function (tree, parent) {
    var expandedEvent = $.Event(Event.expanded);

    if (this.options.accordion) {
      var openMenuLi = parent.siblings(Selector.open);
      var openTree = openMenuLi.children(Selector.treeviewMenu);
      this.collapse(openTree, openMenuLi);
    }

    parent.addClass(ClassName.open);
    tree.slideDown(this.options.animationSpeed, function () {
      var _this = this;

      setTimeout(function () {
        return $(_this.element).trigger(expandedEvent);
      }, 0);
    }.bind(this));
  };

  Tree.prototype.collapse = function (tree, parentLi) {
    // debugger;
    var collapsedEvent = $.Event(Event.collapsed); //tree.find(Selector.open).removeClass(ClassName.open);

    parentLi.removeClass(ClassName.open);
    tree.slideUp(this.options.animationSpeed, function () {
      var _this2 = this;

      //tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
      setTimeout(function () {
        return $(_this2.element).trigger(collapsedEvent);
      }, 0);
    }.bind(this));
  }; // Private


  Tree.prototype._setUpListeners = function () {
    var that = this;
    $(this.element).on('click', this.options.trigger, function (event) {
      console.log();
      that.toggle($(this), event);
      return;
    });
  }; // Plugin Definition
  // =================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), _typeof(option) == 'object' && option);
        $this.data(DataKey, new Tree($this, options));
      }
    });
  }

  var old = $.fn.tree;
  $.fn.tree = Plugin;
  $.fn.tree.Constructor = Tree; // No Conflict Mode
  // ================

  $.fn.tree.noConflict = function () {
    $.fn.tree = old;
    return this;
  }; // Tree Data API
  // =============


  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this));
    });
  });
}(jQuery);
/**
 * 全屏
 */

+function ($) {
  var dom = document.querySelector('.fullscreen-menu');
  var fullscreenDom = document.querySelector('body'); // let bigScreenDom = document.querySelector('.big-screen-btn');
  // if (bigScreenDom) {
  //   fullscreenDom = bigScreenDom;
  // }

  function fullScreenCb() {
    var dom = document.querySelector('.fullscreen-menu');
    $(dom).find('.ifont').removeClass('pep-icon-test6').addClass('pep-icon-test9');

    if (!$('body').hasClass('sidebar-collapse')) {
      $('[data-toggle="push-menu"]').trigger('click');
    }
  }

  function exitFullScreenCb() {
    var dom = document.querySelector('.fullscreen-menu');
    $('.ifont.pep-icon-test9').removeClass('pep-icon-test9').addClass('pep-icon-test6');

    if ($('body').hasClass('sidebar-collapse')) {
      $('[data-toggle="push-menu"]').trigger('click');
    }
  }

  dom.addEventListener('click', function () {
    var currFullScreenDom = util.getCurrFullscreenDom();
    var fullscreenDom = document.querySelector('body');

    if (currFullScreenDom) {
      util.exitFullScreen(fullscreenDom); // $(fullscreenDom).trigger('webkitfullscreenchange');
    } else {
      // $(fullscreenDom).trigger('webkitfullscreenchange');
      util.reqFullScreen(fullscreenDom);
    }
  });
  util.addFullScreenChangedEvent(fullscreenDom, fullScreenCb, exitFullScreenCb);
  $(window).on('resize', function () {
    console.log('resize');
  });
}(jQuery);