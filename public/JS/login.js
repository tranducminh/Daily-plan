document.addEventListener("DOMContentLoaded", function () {
    let login_btn = document.querySelector("#btn-login");
    let login_form = document.querySelector('#loginForm');

    login_btn.onclick = function(){
        login_form.submit();
    }
}, false)