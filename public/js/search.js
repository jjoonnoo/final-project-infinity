function getProducts(page) {
    $('#product_list').empty();
    $('#product-list').empty();
    $('#page-num').empty();
    let url = `api/search/product`;
    let searchkeyword = document.getElementById('searchkeyword').value;
    if (searchkeyword) {
        url = `api/search/product/${searchkeyword}`;
    }
    axios
        .get(url, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { data } = response.data;
            if (totalPage === 0) {
                alert('검색 결과가 없습니다.');
                window.location.replace(`/`);
            }
            const productList = document.getElementById('product-search-list');
            const pageList = document.getElementById('page-search-num');
            pageList.innerHTML = '';
            productList.innerHTML = '';

            for (let i = 1; i < totalPage + 1; i++) {
                if (i === page) {
                    pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getProducts(${i})" style="color: black; background-color: transparent; border-color: transparent;">${i}</a></li>`;
                } else {
                    pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getProducts(${i})">${i}</a></li>`;
                }
            }

            for (let i = 0; i < data.length; i++) {
                let image = data[i]['Images.image_url'];
                let price =
                    data[i].product_buy_now_price ||
                    data[i].product_price ||
                    null;
                if (price === null) {
                    price = ' * 경매로만 구입 가능합니다. --';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `
                <img class="product product-image" src="${image}" style="width: 250px;
                  height: 250px;
                  object-fit: cover;">
                <div class="product product-name">
                  <h4>
                  <div>${data[i].product_name}</div></h4>
                </div>
                <div class="product product-explanation">
                  
                  <div>${data[i].product_content}</div>
                </div>
                
                <div class="product product-participant">
                  
                  <div>${price}\\</div>
                </div>
                <div class="btn-group" style="margin-top: 2%;">
                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="">자세히보기</button>
                </div>
                `;
                productList.append(temp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function getAuctionProducts(page) {
    $('#product_list').empty();
    axios
        .get(`/api/search/auctionProduct`, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { data } = response.data;

            const productList = document.getElementById('product-list');
            const pageList = document.getElementById('page-num');
            pageList.innerHTML = '';
            productList.innerHTML = '';

            for (let i = 1; i < totalPage + 1; i++) {
                if (i === page) {
                    pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getAuctionProducts(${i})" style="color: black; background-color: transparent; border-color: transparent;">${i}</a></li>`;
                } else {
                    pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getAuctionProducts(${i})">${i}</a></li>`;
                }
            }

            for (let i = 0; i < data.length; i++) {
                let image = data[i]['Images.image_url'];
                let price = data[i].product_buy_now_price;
                if (price === null) {
                    price = '--';
                }
                let update_price = data[i].product_update_price;
                if (update_price === null) {
                    update_price = '--';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `
          <img class="product product-image" src="${image}" style="width: 250px;
            height: 250px;
            object-fit: cover;">
          <div class="product product-name">
            <h4>
            <div>${data[i].product_name}</div></h4>
          </div>
          <div class="product product-explanation">
            
            <div>${data[i].product_content}</div>
          </div>
          <div class="product product-participant">
            경매 시작가
            <div>${data[i].product_start_price}\\</div>
          </div>
          <div class="product product-participant">
            최근 경매가
            <div>${update_price}\\</div>
          </div>
          <div class="product product-participant">
            즉시 구매가
            <div>${price}\\</div>
          </div>
          <div class="btn-group" style="margin-top: 2%;">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="">자세히보기</button>
          </div>
          `;
                productList.append(temp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function getGeneralProducts(page) {
    $('#product_list').empty();
    axios
        .get(`/api/search/generalProduct`, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { data } = response.data;

            const productList = document.getElementById('product-list');
            const pageList = document.getElementById('page-num');
            pageList.innerHTML = '';
            productList.innerHTML = '';

            for (let i = 1; i < totalPage + 1; i++) {
                if (i === page) {
                    pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getGeneralProducts(${i})" style="color: black; background-color: transparent; border-color: transparent;">${i}</a></li>`;
                } else {
                    pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getGeneralProducts(${i})">${i}</a></li>`;
                }
            }

            for (let i = 0; i < data.length; i++) {
                let image = data[i]['Images.image_url'];
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `
          <img class="product product-image" src="${image}" style="width: 250px;
            height: 250px;
            object-fit: cover;">
          <div class="product product-name">
            <h4>
            <div>${data[i].product_name}</div></h4>
          </div>
          <div class="product product-explanation">
            
            <div>${data[i].product_content}</div>
          </div>
          
          <div class="product product-participant">
            
            <div>${data[i].product_price}\\</div>
          </div>
          <div class="btn-group" style="margin-top: 2%;">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="">자세히보기</button>
          </div>
          `;
                productList.append(temp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function recommendProducts() {
    axios
        .get(`/api/search/recommendProducts`)
        .then((response) => {
            let { data } = response.data;

            const productList = document.getElementById(
                'recommend-Products-list'
            );

            productList.innerHTML = '';

            for (let i = 0; i < data.length; i++) {
                let image = data[i]['Images.image_url'];
                let price = data[i].product_buy_now_price;
                if (price === null) {
                    price = '--';
                }
                let update_price = data[i].product_update_price;
                if (update_price === null) {
                    update_price = '--';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-box');
                if (i === 0) {
                    temp.setAttribute('style', 'display: block;');
                } else {
                    temp.setAttribute('style', 'display: none;');
                }
                temp.innerHTML = `
              <div class="product-box__image">
              <img class="product-image" src="${image}">
            </div>
            <div class="product-box__details">
              <h4 class="product-name">${data[i].product_name}</h4>
              <div class="product-content">${data[i].product_content}</div>
              <div class="product-participant">경매 시작가: <span>${data[i].product_start_price}원</span></div>
              <div class="product-participant">최근 경매가: <span>${update_price}원</span></div>
              <div class="product-participant">즉시 구매가: <span>${price}원</span></div>
              <div class="product-box__button">
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="">자세히보기</button>
              </div>
            </div>
          `;
                productList.append(temp);
            }

            const slideDuration = 2000; // 각 슬라이드가 보여질 시간 (ms)
            if (data.length > 1) {
                let slideInterval = setInterval(() => {
                    const firstProduct = productList.children[0];
                    const productWidth = firstProduct.offsetWidth;
                    productList.style.transition = 'transform 0.5s ease-in-out';
                    productList.style.transform = `translateX(-${productWidth}px)`;
                    setTimeout(() => {
                        productList.appendChild(firstProduct);
                        const nextProduct = productList.children[0];
                        nextProduct.setAttribute('style', 'display: block;');
                        firstProduct.setAttribute('style', 'display: none;');
                        productList.style.transition = 'none';
                        productList.style.transform = 'translateX(0)';
                    }, 500);
                }, slideDuration);

                // 마우스가 추천 상품 리스트 위에 있을 경우 인터벌을 멈춤
                productList.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });

                // 마우스가 추천 상품 리스트 밖으로 나갈 경우 인터벌을 다시 시작
                productList.addEventListener('mouseleave', () => {
                    slideInterval = setInterval(() => {
                        const firstProduct = productList.children[0];
                        const productWidth = firstProduct.offsetWidth;
                        productList.style.transition =
                            'transform 0.5s ease-in-out';
                        productList.style.transform = `translateX(-${productWidth}px)`;
                        setTimeout(() => {
                            productList.appendChild(firstProduct);
                            const nextProduct = productList.children[0];
                            nextProduct.setAttribute(
                                'style',
                                'display: block;'
                            );
                            firstProduct.setAttribute(
                                'style',
                                'display: none;'
                            );
                            productList.style.transition = 'none';
                            productList.style.transform = 'translateX(0)';
                        }, 500);
                    }, slideDuration);
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
