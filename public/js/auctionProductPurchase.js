$(document).ready(async function () {
    auctionProductPurchase();
});

auction_product_id = location.pathname.split('/')[2];

function auctionProductPurchase() {
    $.ajax({
        type: 'GET',
        url: `/api/products/now_purchase/${auction_product_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            const rows = response['data'];

            if (rows[0] === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }

            const receiver = rows[1].name;
            const phone = rows[1].phone;
            const address = rows[1].address;
            const image = rows[0].Images[0].image_url;
            const product_name = rows[0].product_name;
            const product_content = rows[0].product_content;
            product_buy_now_price = rows[0].product_buy_now_price;
            const product_buy_now_price_convert =
                product_buy_now_price.toLocaleString();

            let temp_html = `
                        <div class="all_frame">
                            <h2>경매품 정보</h2>
                            <hr>
                            <div class="product_frame">
                                <div class="image_frame">
                                    <img src="${image}" width="400">
                                </div>
                                <div class="info_frame">
                                    <div class="info_name">${product_name}</div>
                                    <p>상품내용: ${product_content}</p>
                                    <p>즉시 구매 가격: ${product_buy_now_price_convert} 원</p>
                                </div>
                            </div>
                            <div class="delivery">
                                <h2>배송지 정보</h2>
                                <hr>
                                <table>
                                <tr class="left_tr">
                                    <td>
                                    <div class="delivery_title"><span class="input-name">&nbsp;받는 분</span></div>
                                    <input value="${receiver}" id="content1" type="text" placeholder="받는 분" readonly>
                                    </td>
                                </tr>
                                <tr class="left_tr">
                                    <td>
                                    <div class="delivery_title"><span class="input-name">&nbsp;연락처</span></div>
                                    <input value="${phone}" id="content2" type="text" placeholder="연락처" readonly>
                                    </td>
                                </tr>
                                <tr class="left_tr">
                                    <td>
                                    <div class="delivery_title"><span class="input-name">&nbsp;주소</span></div>
                                    <textarea id="content3" placeholder="주소" readonly>${address}</textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:80px">
                                    </td>
                                </tr>
                                </table>
                            </div>
                            <div id="productPrice">
                                <h2>최종 결제정보</h2>
                                <hr> 
                                <table id="reload_table">
                                <div class="frame">
                                <tr>
                                    <td bgcolor="#a5a4a2"><font color="white">총 주문 금액</font></td>
                                    <td>${product_buy_now_price_convert} 원</td> 
                                </tr>
                                </div>
                                <tr>
                                    <td>
                                    <button class="purchase_btn" type="button" onclick="purchase()">구매하기</button>
                                    </td>
                                </tr>
                                </table>
                            </div>
                        </div>
                      `;

            $('#inform').append(temp_html);
        },
        error: function (error) {
            alert(error.responseJSON.message);
        },
    });
}

function purchase() {
    if (!confirm('구매 하시겠습니까?')) {
        alert('구매를 취소했습니다.');
        location.href = `/auction/${auction_product_id}`;
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: `/api/products/purchase/${auction_product_id}`,
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            data: { product_buy_now_price: product_buy_now_price },
            success: function (response) {
                alert(response['message']);
            },
            error: function (error) {
                alert(error.responseJSON.message);
            },
        });
        return (location.href = '/'); // 메인 페이지로 이동
    }
}
