import Navigation from "./Navigation";
import { Button } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Axios from 'axios';
function MyCart()
{
    const [val,setVal]=useState(0);
    const [data,setData]=useState({});
    const [cart,setCart]=useState(null);
    const [mail,setMail]=useState(null);
    const [cost,setCost]=useState(0);

    Axios.get("http://localhost:8081/cartget",null).then((resp)=>{
            setCart(resp.data);
            var s=0;
            for(var i=0;i<cart.length;i++)
            {
                s=s+(cart[i].itemquantity*cart[i].itemPrice);
            }
            setCost(s);
        })
        
    function decreaser()
    {
        var valu=val-1;
        setVal(valu);
    }
    function increaser()
    {
        var valu=val+1;
        setVal(valu);
    }
    function order()
    {
        
    }
    
    function updateaddress(event)
    {
        var datam=new  FormData(event.currentTarget);
        event.preventDefault();
        console.log(datam.get("address"));
        Axios.post('http://localhost:8081/updateaddr',{
            addr:datam.get("address"),
            email:mail,
        }).then((resp)=>{
            window.alert("Updated");
        })

    }
    function pay(event)
    {
        var datu=new  FormData(event.currentTarget);
        event.preventDefault();
    }
    if(cart==null)
    {
        return(
            <div>
                <Navigation/>
                <h3>Your Cart is Empty {mail}</h3>
            </div>
        )
    }
    Axios.get("http://localhost:8081/mail",null).then((resp)=>{
        setMail(resp.data);
    })
    Axios.get("http://localhost:8081/prof",null).then((res)=>{
    setData(res.data);
        })
    return(
        
        <div>
            <Navigation/>
            <div>
                <div className="leftcarty">
                    <h2><ShoppingCartIcon /> My Shopping Bag</h2>
                {cart.map(iter=>(
                 <div class="clearfi">
                 <div className='floating'><img class="img" src={iter.itemImage} alt="Pineapple" width="210" height="210" /></div>
                 <div className='floating'>
                 <h4>{iter.itemName}</h4>
                 <h4>{iter.itemPrice}</h4>
                 </div>
                 <div className='floating'>
                     Quantity
                     <form >
                     <Button onClick={decreaser}><h3>-</h3></Button>
                     <input type="number" defaultValue={iter.itemquantity} placeholder="enter number" name="val" />
                     <Button onClick={increaser}><h3>+</h3></Button>
                     </form>
                     </div>
                     <div className='floating'>
                 <Button onClick={()=>{
                    Axios.post('http://localhost:8081/remcart',{email:mail,iname:iter.itemName}).then((resp)=>{
                        window.alert("Removed from Cart Successfully"+resp.data.itemName);
                    })
                 }}>Remove Item</Button>
                 <br></br>
                 <br></br>
                 <div class="dropdown">
                 <Button>Place Order</Button>
                 <div class="dropdown-options">
                 <Button onClick={()=>{
                    Axios.post('http://localhost:8081/placeorder',{email:mail,payment:"Pending",iquantity:iter.itemquantity,price:iter.itemquantity*iter.itemPrice,iname:iter.itemName,deliverymode:"Online Delivery",status:"Not delivered"}).then((resp)=>{alert("added")})
                 }}><a href="#">Online Delivery</a></Button>
                 <Button onClick={()=>{
                    Axios.post('http://localhost:8081/placeorder',{email:mail,payment:"Pending",iquantity:iter.itemquantity,price:iter.itemquantity*iter.itemPrice,iname:iter.itemName,deliverymode:"Offline Delivery",status:"Not delivered"}).then((resp)=>{alert("added")})
                 }}><a href="#">Offline Table</a></Button>
                 </div>
                 </div>
                 </div>
             </div>
            ))}
                
          </div>

         <div className="rightcarty">
         <h2 className="">Total Price</h2>
                <div className="cartyprice">
                    <tr>
                        <td><h7>Do You Have Any Promo Code ?</h7></td>
                        <td><input type="text" placeholder="Apply Here..!" /></td>
                        <td><input type="submit" value="Apply"/></td>
                    </tr>
                    <br></br>
                    <hr></hr>
                    <tr>
                        <td><h4>Total Number of Items:-</h4></td>
                        <td style={{paddingLeft:'30px'}}><h4>{"  "+cart.length+"  "}Items</h4></td>    
                    </tr>
                    <hr></hr>
                    <tr>
                        <td><h4>Sub-Total Cost:-</h4></td>
                        <td style={{paddingLeft:'30px'}}><h4>${cost}/-Rs</h4></td>    
                    </tr>
                    
                    <tr>
                        <td><h4>Sales Tax:-</h4></td>
                        <td style={{paddingLeft:'30px'}}><h4>${cost/100*10}/-Rs</h4></td>    
                    </tr>
                    <hr></hr>
                    <tr>
                        <td><h4>Estimated Total Bill</h4></td>
                        <td style={{paddingLeft:'30px'}}><h4>${cost/100*10+cost}/-Rs</h4></td> 
                        <td style={{paddingLeft:'30px'}}><input type="submit" value="Pay Total"/></td>    
   
                    </tr>
                </div>
               
                </div>
            </div>
        </div>
    )

}
export default MyCart;