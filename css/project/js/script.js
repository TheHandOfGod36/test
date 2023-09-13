let body = document.getElementsByClassName("body")[0];
let app = document.getElementsByClassName("app")[0];
let shop = document.getElementsByClassName("shop")[0];
let dataPrice = document.getElementsByClassName("data__price")[0];
let deleteBtn = document.getElementsByClassName("data__button")[0];
let isBuy = false;
let valute = "$";
let amountPlace = 1200;
let myProducts = [];
let itemBoughtPhoto = 'url("img/grass.jpeg")';
let w = 4;
let h = 3;
let i = 0;
let j = 0;
let el = undefined;
let itemBuying = "";
let currentIncomeSum = 0;
let incomeTime = 1;
let incomeSum = 0;
let itemBought = JSON.parse(localStorage.getItem("items"));
let shopBtn = document.getElementsByClassName("data__shop")[0];
let shopClose = document.getElementsByClassName("shop__close")[0];




shopBtn.addEventListener("click", function () {
  shop.style.display = "block";
  shopClose.style.display = "flex";
});

shopClose.addEventListener("click", function () {
  shop.style.display = "none";
  shop.style.textContent = "Магазин";
  shopClose.style.display = "none";
});

function saveBalance() {
  localStorage.setItem("balance", dataPrice.textContent);
}

setInterval(function income() {
  dataPrice.textContent = Number(dataPrice.textContent) + incomeSum;
  saveBalance();
}, incomeTime * 1000);

class Create {
  constructor() {}

  map(cells) {
    for (let i = 0; i < cells; i++) {
      let newBlock = document.createElement("div");
      newBlock.classList.add("block");
      newBlock.classList.add("block-" + i);
      app.appendChild(newBlock);

      newBlock.addEventListener("mouseover", function () {

        for (let i = 0; i < document.getElementsByClassName("block").length; i++) {
        // debugger;

          if (!document.getElementsByClassName("block")[i].classList.contains("busy"))
            document.getElementsByClassName("block")[i].style.background =
              "url(img/grass.jpeg)";
            document.getElementsByClassName("block")[i].style.backgroundSize ='cover'
        }


        if (isBuy == true && !newBlock.classList.contains("busy")) {




          // console.log(4);

          // newBlock.style.backgroundImage = itemBoughtPhoto;
          console.log(itemBuying);
          for (let j = 0; j < products.length; j++) {
            if (products[j].id === itemBuying) {
              console.log(products[j]);
              if (products[j].size != undefined) {
                // alert(100)

                newBlock.style.background =
                  itemBoughtPhoto + ", url(img/grass.jpeg)";
                newBlock.style.backgroundSize = 100 * products[j].size[0] + "%";
                el = document.getElementsByClassName("block");

                let numbers = [1, 2, 3, 15, 16, 17, 18, 30, 31, 32, 33];
                let color;

                for (let n = 0; n < numbers.length; n++) {
                  if (el[i + numbers[n]].classList.contains("busy")) {
                    console.log(el[i + numbers[n]].classList);
                    color = "red";
                  }
                }
                console.log(color)

                if (color === "red") {
                  for (let n = 0; n < numbers.length; n++) {
                      // el[i + numbers[n]].style.filter = 'hue-rotate(270deg)'
                  }
                }

                else {

               showBigElement(el, i, j);
                }
              } else {
                newBlock.style.background =
                  itemBoughtPhoto + ", url(img/grass.jpeg)  0% 0% / cover";
                // url("img/doggy.png") 0% 0% / cover, url("img/grass.jpeg") 0% 0% / cover
                newBlock.style.background =
                  itemBoughtPhoto + ", url(img/grass.jpeg)";
                newBlock.style.backgroundSize = "cover";
              }
            }
          }
          // if () {

          // }
        }
      });

      newBlock.addEventListener("mouseout", function () {
        if (isBuy == true && !newBlock.classList.contains("busy")) {
          // console.log(4);

          newBlock.style.background = 'url("img/grass.jpeg")';
          newBlock.style.backgroundSize = "cover";
        }
      });

      newBlock.addEventListener("click", function () {
        if (isBuy == true && !newBlock.classList.contains("busy")) {
          isBuy = false;
        }

        
        document.getElementsByClassName("block")[i + 1].classList.add("busy");
        document
        .getElementsByClassName("block")
        [i + 1].classList.add("busy-" + itemBuying);
        
        newBlock.classList.add("busy");
        
        
        newBlock.classList.add("busy-" + itemBuying);
        newBlock.classList.add("busy-" + itemBuying);
        showBigElement(el, i, j, true);
        gameSave();

        if (currentIncomeSum != undefined) {
          incomeSum += currentIncomeSum;
        }

      });
    }
  }
}

let newCreate = new Create();
newCreate.map(amountPlace);
// newCreate.map(5000);

class Shop {
  constructor() {}

  showProducts() {
    for (let i = 0; i < products.length; i++) {
      shop.innerHTML += `

                <div class="shop-item all ${products[i].type}">
                <img class="shop-item__img type-${products[i].type}" src="${products[i].img}" alt="">
                <div>
                    <h3 class="shop-item__title">${products[i].title}</h3>
                    <h5 class="shop-item__price">${products[i].price}${valute}</h5>
                    <button class="shop-item__buy">Купити</button>
                </div>
                </div>
                `;
    }
  }
}

let user = new Shop();
user.showProducts();

let shopCategoriesItem = document.getElementsByClassName(
  "shop-categories__item"
);

for (let i = 0; i < shopCategoriesItem.length; i++) {
  shopCategoriesItem[i].addEventListener("click", function () {
    let shopItem = document.getElementsByClassName("shop-item");

    console.log(shopItem);
    for (let i = 0; i < shopItem.length; i++) {
      shopItem[i].style.display = "none";
    }

    document
      .querySelector(".shop-categories__item.active")
      .classList.remove("active");
    shopCategoriesItem[i].classList.add("active");
    loadProducts(shopCategoriesItem[i].dataset.type);
  });
}

function loadProducts(type) {
  let productsEl = document.getElementsByClassName("shop-item");

  //  alert(type); // workers
  for (let i = 0; i < productsEl.length; i++) {
    if (productsEl[i].classList.contains(type)) {
      productsEl[i].style.display = "flex";
    }
  }
}

function moneyTransfer(price, title, idProduct, photo, income, width, height) {
  if (dataPrice.textContent >= price) {
    dataPrice.textContent -= price;
    myProducts.push(title);
    // alert(myProducts);

    isBuy = true;
    putBoughtElements(photo);
    currentIncomeSum = income;
    itemBuying = idProduct;
    w = width;
    h = height;
  } else {
    alert("Недостатньо коштів");
  }
}

// При клікі на кнопку купити
let shopItemBuy = document.getElementsByClassName("shop-item__buy");
for (let i = 0; i < products.length; i++) {
  shopItemBuy[i].addEventListener("click", function () {
    if (isBuy == true) {
      alert("Поставте елемент на вільну ділянку");
    } else {
      console.log(products);

      itemBoughtPhoto = `url(${products[i].img})`;

      moneyTransfer(
        products[i].price,
        products[i].title,
        products[i].id,
        products[i].photo,
        products[i].income,
        products[i].size[0],
        products[i].size[1]
      );
    }
  });
}


function showPreviewElements(photo) {
  for (let i = 0; i < block.length; i++) {}
  newBlock.style.backgroundImage = `url(C:/Users/User/Desktop/internetStore/css/project/img/${photo})`;
  newBlock.style.backgroundColor = `red`;
  newBlock.style.backgroundSize = "100%";
}

function putBoughtElements(photo) {
}

function gameSave() {
  itemBought = [];
  let block = document.getElementsByClassName("block");
  try {
    for (let i = 0; block.length; i++) {
      if (block[i].classList.contains("busy")) {
        let data = {
          serialNumber: block[i].classList[1].slice(6),
          itemNumber: block[i].classList[3].slice(5),
        };
        itemBought.push(data);
        console.log(itemBought);
        localStorage.setItem("items", JSON.stringify(itemBought));
      }
    }
  } catch (e) {}
}

function showItemBought() {
  let result = localStorage.getItem("items");
  result = JSON.parse(result);

  for (let i = 0; i < result.length; i++) {
    let photo;
    for (let j = 0; j < products.length; j++) {
      if (products[j].id == result[i].itemNumber) {
        photo = products[j].img;
        try {
          incomeSum += products[j]?.income;
        } catch (e) {}
      }
    }

    function showBalance() {
      dataPrice.textContent = localStorage.getItem("balance");
    }

    showBalance();

    document
      .getElementsByClassName(`block-${result[i].serialNumber}`)[0]
      .classList.add("busy");
    document
      .getElementsByClassName(`block-${result[i].serialNumber}`)[0]
      .classList.add("busy-" + result[i].itemNumber);
    document.getElementsByClassName(
      `block-${result[i].serialNumber}`
    )[0].style.background = `url("${photo}") 0% 0% / cover, url("img/grass.jpeg")  0% 0% / cover`;
  }
}

showItemBought();

deleteBtn.addEventListener("click", function () {
  localStorage.setItem("items", "[]");
  location.reload()
});

function showBigElement(el, i, j, isBusy) {
  console.log(el, i, j)
  // i - current posititon first block

  let counter = 0;
  let positionHeight = 0;
  for (let p = 0; p < w * h; p++) {
    if (p > 1 && p % 4 == 0) {
      counter += 11;
      positionHeight++;
    }
    el[i + p + counter].style.background =
    itemBoughtPhoto + ", url(img/grass.jpeg)";
    el[i + p + counter].style.backgroundSize = 100 * products[j].size[0] + "%";
    el[i + p + counter].style.backgroundPositionX = (100 / (w - 1)) * p + "%";
    el[i + p + counter].style.backgroundPositionY =
    (100 / (h - 1)) * positionHeight + "%";
    if (isBusy) {
       el[i + p + counter].classList.add("busy")
        el[i + p + counter].classList.add("busy-" + itemBuying);
      }
  }

}
