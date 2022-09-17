
let cartArray = [];

let productData = [];

let tempArray = [];

function fetchProduct() {
    fetch("products.json").then((res) => {
        return res.json();
    }).then(({ data }) => {
        productData = data;
        console.log(productData);

        let container = document.getElementsByClassName("container");

        for (let i = 0; i < productData.length; i++) {

            container[0].innerHTML += `
            
                    <h2 class = "mt-10">${productData[i].name}</h2>
                    <hr>
                    <div class="product-category-container">
                        ${productHnandle(productData[i].productList)}
                    </div>
                    
                    `
        }

        let cartBtn = [...document.getElementsByClassName("cart-btn")];
        let removeBtn = [...document.getElementsByClassName("remove-btn")];

        cartBtn.map((item,i)=>(
            item.addEventListener("click",(e)=>{
                let keyPresent = (arr,key) => {return arr.some(obj =>obj.hasOwnProperty(key))};
                    if(!keyPresent(cartArray,i)){
                        
                        console.log(item.parentElement.parentElement.children[0].children[0].innerText.split(":")[1] + " added to the cart");
                        item.innerHTML = " item succesfully add";
                        item.style.backgroundColor = "green";
                        removeBtn[i].style.backgroundColor = "red";
                        cartArray.push({[i]:item.parentElement.parentElement.children[0].children[0].innerText});
                        tempArray.push(i);
                        let string = JSON.stringify(cartArray)
                        
                        console.log("current list of product in cart is : "+string);
                    }
                
            })
        ))

        removeBtn.map((item,i)=>(
            
            item.addEventListener("click",(e)=>{
                let keyPresent = (arr,key) => {return arr.some(obj =>obj.hasOwnProperty(key))};
                
                if(cartArray.length!=0){
                    
                if(keyPresent(cartArray,i)){
                    cartBtn[i].innerHTML = " Add to cart";
                    cartBtn[i].style.backgroundColor = "blue";
                    removeBtn[i].style.backgroundColor = "blue";
                    console.log(item.parentElement.parentElement.children[0].children[0].innerText.split(":")[1] + " deleted to the cart");
                    let index = tempArray.indexOf(i,0);


                    cartArray.splice(index,1);
                    tempArray.splice(index,1);

                    let string = JSON.stringify(cartArray)
                    console.log("current list of product in cart is : "+string);
                }
            }
                 
            })
        ))

    })
}

const productHnandle = (product) => {
    let string = ``;
    for (let i = 0; i < product.length; i++) {
        string = string + `<div class="product-container mt-10">
            <div class="product-desc">
                <div class="product-name">name :${product[i].name}</div>
                <div class="product-price">price : ${product[i].price}</div>
            </div>
            <div class="product-category-container-btn">
                <button type = "button" class = "cart-btn" >Add to cart</button>
                <button type = "button" class ="remove-btn">remove to cart</button>
            </div>
        </div>`
    }
    return string;
}

fetchProduct()










