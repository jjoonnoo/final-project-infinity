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
            $('#seller').text('판매자 | ' + rows.User.email);
            $('#product_name').text(rows.product_name);
            $('#product_content').text(rows.product_content);
            $('#product_price_convert').text(
                '상품가격 ' + rows.product_price.toLocaleString() + '원'
            );
            $('#category').text('카테고리: ' + rows.category);

            for (let i = 0; i < rows.Images.length; i++) {
                if ((i = 0 && rows.Images.length > 1)) {
                    $('#img_container')
                        .append(`<div class="carousel-item active">
                    <img src="${rows.Images[i].image_url}" style='width:500px;height:500px;' class="d-block w-100">
                  </div>`);
                } else if (rows.Images.length === 1) {
                    $('#img_container')
                        .append(`<div class="carousel-item active">
                    <img src="${rows.Images[i].image_url}" style='width:500px;height:500px;' class="d-block w-100">
                  </div>`);
                } else {
                    $('#img_container')
                        .append(`            <div class="carousel-item">
                    <img class="d-block w-100" src="${rows.Images[i].image_url}" style='width:500px;height:500px;'>
                  </div>`);
                }
            }

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
