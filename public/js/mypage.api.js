//이미지 업로드 및 미리보기
function upload_image() {
    const productType = $('#product_type').val();
    if (productType === '1') {
        const imageInput = $('#product_image1')[0];
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        $.ajax({
            type: 'POST',
            url: '/api/products/image_upload',
            processData: false,
            contentType: false,
            data: formData,
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            success: function (response) {
                $('#image_container1').append(
                    '<div><img src="' +
                        response.url +
                        '"><button onclick="image_delete(this)">X</button></div>'
                );
            },
            error: function (err) {
                alert(error.responseJSON.message);
            },
        });
    }
    if (productType === '2') {
        const imageInput = $('#product_image2')[0];
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        $.ajax({
            type: 'POST',
            url: '/api/products/image_upload',
            processData: false,
            contentType: false,
            data: formData,
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            success: function (response) {
                $('#image_container2').append(
                    '<img src="' + response.url + '">'
                );
            },
            error: function (err) {
                alert(error.responseJSON.message);
            },
        });
    }
}
function image_delete(th) {
    $(th).parent('div').remove();
    document.getElementById('product_image1').value = null;
    document.getElementById('product_image2').value = null;
}
//product regist
function registAuctionProduct() {
    const product_name = $('#product_name1').val();
    const product_category = $('#product_category2 option:selected').text();
    const product_content = $('#product_content1').val();
    const product_start_price = $('#product_start_price').val();
    const product_buy_now_price = $('#product_buy_now_price').val();
    const product_start_date = $('#product_start_date').val();
    const product_end_date = $('#product_end_date').val();
    const image_container = document.getElementById('image_container1');
    const img_elements = image_container.querySelectorAll('img');
    const img_urls = [];
    img_elements.forEach((img_element) => {
        img_urls.push(img_element.src);
    });
    $.ajax({
        type: 'POST',
        url: '/api/products/auction',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            product_name: product_name,
            category: product_category,
            product_content: product_content,
            product_start_price: product_start_price,
            product_buy_now_price: product_buy_now_price,
            product_start: product_start_date,
            product_end: product_end_date,
            img_url: img_urls,
        },

        success: function (response) {
            alert(response.message);
            window.location.reload();
        },
        error: function (err) {
            alert(err.responseJSON.message);
            window.location.reload();
        },
    });
}
function registGeneralProduct() {
    const product_name = $('#product_name2').val();
    const product_category = $('#product_category2 option:selected').text();
    const product_content = $('#product_content2').val();
    const product_price = $('#product_price').val();
    const image_container = document.getElementById('image_container2');
    const img_elements = image_container.querySelectorAll('img');
    const img_urls = [];
    img_elements.forEach((img_element) => {
        img_urls.push(img_element.src);
    });
    $.ajax({
        type: 'POST',
        url: '/api/products/general',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            product_name: product_name,
            category: product_category,
            product_content: product_content,
            product_price: product_price,
            img_url: img_urls,
        },
        success: function (response) {
            alert(response.message);
            window.location.reload();
        },
        error: function (err) {
            alert(err.responseJSON.message);
            window.location.reload();
        },
    });
}
function changeProductType() {
    const productType = $('#product_type').val();
    if (productType === '1') {
        $('#general_product_regist').hide();
        $('#auction_product_regist').show();
    }
    if (productType === '2') {
        $('#general_product_regist').show();
        $('#auction_product_regist').hide();
    }
}

//myinfo
function confirmPwd() {
    const user_pwd = $('#user_password').val();
    $.ajax({
        type: 'POST',
        url: '/api/users/confirm_pwd',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: { password: user_pwd },
        success: function (response) {
            alert(response.message);
            getMyInfo();
        },
        error: function (error) {
            alert(error.responseJSON.message);
            window.location.reload();
        },
    });
}
function getMyInfo() {
    $('#confirm_pwd_div').hide();
    $.ajax({
        type: 'GET',
        url: '/api/users/getmyinfo',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            const data = response.data;
            const user_id = data.user_id;
            const email = data.email;
            const phone = data.phone;
            const name = data.name;
            const raiting = data.rating;
            const address = data.address;
            const temp = `            <ul>
            <li><input id='user_email' value="${email}" readonly></li>
            <li><input id='user_name' value="${name}" readonly></li>
            <li><input id="user_phone" value="${phone}" readonly></li>
            <li><input id="user_address" value="${address}" readonly></li>
            <li><input id="user_raiting" value="${raiting}" readonly></li>
            <li><input id="user_pwd" type="password" style="display:none;"> </li>
            <li><button onclick="modifyInfoButtonHandler()" id="modifyInfoButton" class="btn btn-outline-secondary" type="button">내 정보 수정하기</button></li>
            <li><button onclick="modifyPwdButtonHandler()" id="modifyPwdButton" class="btn btn-outline-secondary" type="button">비밀번호 수정하기</button></li>
            <li><button onclick="deleteInfo(${user_id})" id ="deleteInfoButton" class="btn btn-outline-secondary" type="button">탈퇴하기</button></li>
            <li><button onclick="modifyInfo(${user_id})" id ="modifyInfo" class="btn btn-outline-secondary" type="button" style="display:none;">수정하기</button></li>
            <li><button onclick="cancelButton()" id="cancelButton" class="btn btn-outline-secondary" type="button" style="display:none;">취소하기</button></li>
        </ul>`;
            $('#myinfomation').append(temp);
        },
        error: function (err) {
            alert(err.responseJSON.message);
        },
    });
}
function modifyInfoButtonHandler() {
    $('#modifyInfoButton').hide();
    $('#modifyPwdButton').hide();
    $('#deleteInfoButton').hide();
    $('#modifyInfo').show();
    $('#cancelButton').show();
    $('#user_email').attr('readonly', false);
    $('#user_name').attr('readonly', false);
    $('#user_phone').attr('readonly', false);
    $('#user_address').attr('readonly', false);
}
function modifyPwdButtonHandler() {
    $('#modifyInfoButton').hide();
    $('#modifyPwdButton').hide();
    $('#deleteInfoButton').hide();
    $('#user_email').hide();
    $('#user_name').hide();
    $('#user_phone').hide();
    $('#user_address').hide();
    $('#user_raiting').hide();
    $('#cancelButton').show();
    $('#modifyInfo').show();
    $('#user_pwd').show();
}
function cancelButton() {
    $('#cancelButton').hide();
    $('#modifyInfo').hide();
    $('#user_pwd').hide();
    $('#user_email').show();
    $('#user_name').show();
    $('#user_phone').show();
    $('#user_address').show();
    $('#user_raiting').show();
    $('#modifyInfoButton').show();
    $('#modifyPwdButton').show();
    $('#modifyInfoButtonHandlerButton').show();
    $('#deleteInfoButton').show();
    $('#user_email').attr('readonly', true);
    $('#user_name').attr('readonly', true);
    $('#user_phone').attr('readonly', true);
    $('#user_address').attr('readonly', true);
}
function deleteInfo(user_id) {
    const is_real_delete = confirm('정말로 탈퇴하시겠습니까?');
    if (is_real_delete) {
        $.ajax({
            type: 'DELETE',
            url: `/api/users/user/${user_id}`,
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            data: {},
            success: function (response) {
                alert(response.message);
                localStorage.clear();
                window.location.href = '/';
            },
            error: function (err) {
                alert(err.responseJSON.message);
                window.location.href = '/myInfo';
            },
        });
    } else {
        alert('취소되었습니다.');
    }
}
function modifyInfo(user_id) {
    const user_email = $('#user_email').val();
    const user_name = $('#user_name').val();
    const user_phone = $('#user_phone').val();
    const user_address = $('#user_address').val();
    const user_pwd = $('#user_pwd').val();
    $.ajax({
        type: 'PATCH',
        url: `/api/users/user/${user_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            email: user_email,
            name: user_name,
            phone: user_phone,
            address: user_address,
            password: user_pwd,
        },
        success: function (response) {
            alert(response.message);
            localStorage.clear();
            window.location.href = '/';
        },
        error: function (err) {
            alert(err.responseJSON.message);
            window.location.reload();
        },
    });
}
//myproduct
function myProduct() {
    $.ajax({
        type: 'GET',
        url: '/api/products/my_product',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            const general_data = response.data.data1;
            const auction_data = response.data.data2;
            for (let i = 0; i < general_data.length; i++) {
                let general_product_id = general_data[i]['general_product_id'];
                let product_name = general_data[i]['product_name'];
                let product_category = general_data[i]['category'];
                let product_content = general_data[i]['product_content'];
                let product_price = general_data[i]['product_price'];
                let product_rating = general_data[i]['rating'];
                let temp = `<tr>
                <th scope="row"></th>
                <td>${product_name}</td>
                <td>${product_category}</td>
                <td>${product_content}</td>
                <td>${product_price}</td>
                <td>${product_rating}</td>
                <td>
                    <button onclick="deleteGeneralProduct(${general_product_id})">삭제</button>
                </td>
                <td>
                <button onclick="window.location.href='/generalproductmodify/${general_product_id}'">수정</button>
                </td>
            </tr>`;
                $('#my_general_products').append(temp);
            }
            for (let i = 0; i < auction_data.length; i++) {
                let auction_product_id = auction_data[i]['auction_product_id'];
                let product_name = auction_data[i]['product_name'];
                let product_content = auction_data[i]['product_content'];
                let product_category = auction_data[i]['category'];
                let product_buy_now_price =
                    auction_data[i]['product_buy_now_price'];
                let product_end = auction_data[i]['product_end'].slice(0, 16);
                let product_start = auction_data[i]['product_start'].slice(
                    0,
                    16
                );
                let product_start_price =
                    auction_data[i]['product_start_price'];
                let temp = `                    <tr>
                <th scope="row"></th>
                <td>${product_name}</td>
                <td>${product_category}</td>
                <td>${product_content}</td>
                <td>${product_start_price}</td>
                <td>${product_buy_now_price}</td>
                <td>${product_start}</td>
                <td>${product_end}</td>
                <td>
                    <button onclick="deleteAuctionProduct(${auction_product_id})">삭제</button>
                </td>
                <td>
                    <button onclick="window.location.href='/auctionproductmodify/${auction_product_id}'">수정</button>
                </td>
            </tr>`;
                $('#my_auction_products').append(temp);
            }
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
            window.location.href = '/';
        },
    });
}
function deleteAuctionProduct(auction_product_id) {
    const is_real_delete = confirm('정말로 삭제하시겠습니까?');
    if (is_real_delete) {
        $.ajax({
            type: 'DELETE',
            url: `/api/products/auction/${auction_product_id}`,
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            data: {},
            success: function (response) {
                alert(response.message);
                window.location.reload();
            },
            error: function (err) {
                alert(err.responseJSON.errorMessage);
                window.location.href = '/myProduct';
            },
        });
    } else {
        alert('취소되었습니다.');
    }
}
function deleteGeneralProduct(general_product_id) {
    const is_real_delete = confirm('정말로 삭제하시겠습니까?');
    if (is_real_delete) {
        $.ajax({
            type: 'DELETE',
            url: `/api/products/auction/${general_product_id}`,
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            data: {},
            success: function (response) {
                alert(response.message);
                window.location.reload();
            },
            error: function (err) {
                alert(err.responseJSON.errorMessage);
                window.location.href = '/myProduct';
            },
        });
    } else {
        alert('취소되었습니다.');
    }
}
//purchaseHistory
function getPurchaseHistory() {
    $.ajax({
        type: 'GET',
        url: '/api/orders/purchase',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            let general_data = response.data.general_data;
            let auction_data = response.data.auction_data;

            for (let i = 0; i < auction_data.length; i++) {
                let temp = `                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">주문 번호</th>
                    <th scope="col">이미지</th>
                    <th scope="col">상품명</th>
                    <th scope="col">카테고리</th>
                    <th scope="col">가격</th>
                    <th scope="col">종료시간</th>
                  </tr>
                </thead>
                <tbody>
                        <tr>
                          <th scope="row">${
                              auction_data[i].auction_order_id
                          }</th>
                          <td><img src="${
                              auction_data[i].Auction_product.Images[0]
                                  .image_url
                          }" width="30" height="30"></td>
                          <td>${
                              auction_data[i].Auction_product.product_name
                          }</td>
                          <td>${auction_data[i].Auction_product.category}</td>
                          <td>${
                              auction_data[i].Auction_product
                                  .product_update_price
                          } 원</td>
                          <td>${auction_data[
                              i
                          ].Auction_product.product_end.slice(0, -8)} </td>
                        </tr>
                <tr class="">
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <td><a href="#" class="reviewOpenBtn" data-auction-product-id="${
                            auction_data[i].Auction_product.auction_product_id
                        }">리뷰</a></td>
                        <td><a href="#" class="openBtn" style="margin-left: 1px" data-auction-product-id="${
                            auction_data[i].Auction_product.auction_product_id
                        }">신고</a></td>
                    </tr>
                </tbody>
            </table>`;
                $('#my_auction_product_purchase_history').append(temp);
            }
            for (let i = 0; i < general_data.length; i++) {
                let total_price = 0;
                let temp = `                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">주문 번호</th>
                        <th scope="col">이미지</th>
                        <th scope="col">상품명</th>
                        <th scope="col">카테고리</th>
                        <th scope="col">가격</th>
                        <th scope="col">수량</th>
                        <th scope="col">리뷰</th>
                        <th scope="col">신고</th>
                      </tr>
                    </thead>`;
                for (
                    let j = 0;
                    j < general_data[i].General_order_infos.length;
                    j++
                ) {
                    temp += `<tbody>
                        <tr>
                          <th scope="row">${general_data[i].general_order_id}</th>
                          <td><img src="${general_data[i].General_order_infos[j].General_product.Images[0].image_url}" width="30" height="30"></td>
                          <td>${general_data[i].General_order_infos[j].General_product.product_name}</td>
                          <td>${general_data[i].General_order_infos[j].General_product.category}</td>
                          <td>${general_data[i].General_order_infos[j].General_product.product_price} 원</td>
                          <td>${general_data[i].General_order_infos[j].product_quantity} 개</td>
                          <td><a href="#" class="reviewOpenBtns" data-general-product-id="${general_data[i].General_order_infos[j].General_product.general_product_id}">리뷰</a></td>
                          <td><a href="#" class="openBtns" data-general-product-id="${general_data[i].General_order_infos[j].General_product.general_product_id}">신고</a></td>
                        `;
                    total_price +=
                        general_data[i].General_order_infos[j]
                            .product_quantity *
                        general_data[i].General_order_infos[j].General_product
                            .product_price;
                }
                temp += `
                </tr>
                <tr class="">
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <th scope="row"></th>
                        <td>합계: </td>
                        <td>${total_price} 원</td>
                    </tr>
                </tbody>
            </table>`;
                $('#my_general_product_purchase_history').append(temp);
            }
        },
        error: function (err) {
            alert(err.responseJSON.message);
        },
    });
}
//saleHistory
function getSaleHistory() {
    $.ajax({
        type: 'GET',
        url: '/api/orders/sale',
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            const auction_data = response.data.auction_data;
            const general_data = response.data.general_data;
            for (let i = 0; i < auction_data.length; i++) {
                if (!auction_data[i].Auction_order) {
                    continue;
                } else {
                    let temp = `                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">주문 번호</th>
                    <th scope="col">이미지</th>
                    <th scope="col">상품명</th>
                    <th scope="col">카테고리</th>
                    <th scope="col">종료시간</th>
                    <th scope="col">낙찰가</th>
                    <th scope="col">낙찰자</th>
                    <th scope="col">낙찰자이메일</th>
                    <th scope="col">낙찰자주소</th>
                  </tr>
                </thead>
                <tbody>
                        <tr>
                          <th scope="row">${
                              auction_data[i].Auction_order.auction_order_id
                          }</th>
                          <td><img src="${
                              auction_data[i].Images[0].image_url
                          }" width="30" height="30"></td>
                          <td>${auction_data[i].product_name}</td>
                          <td>${auction_data[i].category}</td>
                          <td>${auction_data[i].product_end.slice(0, -8)} </td>
                          <td>${auction_data[i].product_update_price}원</td>
                          <td>${auction_data[i].Auction_order.User.name} </td>
                          <td>${auction_data[i].Auction_order.User.email} </td>
                          <td>${
                              auction_data[i].Auction_order.User.address
                          } </td>
                        </tr>
                </tbody>
            </table>`;
                    $('#my_auction_product_sale_history').append(temp);
                }
            }
            for (let i = 0; i < general_data.length; i++) {
                let temp = `                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">이미지</th>
                        <th scope="col">상품명</th>
                        <th scope="col">카테고리</th>
                        <th scope="col">가격</th>
                        <th scope="col">수량</th>
                        <th scope="col">주문자</th>
                        <th scope="col">주문자이메일</th>
                        <th scope="col">주문자주소</th>
                      </tr>
                    </thead>`;
                for (
                    let j = 0;
                    j < general_data[i].General_order_infos.length;
                    j++
                ) {
                    temp += `<tbody>
                        <tr>
                          <td><img src="${general_data[i].Images[0].image_url}" width="30" height="30"></td>
                          <td>${general_data[i].product_name}</td>
                          <td>${general_data[i].category}</td>
                          <td>${general_data[i].product_price} 원</td>
                          <td>${general_data[i].General_order_infos[j].product_quantity} 개</td>
                          <td>${general_data[i].General_order_infos[j].General_order.User.name}</td>
                          <td>${general_data[i].General_order_infos[j].General_order.User.email}</td>
                          <td>${general_data[i].General_order_infos[j].General_order.User.address}</td>
                        </tr>
                        `;
                }
                $('#my_general_product_sale_history').append(temp);
            }
        },
        error: function (err) {
            alert(err.responseJSON.message);
        },
    });
}
//productModify
function getAuctionProduct(auction_product_id) {
    $.ajax({
        type: 'GET',
        url: `/api/products/auction/${auction_product_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            const auction_product_data = response.data;
            const image = response.data.Images;
            let date = new Date(
                new Date().getTime() - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .slice(0, -8);
            if (auction_product_data['product_end'] <= date) {
                alert('이미 종료된 경매는 수정할 수 없습니다.');
                window.location.href = '/myProduct';
            } else if (auction_product_data['product_start'] <= date) {
                alert('이미 시작한 경매는 수정할 수 없습니다.');
                window.location.href = '/myProduct';
            } else {
                $('#product_name1').attr(
                    'value',
                    auction_product_data['product_name']
                );
                $('#product_category1')
                    .val(auction_product_data['category'])
                    .prop('selected', true);

                $('#product_content1').attr(
                    'value',
                    auction_product_data['product_content']
                );
                $('#product_start_price').attr(
                    'value',
                    auction_product_data['product_start_price']
                );
                $('#product_buy_now_price').attr(
                    'value',
                    auction_product_data['product_buy_now_price']
                );
                $('#product_start_date').attr(
                    'value',
                    auction_product_data['product_start'].slice(0, -8)
                );
                $('#product_end_date').attr(
                    'value',
                    auction_product_data['product_end'].slice(0, -8)
                );
                for (let i = 0; i < image.length; i++) {
                    $('#image_container1').append(
                        '<div><img src="' +
                            image[i]['image_url'] +
                            '"><button onclick="image_delete(this)">X</button></div>'
                    );
                }
            }
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
            window.location.href = '/myProduct';
        },
    });
}
function getGeneralProduct(general_product_id) {
    $.ajax({
        type: 'GET',
        url: `/api/products/general/${general_product_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {},
        success: function (response) {
            const general_product_data = response.data.data1;
            const image = response.data.data2;
            $('#product_name2').attr(
                'value',
                general_product_data['product_name']
            );
            $('#product_category2')
                .val(general_product_data['category'])
                .prop('selected', true);
            $('#product_content2').attr(
                'value',
                general_product_data['product_content']
            );
            $('#product_price').attr(
                'value',
                general_product_data['product_price']
            );
            for (let i = 0; i < image.length; i++) {
                $('#image_container2').append(
                    '<div><img src="' +
                        image[i]['image_url'] +
                        '"><button onclick="image_delete(this)">X</button></div>'
                );
            }
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
            window.location.href = '/myProduct';
        },
    });
}
function modifyAuctionProduct(auction_product_id) {
    const product_name = $('#product_name1').val();
    let product_category = $('#product_category1 option:selected').text();
    const product_content = $('#product_content1').val();
    const product_start_price = $('#product_start_price').val();
    const product_buy_now_price = $('#product_buy_now_price').val();
    const product_start_date = $('#product_start_date').val();
    const product_end_date = $('#product_end_date').val();
    const image_container = document.getElementById('image_container1');
    const img_elements = image_container.querySelectorAll('img');
    const img_urls = [];
    img_elements.forEach((img_element) => {
        img_urls.push(img_element.src);
    });
    if (!product_category) {
        product_category = '그외';
    }
    $.ajax({
        type: 'PATCH',
        url: `/api/products/auction/${auction_product_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            product_name: product_name,
            category: product_category,
            product_content: product_content,
            product_start_price: product_start_price,
            product_buy_now_price: product_buy_now_price,
            product_start: product_start_date,
            product_end: product_end_date,
            img_url: img_urls,
        },
        success: function (response) {
            alert(response.message);
            window.location.href = '/myProduct';
        },
        error: function (err) {
            alert(err.responseJSON.message);
            window.location.href = '/myProduct';
        },
    });
}
function modifyGeneralProduct(general_product_id) {
    const product_name = $('#product_name2').val();
    const product_category = $('#product_category2 option:selected').text();
    const product_content = $('#product_content2').val();
    const product_price = $('#product_price').val();
    const image_container = document.getElementById('image_container2');
    const img_elements = image_container.querySelectorAll('img');
    const img_urls = [];
    img_elements.forEach((img_element) => {
        img_urls.push(img_element.src);
    });
    $.ajax({
        type: 'PATCH',
        url: `/products/general/${general_product_id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
            product_name: product_name,
            category: product_category,
            product_content: product_content,
            product_price: product_price,
            img_url: img_urls,
        },
        success: function (response) {
            alert(response.message);
            window.location.href = '/myProduct';
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
            window.location.href = '/myProduct';
        },
    });
}

function reportOpen() {
    document.querySelector('.modal').classList.remove('hidden');
}
function reportClose() {
    document.querySelector('.modal').classList.add('hidden');
}
function reportOpenGenral() {
    document.querySelector('.modals').classList.remove('hidden_general');
}
function reportCloseGenral() {
    document.querySelector('.modals').classList.add('hidden_general');
}
function reviewOpen() {
    document.querySelector('.modal_review').classList.remove('hidden_review');
}
function reviewClose() {
    document.querySelector('.modal_review').classList.add('hidden_review');
}
function reviewOpenGenral() {
    document
        .querySelector('.modal_review_general')
        .classList.remove('hidden_review_general');
}
function reviewCloseGenral() {
    document
        .querySelector('.modal_review_general')
        .classList.add('hidden_review_general');
}
