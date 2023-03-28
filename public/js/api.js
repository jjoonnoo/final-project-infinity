//헤더에 있는 버튼을 관리하는 것도 넣어줘야한다.
//예를 들면 login을 했는데 회원가입이나 로그인 버튼이 나오는것은 굉장히 별로인것같음.
//cart에 어느정도 담겨있는지 표시할 수 있게 해놨는데 거기에 get으로 가져오는것도 필요해 보임.
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
    const cookieObj = {};
    cookies.forEach((cookie) => {
        const [key, value] = cookie.split('=');
        cookieObj[key.trim()] = value;
    });
    return Boolean(cookieObj['access_token']);
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
