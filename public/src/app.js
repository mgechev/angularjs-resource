var resourceDemo = angular.module('resourceDemo', ['ngResource', 'ngRoute']);

resourceDemo.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/index.html',
    controller: 'MainCtrl'
  })
  .when('/users/add', {
    templateUrl: 'partials/add-user.html',
    controller: 'AddUserCtrl'
  })
  .when('/users/:userid', {
    templateUrl: 'partials/user.html',
    controller: 'UserCtrl',
    resolve: {
      user: function ($route, User) {
        return User.get({ userid: $route.current.params.userid }).$promise;
      }
    }
  })
});

resourceDemo.factory('User', function ($cacheFactory, $resource) {
  var User = $resource('/users/:userid');
  return User;
})

resourceDemo.controller('MainCtrl', function ($scope, User) {
  $scope.users = User.query();
});

resourceDemo.controller('UserCtrl', function ($scope, user, User, $location) {
  $scope.user = user;
  $scope.remove = function () {
    User.remove({ userid: user.id });
    $location.path('/');
  };
});

resourceDemo.controller('AddUserCtrl', function ($scope, User, $location) {
  $scope.save = function () {
    var user = new User({
      name: $scope.name,
      job: $scope.job
    })
    user.$save();
    $location.path('/');
  };
});