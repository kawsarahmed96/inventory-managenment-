
const product_id = document.querySelector(".product_id");

// const msg = document.querySelector(".msg");
// const incomeExpenseDataList = document.querySelector("#incomeExpenseDataList");
// const incomeLink = document.querySelector('.incomeLink')

const showAllProduct = () => {
    const oldData = getDataLS("product");
    console.log(oldData);

    let data = "";
    if (oldData) {
        oldData.map((item, index) => {
            data += `
              <div class="product_body ">
                <img src="${item.photo}" alt="${item.title}" />
                <div class="product_content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="price">
                        Price: ${item.price} TK
                    </span>
                    <button type="button" class="btn btn-warning">Shop Now</button>
                </div>
            </div>
      `;
        });
    } else {
        data = `
        <tr>
            <td colspan="7" class="text-center text-danger ">No data found</td>
        </tr>
      `;
    }
    product_id.innerHTML = data;

    // window.location.href = "index.html";
};
showAllProduct();


