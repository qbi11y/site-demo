var app = angular.module('SiteGenerator', ['ui.router', 'Controllers']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'views/index.html',
            controller: 'ImageCtrl'
        })

        .state('details', {
            url: '/details/:id',
            templateUrl: 'views/details.html',
            controller: 'DetailCtrl'
        })
})