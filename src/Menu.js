import './App.css';
import Navigation from './Navigation';
import { Button } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import React from 'react';
import Tiffens from './tiff.png';
import Veg from './veg.png';
import NonVeg from './nonveg.png';
import Hot from './hot.png';
import Cool from './cool.png';
import Bgmenu from './mbg.jpg';
import { useLocation } from 'react-router-dom';
function Menu()
{
    let location = useLocation();
    const [val,setVal]=useState(0);
   // const [typed,setTyped]=useState("No");
    const [mail,setMail]=useState(null);
    const [data,setData]=useState(null);
    const [role,setRole]=useState(null);
    Axios.get("http://localhost:8081/mail",null).then((resp)=>{
        setMail(resp.data);
    })
    Axios.get("http://localhost:8081/prof",null).then((resp)=>{
        setRole(resp.data.role);
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
    if(data==null)
    {
        return(
            <div>
                <Navigation/>
                <div style={{backgroundImage:`url(${Bgmenu})`,backgroundRepeat:"no-repeat",backgroundSize: "100%",backgroundPosition:"center"}}>
                    
                    <br></br>
                  <div >
                  <ul>
                    <li style={{display:'inline-block',padding:'40px'}}>
                        <div>
                        <img class="img" src={Tiffens} alt="Pineapple" width="250" height="250" />
                        <br></br>
                        <br></br>
                        <Button  variant="contained" color="success" onClick={()=>{
                            Axios.get("http://localhost:8081/items",{params:{itype:"Tiffens"}}).then((resp)=>{
                                setData(resp.data);
                                console.log(data);
                            })
                        }}>Tiffens</Button>
                        
                        </div>
                    </li>
                    <li style={{display:'inline-block',padding:'30px'}}>
                    <div>
                    
                        <img class="img" src={Veg} alt="Pineapple" width="250" height="250" />
                        <br></br>
                        <br></br>
                        <Button  variant="contained" color="success" onClick={()=>{
                            Axios.get("http://localhost:8081/items",{params:{itype:"Veg Meals"}}).then((resp)=>{
                                setData(resp.data);
                                console.log(data);
                            })
                        }}>Veg Meals</Button>
                        </div>
                    </li>
                    <li style={{display:'inline-block',padding:'30px'}}>
                    <div>
                        
                        <img class="img" src={NonVeg} alt="Pineapple" width="250" height="250" />
                        <br></br>
                        <br></br>
                        <Button  variant="contained" color="success" onClick={()=>{
                            Axios.get("http://localhost:8081/items",{params:{itype:"Non Veg"}}).then((resp)=>{
                                setData(resp.data);
                                console.log(data);
                            })
                        }}>Non Veg Meals</Button>
                        </div>
                    </li>
                  </ul>
                  </div>
                  <br></br>
                  <div>
                    <ul>
                    <li style={{display:'inline-block',padding:'30px'}}>
                    <div>
                    
                        <img class="img" src={Hot} alt="Pineapple" width="250" height="250" />
                        <br></br>
                        <br></br>
                        <Button  variant="contained" color="success" onClick={()=>{
                            Axios.get("http://localhost:8081/items",{params:{itype:"Hot Drinks"}}).then((resp)=>{
                                setData(resp.data);
                                console.log(data);
                            })
                        }}>Hot Drinks</Button>
                        </div>
                    </li>
                    <li style={{display:'inline-block',padding:'30px'}}>
                    <div>
                        
                        <img class="img" src={Cool} alt="Pineapple" width="250" height="250" />
                        <br></br>
                        <br></br>
                        <Button  variant="contained" color="success" onClick={()=>{
                            Axios.get("http://localhost:8081/items",{params:{itype:"Cool Drinks"}}).then((resp)=>{
                                setData(resp.data);
                                console.log(data);
                            })
                        }}>Cool Drinks</Button>
                        </div>
                    </li>
                    </ul>
                  </div>
                </div>
            </div>
        )
    }
    else
    {
        if(role=="admin")
        {
            return(
                <div className='App-menu'>
                    <Navigation/>
                    <br></br>
                    <div><h3 style={{float:'left' ,paddingLeft:'60px'}}><Button href="">Add Items</Button></h3></div>
                    <br></br>
                    <br></br>
                    <div >
                        <center>
                            <h2 className='menu-head'>Item name</h2>
                            <h2 className='menu-head'>Quantity</h2>
                        </center>
                        <br></br>
                       <div></div>
                    </div>
                    {data.map(iter=>(
                        
                         <div class="clearfix" >
                         <div className='floating'><img class="img" src={iter.itemimage} alt="Pineapple" width="210" height="210" /></div>
                         <div className='floating'>
                         <h4>{iter.itemname}</h4>
                         <h4>{iter.itemprice}</h4>
                         </div>
                         <div className='floating'>
                             Quantity
                             <form >
                             <Button onClick={decreaser}><h3>-</h3></Button>
                             <input type="number" value={val} placeholder="enter number" name="val" />
                             <Button onClick={increaser}><h3>+</h3></Button>
                             </form>
                             </div>
                         <div className='floating'>
                         <Button onClick={()=>{
                            Axios.post("http://localhost:8081/cartpost",{itemName:iter.itemname,itemImage:iter.itemimage,itemquantity:val,itemPrice:iter.itemprice,email:mail
          }).then((resp)=>{
            alert("Added to Cart Successfully "+mail);
          })
                         }}>Add to Cart</Button>
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
                         <div className='floating'>
                            <center>
                                Review
                            </center>
                            <input type='text' width="100%" height="20px"/>
                         </div>
                     </div>
                    ))}
                </div>
            )

        }
        else
        {
            return(
                <div className='App-menu'>
                    <Navigation/>
                
                    <div >
                        <center>
                            <h2 className='menu-head'>Item name</h2>
                            <h2 className='menu-head'>Quantity</h2>
                        </center>
                        <br></br>
                    </div>
                    {data.map(iter=>(
                        
                         <div class="clearfix" >
                         <div className='floating'><img class="img" src={iter.itemimage} alt="Pineapple" width="210" height="210" /></div>
                         <div className='floating'>
                         <h4>{iter.itemname}</h4>
                         <h4>{iter.itemprice}</h4>
                         </div>
                         <div className='floating'>
                             Quantity
                             <form >
                             <Button onClick={decreaser}><h3>-</h3></Button>
                             <input type="number" value={val} placeholder="enter number" name="val" />
                             <Button onClick={increaser}><h3>+</h3></Button>
                             </form>
                             </div>
                         <div className='floating'>
                         <Button onClick={()=>{
                            Axios.post("http://localhost:8081/cartpost",{itemName:iter.itemname,itemImage:iter.itemimage,itemquantity:val,itemPrice:iter.itemprice,email:mail
          }).then((resp)=>{
            alert("Added to Cart Successfully "+mail);
            console.log(iter);
          })
                         }}>Add to Cart</Button>
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
                         <div className='floating'>
                            <center>
                                Review
                            </center>
                            <input type='text' width="100%" height="20px"/>
                         </div>
                     </div>
                    ))}
                </div>
            )

        }


    }
    
}
export default Menu;