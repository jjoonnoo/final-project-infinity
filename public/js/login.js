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
        data: {
            email: user_email,
            password: user_password,
        },

        success: function (response) {
            alert('로그인 완료!');
            window.location.href = '/'; // 메인페이지
        },
        error: function (response) {
            alert('메일 혹은 아이디가 다릅니다');
        },
    });
}

function register() {
    let user_name = $('#name').val();
    let user_email = $('#email').val();
    let user_password = $('#password').val();
    let user_repassword = $('#repassword').val();
    let user_address = $('#address').val();
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
            signInButton.addEventListener('click', () => {
                container.classList.remove('right-panel-active');
            });
        },
        error: function (response) {
            alert('에러가 났습니다');
        },
    });
}
function logout() {
    window.localStorage.clear();
    window.location.href = '/';
}
