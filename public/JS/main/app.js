let app = angular.module("app.todos", []);

app.controller("todoController", ['$scope', function ($scope) {
    $scope.appName = "blabla";
    $scope.todos = [
        {
            text: "Hoàn thành add blblblbllblbblablalablablab ",
            isDone: true
        },
        {
            text: "Hoàn thành delete",
            isDone: false
        }

    ]
}]);