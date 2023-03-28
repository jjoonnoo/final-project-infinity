const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// form and Ajax

function login() {
    let user_email = $('#login_email').val();
    let user_password = $('#login_password').val();

    // if (!email || !password) {
    //   return alert('이메일, 패스워드 모두 채워주세요 ')
    // }

    $.ajax({
        type: 'POST',
        url: '/api/auth/signin',
        headers: { 'x-user-agent': navigator.userAgent },
        data: {
            email: user_email,
            password: user_password,
        },
        success: function (response) {
            alert(response.msg);
            // localStorage.setItem('access_token', response.access_token);
            window.location.href = '/'; // 메인페이지
        },
        error: function (request, status, error) {
            var msg = request.responseText;
            alert(msg);
        },
        // error: function (error) {
        //     console.log(error.responseJSON.msg);
        //     alert(error.responseJSON.msg);
        // },
    });
}

function register() {
    let user_name = $('#name').val();
    let user_email = $('#email').val();
    let user_password = $('#password').val();
    let user_repassword = $('#repassword').val();
    let api_address = $('#address').val();
    let detail_address = $('#detail_address').val();
    let user_address = api_address + ' ' + detail_address;
    let user_phone = $('#phone').val();

    // console.log(user_password, user_repassword);

    if (user_password !== user_repassword) {
        return alert('동일한 패스워드를 입력하세요');
    }

    $.ajax({
        type: 'POST',
        url: '/api/auth/signup',
        data: {
            name: user_name,
            password: user_password,
            email: user_email,
            address: user_address,
            phone: user_phone,
        },
        success: function (response) {
            alert('회원가입에 성공했습니다.');
            window.location.reload(true);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        },
    });
}
