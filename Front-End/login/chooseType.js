document.getElementById('skip').addEventListener('click', function () {
    window.location.href = 'user-profile-page/index.html'
});

document.getElementById('rider').addEventListener('click', function () {

    const type = rider;
});


document.getElementById('driver').addEventListener('click', function () {

    const type = driver;
});

localStorage.setItem('stateStore',JSON.stringify(type));//mainpost page can use 