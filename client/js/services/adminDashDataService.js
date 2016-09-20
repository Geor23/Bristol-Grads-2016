(function() {
    angular
        .module("TwitterWallAdminApp")
        .factory("adminDashDataService", adminDashDataService);

    adminDashDataService.$inject = ["$http"];

    function adminDashDataService($http) {
        return {
            authenticate: authenticate,
            getAuthUri: getAuthUri,
            setMotd: setMotd,
        };

        function authenticate() {
            return $http.get("/admin");
        }

        function getAuthUri() {
            return $http.get("/api/oauth/uri").then(function(result) {
                return result.data.uri;
            });
        }

        function setMotd(message) {
            return $http.post("/admin/motd", {
                motd: message,
            }, {
                headers: {"Content-type": "application/json"}
            });
        }
    }

})();
