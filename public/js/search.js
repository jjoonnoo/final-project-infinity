getProducts(1);

function getProducts(page) {
    let url = `/`;
    let searchkeyword = document.getElementById('search').value;
    if (searchkeyword) {
        url = `/search/${searchkeyword}`;
    }
    axios
        .get(url, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { data } = response.data;

            const productList = document.getElementById('product-list');
            const pageList = document.getElementById('page-num');
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
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-box');
                temp.innerHTML = `
          <img class="product product-image" src="${data[i].image}" style="width: 250px;
            height: 250px;
            object-fit: cover;">
          <div class="product product-name">
            <h4>
            <div>${data[i].name}</div></h4>
          </div>
          <div class="product product-explanation">
            
            <div>${data[i].desc}</div>
          </div>
          <div class="product product-quantity">
            
            <div style="font-size:20%;">${data[i].stock}</div>
          </div>
          <div class="product product-participant">
            
            <div>${data[i].price}\\</div>
          </div>
          <div class="btn-group" style="margin-top: 2%;">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addorder(${data[i].productId})">장바구니 담기</button>
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
    axios
        .get(`/auctionProduct`, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { data } = response.data;

            const productList = document.getElementById('product-list');
            const pageList = document.getElementById('page-num');
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
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-box');
                temp.innerHTML = `
          <img class="product product-image" src="${data[i].image}" style="width: 250px;
            height: 250px;
            object-fit: cover;">
          <div class="product product-name">
            <h4>
            <div>${data[i].name}</div></h4>
          </div>
          <div class="product product-explanation">
            
            <div>${data[i].desc}</div>
          </div>
          <div class="product product-quantity">
            
            <div style="font-size:20%;">${data[i].stock}</div>
          </div>
          <div class="product product-participant">
            
            <div>${data[i].price}\\</div>
          </div>
          <div class="btn-group" style="margin-top: 2%;">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addorder(${data[i].productId})">장바구니 담기</button>
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
    axios
        .get(`/generalProduct`, { params: { page } })
        .then((response) => {
            let { totalPage } = response.data;
            let { data } = response.data;

            const productList = document.getElementById('product-list');
            const pageList = document.getElementById('page-num');
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
                const temp = document.createElement('div');
                temp.setAttribute('class', 'product-box');
                temp.innerHTML = `
          <img class="product product-image" src="${data[i].image}" style="width: 250px;
            height: 250px;
            object-fit: cover;">
          <div class="product product-name">
            <h4>
            <div>${data[i].name}</div></h4>
          </div>
          <div class="product product-explanation">
            
            <div>${data[i].desc}</div>
          </div>
          <div class="product product-quantity">
            
            <div style="font-size:20%;">${data[i].stock}</div>
          </div>
          <div class="product product-participant">
            
            <div>${data[i].price}\\</div>
          </div>
          <div class="btn-group" style="margin-top: 2%;">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addorder(${data[i].productId})">장바구니 담기</button>
          </div>
          `;
                productList.append(temp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
