console.log('연결');
$(document).ready(function () {
    auctionProductDetail();
});

auction_product_id = location.pathname.split('/')[2];

let en_date;

/* 경매상품 상세 조회 */
function auctionProductDetail() {
    $.ajax({
        type: 'GET',
        url: `/api/products/auction/${auction_product_id}`,
        data: {},
        success: function (response) {
            const rows = response['data'];
            console.log(rows);
            if (rows === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }

            const seller = rows.User.email;
            const raiting = rows.User.raiting;
            const image = rows.Images[0].image_url;
            const product_name = rows.product_name;
            const product_content = rows.product_content;
            bid_count = rows.bid_count;
            product_buy_now_price = rows.product_buy_now_price;

            if (bid_count === null) {
                bid_count = 0;
            }

            if (product_buy_now_price !== null) {
                product_buy_now_price_convert =
                    product_buy_now_price.toLocaleString();
            }

            const category = rows.category;
            product_update = rows.product_update_price;
            const product_update_convert = product_update.toLocaleString();
            product_start = rows.product_start_price;
            const product_start_convert = product_start.toLocaleString();
            product_end_format = rows.product_end;
            product_end = product_end_format.replace('T', ' ').slice(0, -5);
            const date = new Date(product_end);
            en_date = date.toLocaleString('en');

            if (product_buy_now_price === product_update) {
                en_date = 0;
                ttt(en_date, 'countdown');
            } else {
                CountDownTimer(en_date, 'countdown');
            }

            if (product_update === null) {
                product_update = 0;
            }

            if (product_buy_now_price === null) {
                let temp_html = `
                    <div class="product_region">
                                    <div>
                                        <img src="${image}" width="400">
                                    </div>
                                    <div class="product_area">
                                        <p>등록자: ${seller}</p>
                                        <p>등록자 별점: ${raiting}</p>
                                        <p>상품이름: ${product_name}</p>
                                        <p>상품내용: ${product_content}</p>
                                        <p>시작 가격: ${product_start_convert}원<p>
                                        <p>현재 입찰가:${product_update_convert}원</p>
                                        <p>카테고리: ${category}</p>                    
                                        <p>마감시간: ${product_end}</p>
                                        <p>입찰 횟수: ${bid_count}</p>
                                    </div>
                                </div>
                    `;
                $('#auction_product').append(temp_html);
            } else {
                let temp_html = `
                                <div class="product_region">
                                    <div>
                                        <img src="${image}" width="400">
                                    </div>
                                    <div class="product_area">
                                        <p>등록자: ${seller}</p>
                                        <p>등록자 별점: ${raiting}</p>
                                        <p>상품이름: ${product_name}</p>
                                        <p>상품내용: ${product_content}</p>
                                        <p>즉시 구매가: ${product_buy_now_price_convert}원</p>
                                        <p>시작 가격: ${product_start_convert}원<p>
                                        <p>현재 입찰가:${product_update_convert}원</p>
                                        <p>카테고리: ${category}</p>                    
                                        <p>마감시간: ${product_end}</p>
                                        <p>입찰 횟수: ${bid_count}</p>
                                    </div>
                                </div>
                                `;
                $('#auction_product').append(temp_html);

                let temp_html_btn = `
                                    <a href="#"><button id="btn1" class="button_1" onclick="purchaseNow()">즉시 구매</button></a>
                                    `;
                // setTimeout(() => $('#purchase_btn').append(temp_html_btn), 1500)
                $('#purchase_btn').append(temp_html_btn);
            }
        },
        error: function (error) {
            console.log(error);
        },
    });
}

/* 경매상품 입찰 */
function bidBtn() {
    time_out = new Date(en_date) - new Date();
    const bid_price = $('#bid_price').val();
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

        // if (compare_price % 5000 !== 0) {
        //     alert('금액 단위는 5,000원 입니다.');
        //     return;
        // }

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
            data: { product_update_price: bid_price, product_end: add_time },
            success: function (response) {
                alert(response['message']);
                window.location.reload();
            },
            error: function (error) {
                console.log(error);
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
            console.log(error);
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

/* 버튼 숨기기 */
// function hideBtn1() {
//     const btn1 = document.getElementById('btn1');
//     btn1.style.display = 'none';
// }
// function hideBtn2() {
//     const btn2 = document.getElementById('btn2');
//     btn2.style.display = 'none';
// }

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
            clearInterval(timer);
            document.getElementById(id).innerHTML = '경매가 종료된 상품입니다.';
            // hideBtn1();
            // hideBtn2();
            return;
        }

        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = '경매 마감까지 ';
        document.getElementById(id).innerHTML += days + '일 ';
        document.getElementById(id).innerHTML += hours + '시간 ';
        document.getElementById(id).innerHTML += minutes + '분 ';
        document.getElementById(id).innerHTML += seconds + '초 남았습니다.';
    }

    timer = setInterval(showRemaining, 1000);
}

function ttt(dt, id) {
    let end = new Date(dt);

    function showRemaining() {
        const now = new Date();
        const distance = end - now;

        if (distance < 0) {
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

// const socket = io();

// const chat_view = document.getElementById('chat_view')
// const chat_form = document.getElementById('chat_form')

// chat_form.addEventListener('submit', function() {
//     if ($('#msg').val() === '') {
//         return
//     } else {
//         socket.emit('request_message', $('#msg').val());
//         const msg_line = $('<div class="msg_line">');
//         const msg_box = $('<div class="msg_box">');

//         msg_box.append($('#msg').val())
//         msg_box.css('display', 'inline-block')

//         msg_line.css('text-align', 'right')
//         msg_line.append(msg_box)

//         $('chat_view').append(msg_line)

//         $('#msg').val('')
//         chat_view.scrollTop = chat_view.scrollHeight
//     }
// })

//      socket.on('response_message', function(msg) {
//         const msg_line = $('<div class="msg_line">');
//         const msg_box = $('<div class="msg_box">');

//         msg_box.append(msg);
//         msg_box.css('display', 'inline-block')

//         msg_line.append(msg_box)
//         $('#chat_view').append(msg_line)

//         chat_view.scrollTop = chat_view.scrollHeight
//      });
