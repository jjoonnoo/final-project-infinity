$(document).ready( async function () {
  auctionProductPurchase();
});

auction_product_id = location.pathname.split('/')[3];

function auctionProductPurchase() {
  $.ajax({
    type: 'GET',
    url: `/products/auction/purchase/${auction_product_id}`,
    data:{},
    success: function (response) {
      const rows = response['data']
      const receiver = rows[1].name
      const phone = rows[1].phone
      const address = rows[1].address
      // const image
      const product_name = rows[0].product_name
      const product_content = rows[0].product_content
      const product_buy_now_price = rows[0].product_buy_now_price

      let temp_html = `
                        <h1>배송지 정보</h1>
                        <p>받는사람: ${receiver}</p>
                        <p>전화번호: ${phone}</p>
                        <p>주소: ${address}</p>
                        <h1>상품 정보</h1>
                        <p>상품이름: ${product_name}</p>
                        <p>상품내용: ${product_content}</p>
                        <p>즉시 구매 가격: ${product_buy_now_price}원</p>
                        <button onclick="purchase()">구매하기</button>
                        <button onclick="cancle()">구매취소</button> 
                      `

      $('#inform').append(temp_html)
    },
    error: function (error) {
      console.log(error);
  },
  })
}

function purchase() {
  if(!confirm('구매 하시겠습니까?')) {
    return
  } else {
    return // location.href = '메인페이지'
  }
}

function cancle() {
  if(!confirm('구매를 취소 하시겠습니까?')) {
    return
  } else {
    return history.back();
  }
}