var app = angular.module("to_do_demo", []);

app.controller("first_controller", function ($scope, $http) {
  $http({
    method: "GET",
    url: "http://localhost:8082/get_data",
  }).then(
    function mySuccess(response) {
      $scope.my_res = response.data;
    },
    function myError(response) {
      $scope.my_err = response;
    }
  );

  $scope.my_post = function (the_name, the_description, the_status) {
    $scope.dummy_data = {
      to_do_name: the_name,
      to_do_description: the_description,
      to_do_status: the_status,
    };
    $http({
      method: "POST",
      url: "http://localhost:8082/save_data",
      data: $scope.dummy_data,
    }).then(
      function mySuccess(response) {
        $scope.my_res_post = response.data;
        $scope.my_res_post_config = response.config;
        $scope.my_res_post_headers = response.headers;
        $scope.my_res_post_status = response.status;
        $scope.my_res_post_statusText = response.statusText;
      },
      function myError(response) {
        $scope.my_err_post = response;
      }
    );
  };

  $scope.update_status = function (the_name, the_description, the_status) {
    $scope.updated_data = {
      to_do_name: the_name,
      to_do_description: the_description,
      to_do_status: the_status,
    };
    $http({
      method: "POST",
      url: "http://localhost:8082/update_to_do_status",
      data: $scope.updated_data,
    }).then(
      function mySuccess(response) {
        $scope.my_res_post = response.data;
        $scope.my_res_post_config = response.config;
        $scope.my_res_post_headers = response.headers;
        $scope.my_res_post_status = response.status;
        $scope.my_res_post_statusText = response.statusText;
      },
      function myError(response) {
        $scope.my_err_post = response;
      }
    );
  };
});
