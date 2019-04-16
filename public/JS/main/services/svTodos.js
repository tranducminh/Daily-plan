

angular.module("app.todos")
    .factory("svTodos", ["$http", function ($http) {
        return {
            get: function () {
                return $http.get("/api/todos");  
            },
            create: function (newTodoSchema) {
                alert("success");
                return $http.post("/todo", newTodoSchema);
            }
        }
    }])