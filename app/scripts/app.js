'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/main');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
      .state('main', {
        url: '/main',
        parent: 'base',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/overview.html'
      })
      .state('reports', {
        url: '/reports',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/reports.html'
      });

  });
