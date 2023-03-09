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
    console.log(image_urls);
    $.ajax({
        type: 'POST',
        url: '/products/auction',
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
        url: '/products/general',
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
            url: '/products/image_upload',
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
function myinfo() {
    $.ajax({
        type: 'GET',
        url: '/users/myinfo',
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
function myProduct() {}
//purchaseHistory

//saleHistory
