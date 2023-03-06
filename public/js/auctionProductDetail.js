$(document).ready(function () {
  auctionProductDetail();
});

auction_product_id = location.pathname.split('/')[3];

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
          const raiting = rows.User.raiting
          // const image =
          const product_name = rows.product_name;
          // const product_content = rows.product_content;
          const product_buy_now_price = rows.product_buy_now_price;
          const category = rows.category;
          // const product_start =
          // const product_end =

          let temp_html = `
                    <p>등록자: ${seller}</p>
                    <p>등록자 별점: ${raiting}</p>
                    <p>상품이미지:</p>
                    <p>상품이름: ${product_name}</p>
                    <p>상품내용: </p>
                    <p>즉시 구매가: ${product_buy_now_price}</p>
                    <p>시작 가격:<p>
                    <p>현재 입찰가:</p>
                    <p>카테고리: ${category}</p>                    
                    <p>마감시간:</p>
                    <button onclick='cartBtn()'>즉시 구매하기</button>
                    <button>입찰하기</button>
                    `;
          $('#auction_product').append(temp_html);
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
      url: `/products/auction_report/${auction_product_id}`,
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