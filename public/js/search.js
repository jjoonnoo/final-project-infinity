function searchProducts() {
    let searchkeyword = document.getElementById('searchkeyword').value;
    if (!searchkeyword) {
        return;
    }
    window.location.href = `/search/product?searchkeyword=${searchkeyword}`;
}
if (window.location.pathname === '/search/product') {
    getProducts(1);
}

function getProducts(page) {
    let searchkeyword = new URLSearchParams(window.location.search).get(
        'searchkeyword'
    );
    let url = `/api/search/product?searchkeyword=${searchkeyword}`;
    axios
        .get(url, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { dataAuction } = response.data;
            let { dataGeneral } = response.data;
            if (totalPage === 0) {
                alert('검색 결과가 없습니다.');
                window.location.replace(`/`);
            }

            const AuctionProductList = document.getElementById(
                'product-search-list'
            );
            const GeneralProductList = document.getElementById(
                'product-search_list'
            );

            const pageList = document.getElementById('page-search-num');
            pageList.innerHTML = '';
            AuctionProductList.innerHTML = '';
            GeneralProductList.innerHTML = '';

            for (let i = 1; i < totalPage + 1; i++) {
                if (i === page) {
                    pageList.innerHTML += `<li class="page-item active"><a class="page-link" onclick="getProducts(${i})" style="color: black; background-color: transparent; border-color: transparent;">${i}</a></li>`;
                } else {
                    pageList.innerHTML += `<li class="page-item"><a class="page-link" onclick="getProducts(${i})">${i}</a></li>`;
                }
            }

            for (let i = 0; i < dataAuction.length; i++) {
                let image = dataAuction[i]['Images.image_url'];
                if (image === null) {
                    image = '/img/BNS - MarkMaker Logo.png';
                }
                let price = '';
                if (dataAuction[i].product_buy_now_price !== null) {
                    price =
                        dataAuction[i].product_buy_now_price.toLocaleString() +
                        '원';
                } else {
                    price = ' * 경매로만 구입 가능합니다.';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `<div class="productone" style="cursor: pointer;" onclick="location.href='/auction/${dataAuction[i].auction_product_id}'">
              <img class="product product-image" src="${image}" style="width: 250px;
                height: 250px;
                object-fit: cover;">
              <div class="product product-name">
                <h4>
                <div>${dataAuction[i].product_name}</div></h4>
              </div>
              <div class="product product-explanation">
                
                <div>${dataAuction[i].product_content}</div>
              </div>
              
              <div class="product product-participant">
                
                <div>${price}</div>
              </div>
              </div>
              `;
                AuctionProductList.append(temp);
            }

            for (let i = 0; i < dataGeneral.length; i++) {
                let image = dataGeneral[i]['Images.image_url'];
                if (image === null) {
                    image = '/img/BNS - MarkMaker Logo.png';
                }
                let price =
                    dataGeneral[i].product_price.toLocaleString() + '원';
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `<div class="productone" style="cursor: pointer;" onclick="location.href='/general/${dataGeneral[i].general_product_id}'">
              <img class="product product-image" src="${image}" style="width: 250px;
                height: 250px;
                object-fit: cover;">
              <div class="product product-name">
                <h4>
                <div>${dataGeneral[i].product_name}</div></h4>
              </div>
              <div class="product product-explanation">
                
                <div>${dataGeneral[i].product_content}</div>
              </div>
              
              <div class="product product-participant">
                
                <div>${price}</div>
              </div>
              </div>
              `;
                GeneralProductList.append(temp);
            }
        })
        .catch((error) => {
            alert(error.responseJSON.message);
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
                if (image === null) {
                    image = src = '/img/BNS - MarkMaker Logo.png';
                }
                let price = '';
                if (data[i].product_buy_now_price !== null) {
                    price =
                        data[i].product_buy_now_price.toLocaleString() + '원';
                } else {
                    price = '--';
                }
                let update_price = '';
                if (data[i].product_update_price !== null) {
                    update_price =
                        data[i].product_update_price.toLocaleString() + '원';
                } else {
                    update_price = '--';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `<div class="productone" style="cursor: pointer;" onclick="location.href='/auction/${data[i].auction_product_id}'">
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
            <div>${price}</div>
          </div>
          </div>
          `;
                productList.append(temp);
            }
        })
        .catch((error) => {
            alert(error.responseJSON.message);
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
                if (image === null) {
                    image = src = '/img/BNS - MarkMaker Logo.png';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-ox');
                temp.innerHTML = `<div class="productone" style="cursor: pointer;" onclick="location.href='/general/${
                    data[i].general_product_id
                }'">
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
            
            <div>${data[i].product_price.toLocaleString() + '원'}</div>
          </div>
          </div>
          `;
                productList.append(temp);
            }
        })
        .catch((error) => {
            alert(error.responseJSON.message);
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
                if (image === null) {
                    image = src = '/img/BNS - MarkMaker Logo.png';
                }
                let price = '';
                if (data[i].product_buy_now_price !== null) {
                    price =
                        data[i].product_buy_now_price.toLocaleString() + '원';
                } else {
                    price = '--';
                }
                let update_price = '';
                if (data[i].product_update_price !== null) {
                    update_price =
                        data[i].product_update_price.toLocaleString() + '원';
                } else {
                    update_price = '--';
                }
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-box');
                if (i === 0) {
                    temp.setAttribute('style', 'display: block;');
                } else {
                    temp.setAttribute('style', 'display: none;');
                }
                temp.innerHTML = `<div style="cursor: pointer;" onclick="location.href='/auction/${
                    data[i].auction_product_id
                }'">
              <div class="product-box__image">
              <img class="product-image" src="${image}">
            </div>
            <div class="product-box__details">
              <h4 class="product-name">${data[i].product_name}</h4>
              <div class="product-content">${data[i].product_content}</div>
              <div class="product-participant">경매 시작가: <span>${
                  data[i].product_start_price.toLocaleString() + '원'
              }</span></div>
              <div class="product-participant">최근 경매가: <span>${update_price}</span></div>
              <div class="product-participant">즉시 구매가: <span>${price}</span></div>
            </div>
          </div>`;
                productList.append(temp);
            }

            const slideDuration = 2000;
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

                productList.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });

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
            alert(error.responseJSON.message);
        });
}

function autocompletes(event) {
    const query = event.target.value;

    if (query.length < 1) {
        document.getElementById('autocomplete-results').innerHTML = '';
        return;
    }

    searchRequest = fetch(`/api/search/autocomplete?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
            const results = data.data;
            if (results.length === 0) {
                document.getElementById('autocomplete-results').innerHTML =
                    "<div class='autocomplete-result'>검색 결과가 없습니다.</div>";
                return;
            }

            let html = '';
            for (let i = 0; i < results.length; i++) {
                const product_name = results[i].product_name;
                html += `<div class="autocomplete-result" onclick="selectAutocompleteResult('${product_name}')">${product_name}</div>`;
            }
            document.getElementById('autocomplete-results').innerHTML = html;
        })
        .catch((error) => alert(error.responseJSON.message));
}

function selectAutocompleteResult(product_name) {
    document.getElementById('searchkeyword').value = product_name;
    document.getElementById('autocomplete-results').innerHTML = '';
}

const socket = io();

const lastNotificationTime = document.cookie.replace(
    /(?:(?:^|.*;\s*)lastNotificationTime\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
);

// 현재 시간과 비교하여 10분 이상 지났으면 알림을 표시하고, 쿠키에 현재 시간을 저장하기
if (
    !lastNotificationTime ||
    new Date() - new Date(lastNotificationTime) >= 10 * 60 * 1000
) {
    // 알림을 표시하는 코드
    socket.on('connect', () => {
        console.log('connected to server');

        socket.on('products', (products) => {
            const now = new Date();
            const productEndSoon = products.filter((product) => {
                const end = new Date(product.product_end);
                const timeDiff = end - now;
                const minutesDiff = timeDiff / 1000 / 60;
                return minutesDiff >= 0 && minutesDiff <= 10;
            });
            const productNames = productEndSoon.map(
                (product) => product.product_name
            );
            const modalMessage = document.getElementById('modal-message');
            if (productNames.length > 0) {
                modalMessage.textContent = `${JSON.stringify(
                    productNames
                )} 상품이 경매 마감 10분 전입니다.`;
                $('#logModal').modal('show');
                setTimeout(function () {
                    $('#logModal').modal('hide');
                }, 3000);
            }
        });
    });

    // 현재 시간을 쿠키에 저장하기
    document.cookie = `lastNotificationTime=${new Date().toISOString()}; max-age=${
        10 * 60
    }`;
}
