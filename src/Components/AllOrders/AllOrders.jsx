import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import EmptyCart from '../EmptyCart/EmptyCart';
import EmptyCartError from '../EmptyCartError/EmptyCartError';

export default function AllOrders({currentUser}) {
const [allOrder, setallOrder] = useState(null)

useEffect(()=>{
   getAllOrders()
},[])

const UserId = localStorage.getItem("currentUserId")
console.log(UserId);

    async function getAllOrders () {


try {
    const {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${UserId}`)
    setallOrder(data)
    
} catch (error) {
    console.log("error" , error);
}        
    }
return <> 
{allOrder?.length==0 ? <EmptyCartError/>  : ""}
{allOrder? <div className="container my-5 py-5">
{allOrder?.map((order,ind)=> <div className="row g-5 align-items-center border border-1 my-2 rounded-1" key={ind}>
<div className="col-md-3">
    <div className="inner-col">
        <p>Placed On: <span className='mx-2 fw-bolder'>{order.createdAt.slice(0, 10)}</span></p>
        <p>Total price: <span className='mx-2  fw-bolder'> {order.totalOrderPrice}</span> EGP</p>
        <span>Payment method : <span className='mx-2  fw-bolder'>{order.paymentMethodType}</span></span>

    </div>
</div>
{
    order.cartItems.map((item,spc)=> <div className="col-md-2 col-6" key={spc}>
    <div className="inner d-flex align-items-center">
        <div>
        <img src={item.product.imageCover} alt="" className='w-100 '/>
        </div>
        <div className='mx-2'>
            <h5 className='product'>{item.product.brand.name}</h5>
            <h5 className='p-item'>{item.product.title}</h5>
        </div>
    </div>
</div>)
}
</div>)}
</div> : <Loading/>}


</>
}
