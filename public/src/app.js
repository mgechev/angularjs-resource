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
        //Returns promise in $promise
        return User.get({ userid: $route.current.params.userid }).$promise;
      }
    }
  })
});

resourceDemo.factory('User', function ($cacheFactory, $resource) {
  var cache = $cacheFactory('user-cache'),
      User = $resource('/users/:userid', { userid: '@userid' }, {
         'query':  { method: 'get', isArray: true, cache: true },
         'get'  :  { method: 'get', cache  : cache },
         'save' :  { method: 'post', cache : cache, interceptor: {
            response: function () {
              console.log(arguments);
            }
         }}
      });
  User.cache = cache;
  return User;
})

resourceDemo.controller('MainCtrl', function ($scope, User) {
  //Populates the array
  $scope.users = User.query();
});

resourceDemo.controller('UserCtrl', function ($scope, user, User, $location) {
  $scope.user = user;
  $scope.remove = function () {
    //Returns promise in $promise
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
    user.$save(function () {
      console.log(user);
    });
    $location.path('/');
  };
});