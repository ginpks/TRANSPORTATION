const createAccountButton = document.getElementById('createAccbutt');
const invalidUser = /[^ \w@.]/;

createAccountButton.addEventListener('click', function () {
    const username = document.getElementById('cusr').value.trim();
    const password = document.getElementById('psw').value.trim();
    
    if(username.includes(invalidUser)||username.length === 0|| password.length === 0){
        //do something
        return;
    }
    window.location.href = 'user-profile-page/index.html'
    // look up username in database then email confirmation code


    const accountData = {
        username: username,
        email: email,
        password, password
    };
    //need to implenet backend to do more
    //needs to add email verification code function
})
    

