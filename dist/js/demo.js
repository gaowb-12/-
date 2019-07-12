"use strict";

/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
$(function () {
  'use strict';
  /**
   * Get access to plugins
   */
  // $('[data-toggle="control-sidebar"]').controlSidebar()

  $('[data-toggle="push-menu"]').pushMenu();
  var $pushMenu = $('[data-toggle="push-menu"]').data('lte.pushmenu'); // var $controlSidebar = $('[data-toggle="control-sidebar"]').data('lte.controlsidebar')

  var $layout = $('body').data('lte.layout');
  $(window).on('load', function () {
    // Reinitialize variables on load
    $pushMenu = $('[data-toggle="push-menu"]').data('lte.pushmenu'); // $controlSidebar = $('[data-toggle="control-sidebar"]').data('lte.controlsidebar')

    $layout = $('body').data('lte.layout');
    changeLayout('fixed');
  });
  /**
   * Toggles layout classes
   *
   * @param String cls the layout class to toggle
   * @returns void
   */

  function changeLayout(cls) {
    $('body').toggleClass(cls);
    $layout.fixSidebar();

    if ($('body').hasClass('fixed') && cls == 'fixed') {
      $pushMenu.expandOnHover();
      $layout.activate();
    } // $controlSidebar.fix()

  }
  /**
   * Retrieve default settings and apply them to the template
   *
   * @returns void
   */


  function setup() {
    // Add the layout manager
    $('[data-layout]').on('click', function () {
      changeLayout($(this).data('layout'));
    }); //  Reset options

    if ($('body').hasClass('fixed')) {
      $('[data-layout="fixed"]').attr('checked', 'checked');
    }
  }

  setup();
  $('[data-toggle="tooltip"]').tooltip();
});