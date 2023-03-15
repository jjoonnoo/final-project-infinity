// form and Ajax

function login() {
    let user_email = $('#email2').val();
    let user_password = $('#password2').val();
    const user_agent = navigator.userAgent;
    if (!user_email || !user_password) {
        // return customAlert("이메일과 패스워드를 넣어주세요");
        alert('이메일, 패스워드 모두 채워주세요 ');
    } else {
        $.ajax({
            type: 'POST',
            url: '/api/auth/signin',
            headers: {
                'x-user-agent': user_agent, // User-Agent 헤더에 userAgent 정보를 담아서 보냅니다.
            },
            data: {
                email: user_email,
                password: user_password,
            },
            success: function (response) {
                localStorage.setItem(response.access_token, 'access_token');
                localStorage.setItem(response.refresh_token, 'refresh_token');
                // alert(response.msg);
                // window.location.href = '/'; // 메인페이지
                alert(response.msg);
            },
            error: function (error) {
                alert(error.responseJSON.msg);
            },
        });
    }
}

function register() {
    let user_name = $('#name').val();
    let user_email = $('#email1').val();
    let user_password = $('#password1').val();
    let user_repassword = $('#repassword').val();
    let user_address = $('address').val();
    let user_phone = $('#phone').val();

    console.log(user_password, user_repassword);

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
