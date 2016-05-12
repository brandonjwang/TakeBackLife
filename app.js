
var TblApp = angular.module('TblApp',['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/takebacklife/prelude/prelude.html',
        controller: 'PreludeController'
      })
      .when('/who/', {
        templateUrl: '/takebacklife/who/who.html',
        controller: 'WhoController'
      })
      .when('/howold/', {
        templateUrl: '/takebacklife/howold/howold.html',
        controller: 'HowOldController'
      })
      .otherwise({redirectTo: '/'});
  })
  .factory('me', function() {
    var me = {};

    me._people = [{}, {}, {}, {}, {}];
    me.getPeople = function() {
      return me._people.slice();
    };
    me.setPeople = function(people) {
      me._people = people;
    };

    return me;
  })
  .controller('AppController', function() {
  })
  .controller('PreludeController', function() {
  })
  .controller('WhoController', function($scope, $location, me) {
    $scope.people = me.getPeople();

    $scope.next = function() {
      me.setPeople($scope.people);
      $location.path('/howold/');
    };
  })
  .controller('HowOldController', function($scope, $location, me) {
    $scope.people = me.getPeople();

    $scope.next = function() {
      me.setPeople($scope.people);
      $location.path('/howold/');
    };
  });