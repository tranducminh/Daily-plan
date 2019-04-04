document.addEventListener("DOMContentLoaded", function () {
    let signup_btn = document.querySelector("#btn-signup");
    let signup_form = document.querySelector('#signupForm');

    signup_btn.onclick = function(){
        signup_form.submit();
    }
}, false)