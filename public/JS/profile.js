document.addEventListener("DOMContentLoaded", function () {
    let menu_icon = document.querySelector("#menu-icon");
    let menu = document.querySelector('#menu');
    let exit_icon = document.querySelector('#exit-icon');

    menu_icon.onclick = function () {
        menu.classList.add('appear');
    },
    exit_icon.onclick = function () {
        menu.classList.remove('appear');
    }


    let action_container = document.querySelector('#action-container');
        let add_todo = document.querySelector('#add_todo');
        let close_add_todo = document.querySelector('#close-add-form');
        let open_add_todo = document.querySelector('#add_option');

        let delete_todo = document.querySelector('#delete_todo');
        let close_delete_todo = document.querySelector('#close-delete-form');
        let open_delete_todo = document.querySelector('#delete_option');

        let edit_todo = document.querySelector('#edit_todo');
        let close_edit_todo = document.querySelector('#close-edit-form');
        let open_edit_todo = document.querySelector('#edit_option');
    let todo_container = document.querySelector('#todo-container');
    //add-todo
    open_add_todo.onclick = function(){
        action_container.classList.add("appear");
        todo_container.classList.add("disappear");
        add_todo.classList.add("appear");
        edit_todo.classList.remove("appear");
        delete_todo.classList.remove("appear");
    },
    close_add_todo.onclick = function(){
        action_container.classList.remove("appear");
        todo_container.classList.remove("disappear");
        add_todo.classList.remove("appear");
    }

    //edit-todo
    open_edit_todo.onclick = function(){
        action_container.classList.add("appear");
        todo_container.classList.add("disappear");
        edit_todo.classList.add("appear");
        add_todo.classList.remove("appear");
        delete_todo.classList.remove("appear");
    },
    close_edit_todo.onclick = function(){
        action_container.classList.remove("appear");
        todo_container.classList.remove("disappear");
        edit_todo.classList.remove("appear");
    }

    //delete-todo
    open_delete_todo.onclick = function(){
        action_container.classList.add("appear");
        todo_container.classList.add("disappear");
        delete_todo.classList.add("appear");
        add_todo.classList.remove("appear");
        edit_todo.classList.remove("appear");
    },
    close_delete_todo.onclick = function(){
        action_container.classList.remove("appear");
        todo_container.classList.remove("disappear");
        delete_todo.classList.remove("appear");
    }

    
    
}, false)