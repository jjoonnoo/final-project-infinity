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
            // alert(response.message);
            alert('성공');
        },
        error: function (err) {
            // alert(err.responseJSON.message);
            alert('실패');
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
        data: {
            product_name: product_name,
            category: product_category,
            product_content: product_content,
            product_price: product_price,
            img_url: img_urls,
        },
        success: function (response) {
            alert(response.message);
        },
        error: function (err) {
            alert(err.responseJSON.message);
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
            // headers: {
            //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // },
            success: function (response) {
                $('#image_container1').append(
                    '<img src="' + response.url + '">'
                );
            },
            error: function (err) {
                alert('오류');
            },
        });
    } else if (productType === '2') {
        const imageInput = $('#product_image2')[0];
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        $.ajax({
            type: 'POST',
            url: '/products/image_upload',
            processData: false,
            contentType: false,
            data: formData,
            // headers: {
            //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // },
            success: function (response) {
                $('#image_container2').append(
                    '<img src="' + response.url + '">'
                );
            },
            error: function (err) {
                alert('오류');
            },
        });
    }
}
//myinfo
function myInfo() {
    $.ajax({
        type: 'GET',
        url: '/api/users/my_info',
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
        data: {},
        success: function (response) {
            const email = response.email;
            const phone = response.phone;
            const name = response.name;
            const raiting = response.raiting;
            const address = response.address;
            const temp = `          <div>
      이메일<input id='user_email' value="${email}" readonly>
      이름<input id='user_name' value="${name}" readonly>
      연락처<input value="${phone}" readonly>
      주소<input value="${address}" readonly>
      평점<input value="${raiting}" readonly>
        <button onclick="modifyInfo()" class="btn btn-outline-secondary" type="button">내 정보 수정하기</button>
        <button onclick="deleteInfo()" class="btn btn-outline-secondary" type="button">탈퇴하기</button>
    </div>`;
            $('#myinfo').append(temp);
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
        },
    });
}

//myproduct
function myProduct() {
    $.ajax({
        type: 'GET',
        url: '/api/products/my_product',
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
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
                let product_raiting = general_data[i]['raiting'];
                let temp = `<tr>
                <th scope="row"></th>
                <td>${product_name}</td>
                <td>${product_category}</td>
                <td>${product_content}</td>
                <td>${product_price}</td>
                <td>${product_raiting}</td>
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
        },
    });
}
function deleteAuctionProduct(auction_product_id) {
    const is_real_delete = confirm('정말로 삭제하시겠습니까?');
    if (is_real_delete) {
        $.ajax({
            type: 'DELETE',
            url: `/api/products/auction/${auction_product_id}`,
            // headers: {
            //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // },
            data: {},
            success: function (response) {},
            error: function (err) {
                alert(err.responseJSON.errorMessage);
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
            // headers: {
            //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // },
            data: {},
            success: function (response) {},
            error: function (err) {
                alert(err.responseJSON.errorMessage);
            },
        });
    } else {
        alert('취소되었습니다.');
    }
}
//purchaseHistory
function purchaseHistory() {
    $.ajax({
        type: 'GET',
        url: '',
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
        data: {},
        success: function (response) {},
        error: function (err) {
            alert(err.responseJSON.errorMessage);
        },
    });
}
//saleHistory
function saleHistory() {
    $.ajax({
        type: 'GET',
        url: '',
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
        data: {},
        success: function (response) {},
        error: function (err) {
            alert(err.responseJSON.errorMessage);
        },
    });
}
//productModify
function getAuctionProduct(auction_product_id) {
    $.ajax({
        type: 'GET',
        url: `/api/products/auction/${auction_product_id}`,
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
        data: {},
        success: function (response) {
            const auction_product_data = response.data.data1;
            const image = response.data.data2;
            let date = new Date(
                new Date().getTime() - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .slice(0, -8);
            // if(auction_product_data['product_start'] <= date){
            //     alert('이미 시작한 경매는 수정할 수 없습니다.')
            //     // window.location.href='/myProduct'
            // }
            // else if(auction_product_data['product_end'] <= date){
            //     alert('이미 종료된 경매는 수정할 수 없습니다.')
            //     // window.location.href='/myProduct'
            // }else{
            $('#product_name1').attr(
                'value',
                auction_product_data['product_name']
            );
            $('#product_category1').attr(
                'value',
                auction_product_data['category']
            );
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
                    '<img src="' + image[i]['image_url'] + '">'
                );
                // }
            }
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
        },
    });
}
function getGeneralProduct(general_product_id) {
    $.ajax({
        type: 'GET',
        url: `/api/products/general/${general_product_id}`,
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
        data: {},
        success: function (response) {
            const general_product_data = response.data.data1;
            const image = response.data.data2;
            $('#product_name2').attr(
                'value',
                general_product_data['product_name']
            );
            $('#product_category2').attr(
                'value',
                general_product_data['category']
            );
            $('#product_content2').attr(
                'value',
                general_product_data['product_content']
            );
            $('#product_price').attr(
                'value',
                general_product_data['product_price']
            );
            for (let i = 0; i < image.length; i++) {
                $('#image_container1').append(
                    '<img src="' + image[i]['image_url'] + '">'
                );
            }
        },
        error: function (err) {
            alert(err.responseJSON.errorMessage);
        },
    });
}
function modifyAuctionProduct(auction_product_id) {
    $.ajax({
        type: 'PATCH',
        url: `/products/auction/${auction_product_id}`,
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // },
        data: {},
        success: function (response) {},
        error: function (err) {
            alert(err.responseJSON.errorMessage);
        },
    });
}
// function modifyGeneralProduct(general_product_id){
//     $.ajax({
//         type: 'PATCH',
//         url: `/products/auction/${general_product_id}`,
//         // headers: {
//         //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         // },
//         data: {},
//         success: function (response) {},
//         error: function (err) {
//             alert(err.responseJSON.errorMessage);
//         },
//     });
// }
