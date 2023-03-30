$(document).ready(function () {
    auctionProductDetail();
    chatme();
});
function chatme() {
    if (checkAccessToken()) {
        $.ajax({
            type: 'GET',
            url: '/api/users/getmyinfo',
            data: {},
            success: function (response) {
                const email = response.data.email;
                const temp = `          <div>
      <input id='user_email' value="${email}" style="display:none;" readonly>
      <input id="chat_content" type="text" placeholder="메시지를 적어주세요" onkeyup="if(window.event.keyCode==13){sendmessage()}"/>
      <button onclick="sendmessage()">보내기</button>
    </div>`;
                $('#chatme').append(temp);
            },
            error: function (error) {
                alert(error.message);
            },
        });
    } else {
        alert('채팅은 로그인 후 이용 가능합니다.');
    }
}
auction_product_id = location.pathname.split('/')[2];
let product_update = Number(
    $('#product_update_convert').text().split(' ')[1].split(',')[0] +
        $('#product_update_convert').text().split(' ')[1].split(',')[1]
);
let product_start;
let en_date;

/* 경매상품 상세 조회 */
function auctionProductDetail() {
    $.ajax({
        type: 'GET',
        url: `/api/products/auction/${auction_product_id}`,
        data: {},
        success: function (response) {
            const rows = response['data'];

            if (rows === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }
            $('#seller').text('판매자│ ' + rows.User.email);
            $('#rating').text('별점│ ' + rows.User.rating);
            for (let i = 0; i < rows.Images.length; i++) {
                if ((i = 0 && rows.Images.length > 1)) {
                    $('#img_container')
                        .append(`<div class="carousel-item active">
                    <img src="${rows.Images[i].image_url}" width="300" hieght="300" class="d-block w-100">
                  </div>`);
                } else if (rows.Images.length === 1) {
                    $('#img_container')
                        .append(`<div class="carousel-item active">
                    <img src="${rows.Images[i].image_url}" width="300" hieght="300" class="d-block w-100">
                  </div>`);
                } else {
                    $('#img_container')
                        .append(`            <div class="carousel-item">
                    <img class="d-block w-100" src="${rows.Images[i].image_url}" width="300" hieght="300">
                  </div>`);
                }
            }
            $('#product_name').text(rows.product_name);
            $('#product_content').text(rows.product_content);
            $('#category').text('카테고리: ' + rows.category);
            product_start = rows.product_start_price;
            $('#product_start_convert').text(
                '시작 가격 ' + rows.product_start_price.toLocaleString() + '원'
            );
            const product_end = new Date(rows.product_end).toLocaleString('en');
            $('#product_end').text(product_end);

            const product_buy_now_price = rows.product_buy_now_price;
            $('#product_buy_now_price').text(
                '즉시구매 가격 ' + rows.product_buy_now_price.toLocaleString()
            );
            const date = new Date(product_end);
            en_date = date.toLocaleString('en');

            if (product_buy_now_price === rows.product_update_price) {
                en_date = 0;
                $('#purchase_btn').hide();
                $('#qwe').hide();
                nowPurchaseEnd(en_date, 'countdown');
            } else {
                CountDownTimer(en_date, 'countdown');
            }
            if (product_buy_now_price !== null) {
                $('#purchase_btn').show();
                $('#product_buy_now_price').show();
                if (product_buy_now_price === rows.product_update_price) {
                    $('#purchase_btn').hide();
                    $('#qwe').hide();
                }
            }
        },
        error: function (error) {
            alert(error.responseJSON.message);
        },
    });
}

/* 경매상품 입찰 */
function bidBtn() {
    time_out = new Date(en_date) - new Date();
    const bid_price = $('#bid_price').val().split(',').join('');
    const compare_price = Number(bid_price);
    en_date;
    Remaining_time = Math.floor(time_out / 1000 / 60);
    let add_time = '';

    if (Remaining_time < 1) {
        const end_time = new Date(product_end_format);
        const add_minutes = end_time.setMinutes(end_time.getMinutes() + 1);
        add_time = new Date(add_minutes).toISOString();
    }

    if (time_out < 0) {
        alert('경매가 마감되었습니다.');
        return window.location.reload();
    } else {
        if (product_update < 100000) {
            if (compare_price % 5000 !== 0) {
                alert('금액 단위는 5,000원 입니다.');
                return;
            }
        }

        if (100000 <= product_update && product_update < 500000) {
            if (compare_price % 10000 !== 0) {
                alert('금액 단위는 10,000원 입니다.');
                return;
            }
        }

        if (500000 <= product_update && product_update < 1000000) {
            if (compare_price % 50000 !== 0) {
                alert('금액 단위는 50,000원 입니다.');
                return;
            }
        }

        if (1000000 <= product_update) {
            if (compare_price % 100000 !== 0) {
                alert('금액 단위는 100,000원 입니다.');
                return;
            }
        }

        if (compare_price === 0) {
            alert('가격을 입력해주세요.');
            return;
        }

        if (compare_price < product_start) {
            alert('시작 가격보다 낮습니다.');
            return;
        }

        if (compare_price < product_update) {
            alert('입찰가보다 낮습니다.');
            return;
        }

        if (compare_price === product_update) {
            alert('입찰가와 동일합니다.');
            return;
        }

        if (compare_price === product_buy_now_price) {
            if (
                !confirm(
                    '즉시 구매가와 가격이 같습니다. 즉시 구매 하시겠습니까?'
                )
            ) {
                return;
            } else {
                location.href = `/purchase/${auction_product_id}`;
                compare_price = 'null';
            }
        }

        if (product_buy_now_price === null) {
            if (compare_price > product_buy_now_price) {
            }
        } else {
            if (compare_price > product_buy_now_price) {
                if (
                    !confirm(
                        '즉시 구매가보다 높은 가격에 구매할 수 없습니다. 즉시 구매 하시겠습니까?'
                    )
                ) {
                    return;
                } else {
                    location.href = `/purchase/${auction_product_id}`;
                    compare_price = 'null';
                }
            }
        }

        $.ajax({
            type: 'PATCH',
            url: `/api/products/bid_price/${auction_product_id}`,
            data: { product_end: add_time },
            success: function (response) {
                socket.emit('bid', { auction_product_id, bid_price });
                alert(response['message']);
                window.location.reload();
            },
            error: function (error) {
                alert(error.responseJSON.message);
            },
        });
    }
}

/* 경매상품 신고 */
function reportBtn() {
    const title = $('#report_title').val();
    const content = $('#report_content').val();

    if (content === '') {
        alert('내용을 입력해주세요.');
        return;
    }

    $.ajax({
        type: 'POST',
        url: `/api/products/auction/report/${auction_product_id}`,
        data: { title: title, content: content },
        success: function (response) {
            alert(response['message']);
            window.location.reload();
        },
        error: function (error) {
            alert(error.responseJSON.message);
        },
    });
}

/* 상품신고 모달창 */
const open = () => {
    document.querySelector('.modal').classList.remove('hidden');
};

const close = () => {
    document.querySelector('.modal').classList.add('hidden');
};

document.querySelector('.openBtn').addEventListener('click', open);
document.querySelector('.closeBtn').addEventListener('click', close);
document.querySelector('.bg').addEventListener('click', close);

/* 입찰가격 모달창 */
const open_bid = () => {
    document.querySelector('.modalBid').classList.remove('hiddenBid');
};

const close_bid = () => {
    document.querySelector('.modalBid').classList.add('hiddenBid');
};

document.querySelector('.openBtnBid').addEventListener('click', open_bid);
document.querySelector('.closeBtnBid').addEventListener('click', close_bid);
document.querySelector('.bgBid').addEventListener('click', close_bid);

/* 경매 마감 타이머 */
function CountDownTimer(dt, id) {
    let end = new Date(dt);

    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let timer;

    function showRemaining() {
        const now = new Date();
        const distance = end - now;

        if (distance < 0) {
            $('#purchase_btn').hide();
            $('#qwe').hide();
            clearInterval(timer);
            document.getElementById(id).innerHTML = '경매가 종료된 상품입니다.';
            return;
        }

        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = '경매 마감까지 ';
        document.getElementById(id).innerHTML += days + '일 ';
        document.getElementById(id).innerHTML += hours + '시간 ';
        document.getElementById(id).innerHTML += minutes + '분 ';
        document.getElementById(id).innerHTML += seconds + '초 남았습니다.';
    }

    timer = setInterval(showRemaining, 1000);
}

function nowPurchaseEnd(dt, id) {
    let end = new Date(dt);

    function showRemaining() {
        const now = new Date();
        const distance = end - now;

        if (distance < 0) {
            $('#purchase_btn').hide();
            $('#qwe').hide();
            clearInterval(timer);
            document.getElementById(id).innerHTML =
                '즉시 구매로 경매가 종료된 상품입니다.';
            return;
        }
    }
    timer = setInterval(showRemaining, 1000);
}

function purchaseNow() {
    time_out = new Date(en_date) - new Date();

    if (time_out < 0) {
        alert('경매가 마감되었습니다.');
        return;
    }

    location.href = `/purchase/${auction_product_id}`;
}

/* 입찰 가격란에 최소 입찰 가격 생성 */
function openBtnBid() {
    let price;

    if (product_update < 100000) {
        price = product_update + 5000;
    }

    if (100000 <= product_update && product_update < 500000) {
        price = product_update + 10000;
    }

    if (500000 <= product_update && product_update < 1000000) {
        price = product_update + 50000;
    }

    if (1000000 <= product_update) {
        price = product_update + 100000;
    }

    const price_convert = price.toLocaleString();

    $('#bid_price').val(price_convert);
}

const input = document.querySelector('#bid_price');

/* 입찰 가격란에 ',' 생성 */
input.addEventListener('keyup', function (e) {
    let value = e.target.value;
    value = Number(value.replaceAll(',', ''));
    if (isNaN(value)) {
        input.value = 0;
    } else {
        const formatValue = value.toLocaleString();
        input.value = formatValue;
    }
});
