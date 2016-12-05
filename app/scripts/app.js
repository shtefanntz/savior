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
  .constant('gameTimeSpanInMiliseconds', 40000)
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/game', '/game/overview');
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
      .state('game', {
        url: '/game',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('overview', {
        url: '/overview',
        parent: 'game',
        templateUrl: 'views/dashboard/overview.html'
      })
      .state('reports', {
        url: '/reports',
        parent: 'game',
        templateUrl: 'views/dashboard/reports.html'
      })
      .state('result', {
        url: '/result',
        parent: 'game',
        templateUrl: 'views/dashboard/result.html',
        controller: 'ResultCtrl'
      })
      .state('highscore', {
        url: '/highscore',
        parent: 'game',
        templateUrl: 'views/dashboard/highscore.html',
        controller: 'HighscoreCtrl'
      });

  });
