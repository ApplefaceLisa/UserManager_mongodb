angular.module("customServices", [])
.factory("pagerService", function() {
    // service definition
    var service = {};
    service.getPager = getPager;
    return service;

    // service implementation
    /* generate array of number from start(inclusive) to end(inclusive) */
    function range(start, end) {
        return Array.from(Array(end-start+1), (_, i) => start + i);
    }

    /* @totalItems : total number
     * @currentPage
     * @pageSize
    */
    function getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        /* for delete users
        if (currentPage > totalPages) {
            currentPage = currentPage > 1 ? currentPage - 1 : 1;
        }
        */

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
})
.factory("userMngService", ["$http", function($http) {
    var service = {};
    var users_url = "/users";

    /************************************************/
    /* RESTful API */
    service.getUsers = function() {
        return $http({
            method : "GET",
            url : users_url
        });
    };

    service.getUserById = function(id) {
        let url = users_url + "/" + id;
        return $http({
            method : "GET",
            url : url
        });
    };

    service.updateUser = function(id, user) {
        let url = users_url + "/" + id;
        return $http({
            method : "PUT",
            url : url,
            data : user
        });
    };

    service.createUser = function(user) {
        return $http({
            method : "POST",
            url : users_url,
            data : user
        });
    };

    service.deleteUser = function(id) {
        let url = users_url + "/" + id;
        return $http({
            method : "DELETE",
            url : url
        });
    };
    /************************************************/
    service.orderBy = function(name, order) {
        let url = users_url + "/sort";
        return $http({
            method : "GET",
            url : url,
            params : {orderBy: name, order: order}
        });
    }

    service.search = function(searchby, key) {
        let url = users_url + "/search";
        return $http({
            method : "GET",
            url : url,
            params : {searchby : searchby, key : key}
        });
    }

    return service;
}]);