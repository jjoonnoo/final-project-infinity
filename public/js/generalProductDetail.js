$(document).ready(function () {
    generalProductDetail();
});

general_product_id = location.pathname.split('/')[2];

function generalProductDetail() {
    $.ajax({
        type: 'GET',
        url: `/api/products/general/${general_product_id}`,
        data: {},
        success: function (response) {
            const rows = response['data'];

            if (rows === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }

            if (rows === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }

            const seller = rows.User.email;
            const image = rows.Images[0].image_url;
            const product_name = rows.product_name;
            const product_content = rows.product_content;
            const product_price = rows.product_price;
            const product_price_convert = product_price.toLocaleString();
            const category = rows.category;

            let temp_html = `
                            <div class="product_region">
                                <div>
                                    <img src="${image}" width="400">
                                </div>
                                <div class="product_area" >
                                    <div class="product_name_css">
                                        <small>상품이름</small>
                                        <hr>
                                        <div class="product_name">  
                                            ${product_name}
                                        </div>
                                    </div>
                                    <div class="product_info_css">
                                        <small>상품내용</small>
                                        <hr>
                                        ${product_content}
                                    </div>
                                    <small>상품가격</small> ${product_price_convert} 원
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    수량 <input type=number min='1' id='quantity' value='1'>개</input>
                                    <hr>
                                    <div class="button_area">
                                    <button id="button_1" onclick="cartBtn()">장바구니 담기</button>
                                    </div>
                                </div>
                            </div>
                            `;
            $('#general_product').append(temp_html);

            let temp_html_categoty = `
                                    <small class="category">카테고리: ${category}</small>
                                    `;
            $('.a_tag').prepend(temp_html_categoty);

            let temp_html_seller = `
                                <small>판매자│ ${seller}</small>
                                `;
            $('.a_tag').append(temp_html_seller);

            for (let i = 0; i < rows.Reviews.length; i++) {
                let reviewer = rows.Reviews[i].User.email;
                let review_content = rows.Reviews[i].content;
                let date = rows.Reviews[i].createdAt;
                let review_date = date.replace('T', ' ').slice(0, -5);

                let temp_html = `
                                    <hr>
                                    <small>작성자│</small> ${reviewer}      
                                    <p></p>
                                    <p>${review_content}</p>
                                    <div class="review_date_css"><small>작성일│ ${review_date}</small></div>
                                  `;
                $('#general_review').append(temp_html);
            }

            if (rows.Reviews.length === 0) {
                let temp_html = `
                                    <hr>
                                    리뷰가 없습니다.
                                  `;
                $('#general_review').append(temp_html);
            }

            $('#review_count').val(`(${rows.Reviews.length})`);
        },
        error: function (error) {
            alert(error.responseJSON.message);
        },
    });
}

function cartBtn() {
    const product_quantity = $('#quantity').val();

    if (Number(product_quantity) < 1) {
        alert('수량을 정확하게 입력해주세요.');
        return window.location.reload();
    } else if (101 < Number(product_quantity)) {
        alert('최대 수량은 100개입니다.');
        return window.location.reload();
    }

    $.ajax({
        type: 'POST',
        url: `/api/products/cart/${general_product_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: { product_quantity: product_quantity },
        success: function (response) {
            alert(response['message']);
            window.location.reload();
        },
        error: function (error) {
            alert(error.responseJSON.message);
        },
    });
}

function reportBtn() {
    const title = $('#report_title').val();
    const content = $('#report_content').val();

    if (content === '') {
        alert('내용을 입력해주세요.');
        return;
    }

    $.ajax({
        type: 'POST',
        url: `/api/products/general/report/${general_product_id}`,
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
