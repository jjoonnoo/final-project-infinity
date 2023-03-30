function headerButtonHandler() {
    if (checkAccessToken()) {
        $('#navbarDropdown').show();
        $('#cartbutton').show();
        $('#loginandsignup').hide();
        $('#logout').show();
    } else {
        $('#navbarDropdown').hide();
        $('#cartbutton').hide();
        $('#loginandsignup').show();
        $('#logout').hide();
    }
}
function checkAccessToken() {
    const cookies = document.cookie.split(';');
    const cookie_obj = {};
    cookies.forEach((cookie) => {
        const [key, value] = cookie.split('=');
        cookieObj[key.trim()] = value;
    });
    return Boolean(cookie_obj['access_token']);
}

function logout() {
    $.ajax({
        type: 'POST',
        url: '/api/auth/signout',
        success: function (response) {
            alert(response.msg);
            window.location.href = '/';
        },
        error: function (error) {
            alert('로그아웃 실패');
        },
    });
}
