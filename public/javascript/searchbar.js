function search_product() {
    let input = document.getElementById('searchbar').value ;
    input=input.toLowerCase(); 
    let product = document.getElementsByClassName('animals'); 

        const products = await productModel.find({ genre: req.params.genre, category: req.params.cat})
}