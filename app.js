
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
      .when('/whatrelationship/', {
        templateUrl: '/takebacklife/whatrelationship/whatrelationship.html',
        controller: 'WhatRelationshipController'
      })
      .when('/whereyou/', {
        templateUrl: '/takebacklife/whereyou/whereyou.html',
        controller: 'WhereYouController'
      })
      .when('/map/', {
        templateUrl: '/takebacklife/map/map.html',
        controller: 'MapController'
      })
      .otherwise({redirectTo: '/'});
  })
  .factory('settings', function() {
    return {
      yearsToLookAt: [1, 5, 10]
    };
  })
  .factory('me', function() {
    var me = {};

    me._people = [{}, {}, {}, {}, {}];
    me._people = [{"name":"Brandon","age":27,"where":["In China, building a business. Raised seed round.","Successfully exited business in China. Living in Montreal.","Married, kids, maybe back in Toronto.","Jetset. Living, doing."],"relationship":[],"$$hashKey":"object:119"},{"name":"Janet","age":25,"where":["In Tianjin, helping her family business.","Married to me, successful in family business","VP at her family business","Entering middle age"],"relationship":["Engaged. Happy.","Married, happy, house","Happily married, kids"],"$$hashKey":"object:120"},{"name":"Nathan","age":27,"where":["Still in Toronto, single","Stable with Jess","Married, kids"],"relationship":["Good","Close, maybe living close to each other","BEST BUDS, kids playing"],"$$hashKey":"object:121"},{"name":"Mom","age":55,"where":["Same old","Retired",null,"OLD"],"relationship":["Good","CLOSE!",null,"GOOD"],"$$hashKey":"object:122"},{"name":"Dad","age":53,"where":[],"relationship":[],"$$hashKey":"object:123"}]
    me.getPeople = function() { return me._people.slice(); };
    me.setPeople = function(people) { me._people = people; };

    return me;
  })
  .controller('AppController', function() {
  })
  .controller('PreludeController', function($scope, $location, me) {
    $scope.next = function() {
      $location.path('/who/');
    };
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
      $location.path('/whatrelationship/');
    };
  })
  .controller('WhatRelationshipController', function($scope, $location, me, settings) {
    $scope.curPeopleIndex = 1; // Start after the person
    $scope.curYearIndex = 0;
    $scope.yearsToLookAt = settings.yearsToLookAt;
    $scope.people = me.getPeople();

    $scope.next = function() {
      if ($scope.curYearIndex < $scope.yearsToLookAt.length - 1) {
        $scope.curYearIndex += 1;
        return;
      }

      $scope.curPeopleIndex += 1;
      $scope.curYearIndex = 0;

      if ($scope.curPeopleIndex >= $scope.people.length) {
        me.setPeople($scope.people);
        $location.path('/whereyou/');
      }
      return;
    };
  })
  .controller('WhereYouController', function($scope, $location, me, settings) {
    $scope.curYearIndex = 0;
    $scope.people = me.getPeople();
    $scope.person = $scope.people[0];
    $scope.years = settings.yearsToLookAt;

    $scope.next = function() {
      if ($scope.curYearIndex < $scope.years.length - 1) {
        $scope.curYearIndex += 1;
        return;
      }

      me.setPeople($scope.people);
      $location.path('/map/');
    };
  })
  .controller('MapController', function($scope, $location, me, settings) {
    $scope.people = me.getPeople();
    $scope.years = settings.yearsToLookAt;
  });