const app = angular.module('imcValue', []);

app.controller('ImcController', function ($scope, $http) {
    $scope.imcName = "";
    $scope.imcHeight = "";
    $scope.imcWeight = "";
    $scope.imc = 0;
    $scope.data = [];

    $scope.calculateIMC = function () {
        if ($scope.imcWeight && $scope.imcHeight) {
            let weight = parseFloat($scope.imcWeight);
            let height = parseFloat($scope.imcHeight);
            let imc = weight / (height * height);
            return imc;
        } else {
            return "";
        }
    };

    $scope.submit = () => {
        let imcResult = $scope.calculateIMC();

        if (imcResult !== "") {
            $http.post("http://localhost:3000/api/imc", {
                name: $scope.imcName,
                result: imcResult
            })
                .then((res) => {
                    console.log(res);
                    $scope.imcName = "";
                    $scope.imcHeight = "";
                    $scope.imcWeight = "";
                    $scope.getAllimcs()
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
        } else {
            alert("Preencha a altura e o peso para calcular o IMC.");
        }
    };
    $scope.getAllimcs = () => {
        $http.get("http://localhost:3000/api/imc", {

        })
            .then((res) => {
                console.log(res)
                $scope.data = res.data
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });

    }

    $scope.deleteImc = (id) => {
        $http.delete(`http://localhost:3000/api/imc/${id}`)
            .then((res) => {
                $scope.getAllimcs();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    }
    $scope.getAllimcs();
});
