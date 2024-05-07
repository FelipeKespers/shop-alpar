const app = angular.module('App', []);

app.controller('ShopController', function ($scope, $http) {
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";

    $scope.submit = () => {
        $http.post("http://localhost:3000/api/v1/register", {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
        })
            .then((res) => {
                console.log(res.data);
                window.location.href = "/auth/login"
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    };
});