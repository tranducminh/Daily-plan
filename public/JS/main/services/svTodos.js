

angular.module("app.todos")
    .factory("svTodos", ["$http", function ($http) {
        return {
            get: function () {
                return $http.get("/todos");  
            },
            getTodosEdit: function(){
                return $http.get("/todos/notDone");
            },
            getTodosDelete: function(){
                return $http.get("/todos/notDone");
            },
            create: function (newTodoSchema) {
                // alert("successCreate");
                return $http.post("/todo", newTodoSchema);
            },
            update: function (updateTodo) {
                return $http.put("/todo", updateTodo);
            },
            updateManyTodos: function(todos) {
                return $http.put("/todos", todos)
            },
            deleteManyTodos: function(todos) {
                return $http.delete("/todos", {todos: todos})
            },
            deleteTodo: function(id) {
                return $http.delete("/todo/" + id);
            },
            logout: function () {
                return $http.get("/logout");
            }
        }
    }])