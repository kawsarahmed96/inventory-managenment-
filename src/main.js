const productCreate = document.getElementById("product_create");
const addNewStock = document.getElementById("add_new_stock");
const msg = document.querySelector(".msg");
const btnClose = document.querySelector(".btn-close");
const productDataTable = document.querySelector(".productDataTable");

product_create.onsubmit = (e) => {
    e.preventDefault();
    const productData = new FormData(e.target);

    const product = Object.fromEntries(productData);

    // form validayion

    if (!product.title || !product.category || !product.price || !product.photo || !product.description || !product.sale_price) {
        msg.innerHTML = createAlert("Fields must be fill up");
    } else {
        sendDataLS("product", {
           ...product,
            id: createID(),
            CreatedAt: Date.now(),
           
        });
         msg.innerHTML = createAlert("Product create successfull");
         e.target.reset();
         btnClose.click()
    }

    // window.location.href = "shop.html";
};


const showAllProduct = () => {
    const oldData = getDataLS("product");
  

    let data = "";
    if (oldData) {
        oldData.map((item, index) => {
            data += `
                                  <tr>
                        <td><img src="${item.photo}" alt="${item.title}" /></td>
                        <td>${item.title}</td>
                        <td>${item.category}</td>
                        <td>${item.description}</td>
                        <td>${item.sale_price}</td>
                        <td>${item.price}</td>
                        <td>
                        <button type="button" onclick="addStock('${item.id}')" class="btn-success stock" data-bs-toggle="modal" data-bs-target="#add_stock">Add stock</button>
                        </td>
                        <td>
                            <button type="button" class="crud-btn"><i class="bi bi-eye"></i></button>
                            <button type="button" class="crud-btn"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="crud-btn"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
      `;
        });
    } else {
        data = `
        <tr>
            <td colspan="8" class="text-center text-danger ">No data found</td>
        </tr>
      `;
    }
    productDataTable.innerHTML = data;

    // window.location.href = "index.html";
};
showAllProduct();


const addStock = (id)=>{
 addNewStock.querySelector('input[name="id"]').value = id

}

addNewStock.onsubmit = (e)=>{
  e.preventDefault()
  
  const data = new FormData(e.target)
  const product = Object.fromEntries(data)
 

  if(!product.quantity || !product.color  || !product.size){
    return 0
  }else{

    const allProduct = JSON.parse(localStorage.getItem("product"))

   const updateData=  allProduct.map((item)=>{
      if(item.id==product.id){
        return {
          ...item,
          
            color:product.color,
            quantity:product.quantity,
            size:product.size
          
        }
      }else{
        return item
      }
    })
  
  localStorage.setItem("product",JSON.stringify(updateData))
  e.target.reset();
  btnClose.click()
   
  }
   
}