let app = angular.module("app.todos", []);

app.controller("todoController", ['$scope', 'svTodos', '$http', function ($scope, svTodos, $http) {
    let date = new Date();
    $scope.appName = "blabla";
    $scope.newTodo = {};
    $scope.date = {
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
    }
    $scope.timeChoice = {
        option: "tomorrow"
    }
    $scope.timeOption = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate()
    }
    $scope.todos = [];
    svTodos.get().then(function (data) {
        // console.log(data);
        $scope.todos = data.data;
    });
    // $scope.todos = [
    //     {
    //         text: "Hoàn thành add blblblbllblbblablalablablab ",
    //         isDone: true
    //     },
    //     {
    //         text: "Hoàn thành delete",
    //         isDone: false
    //     }

    // ]

    $scope.createNew = function(newTodoSchema){
        $http({
            method: 'POST',
            url: '/todo',
            data: newTodoSchema
            }).then(function (response) {
                alert("success");

             }, function (response) {

             });
    }

    $scope.addNewTodo = function () {

        var newTodoSchema = {

        };
        var userID = document.querySelector('#profile').getAttribute('userID');
        // var timeChoice = document.getElementsByName("time-choice");
        var time = $scope.timeChoice.option;
        // for (let i = 0; i < timeChoice.length; i++) {
        //     if (timeChoice[i].checked === true) {
        //         var time = timeChoice[i].nodeValue;
        //     }
        // }

        if (time == "today") {
            newTodoSchema = {
                userID: userID,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
                text: $scope.newTodo.text,
                isDone: false
            }
            // console.log(newTodoSchema);
        }
        else if (time == "tomorrow") {
            newTodoSchema = {
                userID: userID,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate() + 1,
                text: $scope.newTodo.text,
                isDone: false
            }
            // console.log(newTodoSchema);

        }
        else if (time == "daily") {
            newTodoSchema = {
                userID: userID,
                text: $scope.newTodo.text,
                isDone: false
            }
            // console.log(newTodoSchema);
        }
        else if (time == "option") {
            newTodoSchema = {
                userID: userID,
                year: $scope.timeOption.year,
                month: $scope.timeOption.month,
                date: $scope.timeOption.date,
                text: $scope.newTodo.text,
                isDone: false
            }
            // console.log(newTodoSchema);
        }
        // console.log(time);

        // svTodos.create(newTodoSchema)
        //     .then(function (response) {
        //         console.log("blabla")
        //         $scope.todos = response.data;
        //     },
        //         function (response) {

        //         });

        $scope.createNew(newTodoSchema);



    }
}]);