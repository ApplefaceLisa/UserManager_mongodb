app.controller("listUserController", ["$scope", "$location", "$window", "userMngService", "pagerService", function($scope, $location, $window, userMngService, pagerService) {
    //$scope.users = userMngService.userlist;

    $scope.showInfo = false;
    $scope.users = [];
    $scope.pageSize = 10;

    getUsers();

    function getUsers() {
        userMngService.getUsers("/users")
        .then(function(response) {
            $scope.users = response.data;
            $scope.showInfo = true;
        });
    }

    $scope.searchKey = "";
    $scope.propertyName = "";
    $scope.reverse = false;
    $scope.sortBy = function(name) {
        // reverse : true - decrease order, false - increase order
        $scope.reverse = ($scope.propertyName === name) ? !$scope.reverse : false;
        $scope.propertyName = name;
    }

    $scope.createUser = function($event) {
        $event.preventDefault();
        $location.path("/new");
    }

    $scope.editUser = function($event, userId) {
        $event.preventDefault();
        var url = "/edit/" + userId;
        $location.path(url);
    }

    $scope.deleteUser = function($event, userId) {
        $event.preventDefault();
        userMngService.deleteUser(userId)
        .then(function(res) {
            getUsers();
            $location.path("/");
        }, function(res) {
            $window.alert("User Not Found");
            getUsers();
            $location.path("/");
        });
    }
}]);