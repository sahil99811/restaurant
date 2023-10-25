var orders = [];
async function getAllorders(){
    await  axios.get('https://crudcrud.com/api/f32800ffdb39401dae31cd5bb4732876/orders').then((res)=>{
        console.log(res);
        orders=res.data;
        displayOrders();
    });
}
getAllorders();
async function addOrder() {
    const tableNo = document.getElementById("tableNo").value;
    console.log(tableNo);
    const dishName = document.getElementById("dishName").value;
    const price = document.getElementById("price").value;

    if (!tableNo || !dishName || !price) {
        alert("Please fill in all fields.");
        return;
    }

    const order = {
        table: tableNo,
        dishname: dishName,
        price: price
    };
    document.getElementById("dishName").value='';
    document.getElementById("price").value='';
    document.getElementById("tableNo").value='table1';
    await axios.post('https://crudcrud.com/api/f32800ffdb39401dae31cd5bb4732876/orders',order).then((res)=>{
        order._id=res.data._id;
        orders.push(order);
        displayOrders();
    }).catch((error)=>{
        console.error(error);
        alert("something went wrong plz try after sometime")
    })
   
}

async function deleteOrder(index) {
    const temp=orders[index]._id;
    console.log(temp);
    orders.splice(index, 1);
    await axios.delete(`https://crudcrud.com/api/f32800ffdb39401dae31cd5bb4732876/orders/${temp}`).then((res)=>{
        console.log("added succesfully");
        displayOrders();
     }).catch((error)=>{
        console.log("something went wrong");
     })
    
}
function displayOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
    orders.forEach((order, index) => {
        const orderCard = document.createElement("div");
        orderCard.className = "order-card";
        orderCard.innerHTML = `
            <h2>Table ${order.table}</h2>
            <p>Dish: ${order.dishname}</p>
            <p>Price: $${order.price}</p>
            <button onclick="deleteOrder(${index})">Delete</button>
        `;
        orderList.appendChild(orderCard);
    });
}