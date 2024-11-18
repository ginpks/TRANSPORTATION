loginpg.addEventListener('click', function () {
    const username = document.getElementById('usr').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('inipsw').value.trim();
    const confirmPassword = document.getElementById('confpsw').value.trim();
    
    if(username.includes(invalidUser)||username.length === 0|| password.length === 0||confirmPassword.length === 0 || confirmPassword !==password){
        //do something
        return;
    }
    window.location.href = 'user-profile-page/index.html'


    const accountData = {
        username: username,
        email: email,
        password, password
    };
    //need to implenet backend to do more
    //needs to add email verification code function
})