$(document).ready(function () {
    generalProductCart();
});

function generalProductCart() {
    $.ajax({
        type: 'GET',
        url: '/api/carts/general',
        data: {},
        success: function (response) {
            const rows = response['data'];

            cartSum();

            if (rows.length === 0) {
                let temp_html = `
                          <h1>장바구니가 비어있습니다.</h1>
                        `;
                $('#product').append(temp_html);
            }
            for (let i = 0; i < rows.length; i++) {
                buyer_name = rows[i].User.name;
                let buyer_email = rows[i].User.email;
                buyer_phone = rows[i].User.phone;
                buyer_address = rows[i].User.address;
                let general_product_id = rows[i].general_product_id;
                let product_image = rows[i].General_product.Images[0].image_url;
                let product_name = rows[i].General_product.product_name;
                let product_content = rows[i].General_product.product_content;
                let product_price = rows[i].General_product.product_price;
                let product_quantity = rows[i].product_quantity;
                let total = product_price * product_quantity;

                let temp_html = `
                          <table>
                            <tr>
                              <td>
                                <input type='checkbox' name='cart' value=${total},${general_product_id},${product_quantity} onclick="cartSum()">
                              </td>
                              <td>
                                <div class="cart-info">
                                  <a href="/product/general/${general_product_id}">
                                  <img src="${product_image}" width="100">
                                  <div class="pro_info">
                                    <p>${product_name}</p>
                                    <small>${product_content}</small><br>                                   
                                    <small>판매가 ${product_price}원</small>
                                    <br>
                                    <a href="#" id=${general_product_id} class="tt" onclick="cartDeleteBtn(this.id)"><small>삭제</small></a>
                                  </div>                                                        
                                </div>
                              </td>
                              <td>
                                <input type="number" class="cnt" value="${product_quantity}" readonly>
                                <button class="changeBtn" value=${general_product_id}>수량 변경</button>                             
                              </td>
                              <td>
                                ${total} 원                                 
                              </td>
                            </tr>
                          </table>
                          <hr>
                        `;

                $('#product').append(temp_html);

                $('#content1').val(buyer_name);

                $('#content2').val(buyer_phone);

                $('#content3').val(buyer_address);
            }

            $('.changeBtn').on('click', (e) => {
                target = e.target.value;

                changeQuantity(target);
            });
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function selectAll(selectAll) {
    const checkboxes = document.getElementsByName('cart');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    });

    let checked_price = [];
    checked_product_id = [];
    checked_quantity = [];
    product_total = Number();
    let len = $("input[name='cart']:checked").length;
    let delivery = 0;

    if (len > 0) {
        $("input[name='cart']:checked").each(function () {
            division = $(this).val().split(',');
            checked_price.push(division[0]);
            checked_product_id.push(division[1]);
            checked_quantity.push(division[2]);
            delivery = 2500;
        });
    }

    let sum = Number('');

    for (i = 0; i < checked_price.length; i++) {
        sum += Number(checked_price[i]);
    }

    product_total = sum;

    let final_total = product_total + delivery;

    $('#reload_table').remove();
    let temp_html = `
                        <table id="reload_table">
                          <tr>
                            <td>총 상품 가격</td>
                            <td>${product_total}원</td>
                          </tr>
                          <tr>
                            <td>배송비</td>
                            <td>${delivery}원</td>
                          </tr>
                          <tr>
                            <td>총 주문 금액</td>
                            <td>${final_total}원</td> 
                          </tr>
                          <tr>
                            <td>
                              <button type="button" onclick="cartPurchaseBtn()">구매하기</button>
                            </td>
                          </tr>
                        </table>
                      `;
    $('#productPrice').append(temp_html);
    return product_total;
}

/* 체크항목 계산 */
function cartSum() {
    let checked_price = [];
    checked_product_id = [];
    checked_quantity = [];
    product_total = Number();
    let len = $("input[name='cart']:checked").length;
    let delivery = 0;

    if (len > 0) {
        $("input[name='cart']:checked").each(function () {
            division = $(this).val().split(',');
            checked_price.push(division[0]);
            checked_product_id.push(division[1]);
            checked_quantity.push(division[2]);
            delivery = 2500;
        });
    }

    let sum = Number('');

    for (i = 0; i < checked_price.length; i++) {
        sum += Number(checked_price[i]);
    }

    product_total = sum;

    let final_total = product_total + delivery;

    $('#reload_table').remove();
    let temp_html = `
                        <table id="reload_table">
                          <tr>
                            <td>총 상품 가격</td>
                            <td>${product_total}원</td>
                          </tr>
                          <tr>
                            <td>배송비</td>
                            <td>${delivery}원</td>
                          </tr>
                          <tr>
                            <td>총 주문 금액</td>
                            <td>${final_total}원</td> 
                          </tr>
                          <tr>
                            <td>
                              <button type="button" onclick="cartPurchaseBtn()">구매하기</button>
                            </td>
                          </tr>
                        </table>
                      `;
    $('#productPrice').append(temp_html);
    return product_total;
}

function cartPurchaseBtn() {
    checked_product_id;
    product_total;
    checked_quantity;
    let receiver_name = $('#content1').val();
    let receiver_phone = $('#content2').val();
    let receiver_address = $('#content3').val();

    if ([receiver_name, receiver_phone, receiver_address].includes('')) {
        return alert('필수 정보들을 입력해주세요.');
    } else if (checked_product_id.length === 0) {
        return alert('구매할 상품을 체크해주세요.');
    }

    if (!confirm('구매하시겠습니까?')) {
        return;
    } else {
    }

    $.ajax({
        type: 'POST',
        url: '/api/carts/general',
        data: {
            general_product_id: checked_product_id,
            product_quantity: checked_quantity,
        },
        success: function (response) {
            alert(response['message']);
            window.location.reload();
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function cartDeleteBtn(general_product_id) {
    let target_product_id = general_product_id;

    if (!confirm('선택한 상품을 삭제하시겠습니까?')) {
        return;
    } else {
    }

    $.ajax({
        type: 'DELETE',
        url: '/api/carts/general',
        data: { general_product_id: target_product_id },
        success: function (response) {
            alert(response['message']);
            window.location.reload();
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function changeQuantity(target) {
    let input_quantity = prompt('변경할 수량을 입력해주세요', '');

    if (input_quantity === null) {
        return;
    }

    let target_product_id = target;

    $.ajax({
        type: 'PATCH',
        url: '/api/carts/general',
        data: {
            general_product_id: target_product_id,
            product_quantity: input_quantity,
        },
        success: function (response) {
            alert(response['message']);
            window.location.reload();
        },
        error: function (error) {
            console.log(error);
        },
    });
}
