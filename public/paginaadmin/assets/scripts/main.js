const app = angular.module('Shoes', []);

app.controller('shoesController', function ($http, $scope) {
    $scope.modal = false;
    $scope.products = [];
    $scope.modalDelete = false;
    $scope.productIdUpdate;
    $scope.modalEdit = false;
    $scope.name = "";
    $scope.description = "";
    $scope.price = "";
    $scope.imageUrl = "";

    $scope.openModal = () => {
        $scope.modal = true;
    }
    $scope.closeModal = () => {
        $scope.modal = false;
    }
    $scope.openModalDelete = (id) => {
        $scope.productIdUpdate = id;
        $scope.modalDelete = true;
    }
    $scope.closeModalDelete = () => {
        $scope.modalDelete = false;
    }
    $scope.openModalEdit = (id) => {
        $scope.productIdUpdate = id;
        $scope.getProduct(id)
        $scope.modalEdit = true;
    }
    $scope.closeModalEdit = () => {
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
        $scope.imageUrl = "";
        $scope.modalEdit = false;
    }
    $scope.getAllProducts = () => {
        $http.get("http://localhost:3000/api/v1/product", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            $scope.products = response.data;
        }).catch((error) => {
            console.log(error);
        });
    }
    $scope.submit = (name, description, price, imgUrl) => {
        $http.post("http://localhost:3000/api/v1/product", {
            name,
            description,
            price,
            imageUrl: imgUrl,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    };
    $scope.getAllProducts();

    $scope.removeProduct = () => {
        $http.delete(`http://localhost:3000/api/v1/product/${$scope.productIdUpdate}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    }
    $scope.getProduct = (id) => {
        $http.get(`http://localhost:3000/api/v1/product/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response);
                $scope.name = response.data.name;
                $scope.description = response.data.description;
                $scope.price = response.data.price;
                $scope.imageUrl = response.data.imageUrl;
            })
            .catch((error) => {
                console.log(error);
            })
    }
    $scope.submitEditProduct = (name, description, price, imageUrl) => {
        $http.put(`http://localhost:3000/api/v1/product/${$scope.productIdUpdate}`, {
            name,
            description,
            price,
            imageUrl,
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalEdit();
        }).catch((error) => {
            console.log(error);
        });
    }
});