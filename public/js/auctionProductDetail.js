$(document).ready(async function () {
    auctionProductDetail();
});

auction_product_id = location.pathname.split('/')[3];

let en_date;

/* 경매상품 상세 조회 */
function auctionProductDetail() {
    $.ajax({
        type: 'GET',
        url: `/products/auction/detail/${auction_product_id}`,
        data: {},
        success: function (response) {
            const rows = response['data'];

            if (rows === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }

            const seller = rows.User.email;
            const raiting = rows.User.raiting;
            const image = rows.Images[0].image_url;
            const product_name = rows.product_name;
            const product_content = rows.product_content;
            product_buy_now_price = rows.product_buy_now_price;
            const category = rows.category;
            product_update = rows.product_update_price;
            product_start = rows.product_start_price;
            const product_end_format = rows.product_end;
            product_end = product_end_format.replace('T', ' ').slice(0, -5);
            const date = new Date(product_end);
            en_date = date.toLocaleString('en');

            CountDownTimer(en_date, 'countdown');

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
                                        <p>시작 가격: ${product_start}원<p>
                                        <p>현재 입찰가:${product_update}원</p>
                                        <p>카테고리: ${category}</p>                    
                                        <p>마감시간: ${product_end}</p>
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
                                        <p>즉시 구매가: ${product_buy_now_price}원</p>
                                        <p>시작 가격: ${product_start}원<p>
                                        <p>현재 입찰가:${product_update}원</p>
                                        <p>카테고리: ${category}</p>                    
                                        <p>마감시간: ${product_end}</p>
                                    </div>
                                </div>
                                `;
                $('#auction_product').append(temp_html);

                let temp_html_btn = `
                                    <a href="/product/auction_purchase/${auction_product_id}"><button id="btn1" class="button_1">즉시 구매</button></a>
                                    `;
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

    if (time_out < 0) {
        alert('경매가 마감되었습니다.');
        return window.location.reload();
    } else {
        if (compare_price % 5000 !== 0) {
            alert('금액 단위는 5,000원 입니다.');
            return;
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
                location.href = `/product/auction_purchase/${auction_product_id}`;
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
                    location.href = `/product/auction_purchase/${auction_product_id}`;
                    compare_price = 'null';
                }
            }
        }

        $.ajax({
            type: 'PATCH',
            url: `/products/auction/update/${auction_product_id}`,
            data: { product_update_price: bid_price },
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
        url: `/products/auction/report/${auction_product_id}`,
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
function hideBtn1() {
    const btn1 = document.getElementById('btn1');
    btn1.style.display = 'none';
}
function hideBtn2() {
    const btn2 = document.getElementById('btn2');
    btn2.style.display = 'none';
}

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
            hideBtn1();
            hideBtn2();
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
