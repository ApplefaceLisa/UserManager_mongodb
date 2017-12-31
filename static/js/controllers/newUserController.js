app.controller("newUserController", ["$scope", "$location", "userMngService", function($scope, $location, userMngService) {
  $scope.user = {
    fName : "",
    lName : "",
    title : "",
    gender : "",
    age : 20
  };
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
  };

  $scope.addUser = function($event, usrObj) {
    $event.preventDefault();
    userMngService.createUser(usrObj)
    .then(function(res) {
      $location.path("/");
    });
  }

  $scope.cancel = function($event) {
    $event.preventDefault();
    $location.path("/");
  }
}]);