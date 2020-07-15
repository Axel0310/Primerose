let searchBar = document.getElementById("search-bar");
let searchBtn = document.getElementById("search-button");

searchBtn.onclick = console.log("the search btn was clicked yay!");

function search_product() {
    let input = document.getElementById('search-bar').value ;
    input=input.toLowerCase(); 
const products = await productModel.insertMany();
for (let i=0; i<products.length; i++) {
    if(products[i].name.includes(input)) {
        console.log("here are the search results >>>>", products[i]);
    }
}
}