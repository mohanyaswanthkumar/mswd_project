import Navigation from "./Navigation";
import { useState } from "react";
import Axios from 'axios';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Near from './near.png';
function NearBy(props)
{
    const [res,setRes]=useState(null);
    //const [place,setPlace]=useState(null);
    function displayrestaurents(event)
        {
            const data=new FormData(event.currentTarget);
            event.preventDefault();
            //setPlace(data.get("city"));
            console.log(data.get("city"));
            Axios.get("http://localhost:8081/nearby",{params:{city:data.get("place")}}).then((resp)=>{
            setRes(resp.data);
            console.log(res);
        })
        }
        if(res==null)
        {
            return(
                <div>
                   <Navigation />
                   <div style={{display:"inline-block"}}>
                   <div style={{float:"left"}}>
            <form onSubmit={displayrestaurents} style={{margin:"20px",paddingRight:"400px"}}>
                    <tr>
                        <td>Select Place</td>
                        <td> <select name='place'>
                        <option value="Guntur">Guntur</option>
                        <option value="Vijayawada">Vijayawada</option>
                            </select></td>
                    </tr>
                    <br></br>
                    <tr><input type="submit"/></tr>
            </form>
                </div>

                <div style={{backgroundImage:`url(${Near})`,backgroundRepeat:"no-repeat",width:"100%",height:"860px",float:"left",paddingLeft:"10px"}}>
                    
                    </div>
                   </div>
                  
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <Navigation />
                    <div style={{margin:"70px",backgroundImage:`url(${Near})`,backgroundRepeat:"no-repeat"}}>
            <form onSubmit={displayrestaurents}>
                    <tr>
                        <td><h2>Select Place</h2></td>
                        <td> <select name='place'>
        <option value="Guntur">Guntur</option>
        <option value="Vijayawada">Vijayawada</option>
      </select></td>
                    </tr>
                    <br></br>
                    <tr><input type="submit" value="Check Restaurents"/></tr>
            </form>
                </div>
                    <div>
                       <center>
                       <table border='2px'>
                            <tr>
                                <th>S.No</th>
                                <th>Restaurents</th>
                                <th>Get Directions</th>
                            </tr>
                            {res.map((iter,id)=>(
                                <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{iter.restaurent}</td>
                                    <td>To be Updated</td>
                                </tr>
                            ))}
                            
                        </table>
                       </center>
                    </div>
                </div>
            )
        }
    

}
export default NearBy;