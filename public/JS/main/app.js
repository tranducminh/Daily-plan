let app = angular.module("app.todos", []);

app.controller("todoController", ['$scope', function ($scope) {
    $scope.appName = "blabla";
    $scope.todos = [
        {
            text: "Hoàn thành add",
            isDone: true
        },
        {
            text: "Hoàn thành delete",
            isDone: false
        }

    ]
}]);