let app = angular.module("app.todos", []);

app.controller("todoController", ['$scope', 'svTodos', '$http', function ($scope, svTodos, $http) {
    //time now
    let date = new Date();
    
    //add-option
    $scope.date = {
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
    }
    $scope.timeChoice = {
        option: "tomorrow"
    }
    $scope.timeOption = {
    }
    $scope.newTodo = {};

    //load todos from db
    $scope.todos = [];
    svTodos.get().then(function (data) {
        $scope.todos = data.data;
    });

    //load todos from db to edit-option
    $scope.todosEdit = [];
    svTodos.getTodosEdit().then(function (data) {
        $scope.todosEdit = data.data;
        // for(i = 0; i < $scope.todosEdit.length; i++){
        //     $scope.todosEdit[i].isDone = true;
        // }
    })

    //load todos from db to delete-option
    $scope.todosDelete = [];
    svTodos.getTodosDelete().then(function (data) {
        $scope.todosDelete = data.data;
    })
    
    $scope.refresh = function(){
        svTodos.get().then(function (data) {
            $scope.todos = data.data;
            console.log($scope.todos);
        });
        svTodos.getTodosEdit().then(function (data) {
            $scope.todosEdit = data.data;
            // for(i = 0; i < $scope.todosEdit.length; i++){
            //     $scope.todosEdit[i].isDone = true;
            // }
            console.log($scope.todosEdit);
            $scope.todos = $scope.todosEdit;
        })
        svTodos.getTodosDelete().then(function (data) {
            $scope.todosDelete = data.data;
             
        })
        console.log("blabla")
    }
    //add new todo
    $scope.addNewTodo = function () {
        var newTodoSchema = {

        };
        var userID = document.querySelector('#profile').getAttribute('userID');

        var time = $scope.timeChoice.option;
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

        svTodos.create(newTodoSchema)
            .then(function (response) {
                $scope.newTodo.text = ""
            },
            function (response) {
                $scope.newTodo.text = ""
            }
        );

    }

    //update 1 todo
    $scope.updateTodo = function (todo) {
        svTodos.update(todo).then(function(response){
            
        }, function(response){

        })
    }

    //update many todos
    let editTodos = $scope.todosEdit;
    
    $scope.updateManyTodos = function () {
        //console.log(editTodos);
        svTodos.updateManyTodos($scope.todosEdit).then(function(response){
            
        }, function(response){

        })
        $scope.refresh();
    }
    //delete many todos
    $scope.deleteManyTodos = function () {
        for(let i = 0; i < $scope.todosDelete.length; i++){
            if($scope.todosDelete[i].isDone == true){
                svTodos.deleteTodo($scope.todosDelete[i]._id).then(function(response){
            
                }, function(response){
        
                })
            }
        }
        
    }
    $scope.logout = function(){
        svTodos.logout().then(function(response){
            
        }, function(response){

        })
    }
}]);