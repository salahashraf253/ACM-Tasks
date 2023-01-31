
function compareProductsWithPrice(product1:any,product2:any){
    //sort from low to high price
    return (product1.price > product2.price) ? 1 : (product1.price < product2.price) ? -1 : 0;
}
function compareProductsWithName(product1:any,product2:any){
    const name1 = product1.name.toUpperCase(); // ignore upper and lowercase
    const name2 = product2.name.toUpperCase(); // ignore upper and lowercase
    //sort A-Z
    return (name1 > name2) ? 1 : (name1 < name2) ? -1 : 0;
}
export function sortProducts(products:any,orderType:string){
    if(orderType=="name"){
        products.sort(compareProductsWithName);
    }
    else if(orderType=="price"){
        products.sort(compareProductsWithPrice);
    }
    return products;
}

