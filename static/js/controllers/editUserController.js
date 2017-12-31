app.controller("editUserController", ["$scope", "$routeParams", "$location", "$window", "userMngService", function($scope, $routeParams, $location, $window, userMngService) {
  var userId = $routeParams.id;
  $scope.id = userId;
  $scope.dataReady = false;

  userMngService.getUserById(userId)
  .then(function(res) {
      $scope.user = res.data;
      $scope.dataReady = true;
  }, function(res) {
    $window.alert("User Not Found");
    $location.path("/");
  });

  $scope.passw1 = "";
  $scope.passw2 = "";
  $scope.error = false;
  $scope.incomplete = true;

  $scope.$watch('passw1',function() {$scope.test();});
  $scope.$watch('passw2',function() {$scope.test();});
  $scope.$watch('user.fName', function() {$scope.test();});
  $scope.$watch('user.lName', function() {$scope.test();});
  $scope.$watch('user.age', function() {$scope.test();});

  $scope.test = function() {
    if ($scope.dataReady) {
      if ($scope.passw1 && $scope.passw2 && $scope.passw1 !== $scope.passw2) {
        $scope.error = true;
      } else {
        $scope.error = false;
      }
      $scope.incomplete = true;
      if ($scope.user.fName && $scope.user.lName && $scope.user.age &&
          $scope.passw1 && $scope.passw2) {
          $scope.incomplete = false;
      }
    }
  };

  $scope.editUser = function($event) {
    $event.preventDefault();
    userMngService.updateUser(userId, $scope.user)
    .then(function(res) {
      $location.path("/");
    }, function(res) {
      $window.alert("User Not Found");
      $location.path("/");
    });
  }

  $scope.cancel = function($event) {
    $event.preventDefault();
    $location.path("/");
  }
}]);