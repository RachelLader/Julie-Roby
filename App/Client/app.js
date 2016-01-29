angular.module('weddingApp', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
        url: "/home",
        controller: 'MainController',
        templateUrl: './Views/home.html'
    })
    .state('registry',{
        url:"/registry",
        controller:"MainController",
        templateUrl:'./Views/registry.html'
    });

}]);