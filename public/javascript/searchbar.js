let searchBar = document.getElementById("search-bar");
let searchBtn = document.getElementById("search-button");

async function searchProduct() {
    let input = document.getElementById('search-bar').value ;
    console.log("the input is >>>", input);
    input=input.toLowerCase(); 
const products = await productModel.insertMany();
    console.log("here is the list of products >>>", products);

for (let i=0; i<products.length; i++) {
    if(products[i].name.includes(input)) {
        console.log("here are the search results >>>>", products[i]);
    }
}
}

searchBtn.onclick = searchProduct; 