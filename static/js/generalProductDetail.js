$(document).ready(function () {
    generalProductDetail();
});

general_product_id = location.pathname.split('/')[3];

function generalProductDetail() {
    $.ajax({
        type: 'GET',
        url: `/product/general/detail/${general_product_id}`,
        data: {},
        success: function (response) {
            const rows = response['data'];

            if (rows === null) {
                alert('존재하지 않는 상품입니다.');
                return history.back();
            }

            const seller = rows.User.email;
            // const image =
            const product_name = rows.product_name;
            const product_content = rows.product_content;
            const product_price = rows.product_price;
            const category = rows.category;

            let temp_html = `
                      <p>등록자: ${seller}</p>
                      <p>상품이미지:</p>
                      <p>상품이름: ${product_name}</p>
                      <p>상품내용: ${product_content}</p>
                      <p>상품가격: ${product_price}</p>
                      <p>카테고리: ${category}</p>
                      <p>수량<input type=number min='1' id='quantity' value='1'>개</input></p>
                      <button onclick='cartBtn()'>구매하기</button>
                      `;
            $('#general_product').append(temp_html);

            for (let i = 0; i < rows.Reviews.length; i++) {
                let reviewer = rows.Reviews[i].User.email;
                let review_content = rows.Reviews[i].content;
                let review_date = rows.Reviews[i].createdAt;

                let temp_html_2 = `
                       <hr>
                       <p>리뷰자: ${reviewer}</p>
                       <p>리뷰내용: ${review_content}</p>
                       <p>리뷰작성일자: ${review_date}</p>
                       `;
                $('#general_review').append(temp_html_2);
            }
        },
        error: function (error) {
            console.log(error);
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
        url: `/product/general/detail/${general_product_id}`,
        data: { product_quantity: product_quantity },
        success: function (response) {
            alert(response['message']);
        },
        error: function (error) {
            console.log(error);
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
        url: `/product/general_report/${general_product_id}`,
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
