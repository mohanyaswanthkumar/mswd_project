import Axios from "axios";
import { useState } from "react";
import Navigation from "./Navigation";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableBooking from "./TableBooking";
function PlaceSelecting()
{
    const [place, setPlace] = useState(null);
    const [rests,setRests]=useState(null);
    const [rest,setRest]=useState(null);
    const history=useNavigate();
    function placeset(event)
    {
        const data=new FormData(event.currentTarget);
        event.preventDefault();
        setPlace(data.get("place"));
        Axios.get("http://localhost:8081/nearby",{params:{city:data.get('place')}}).then((resp)=>{
            console.log(place)
            setRests(resp.data);
            console.log(rests);
        })
    }
    
    if((place==null)&&(rests==null))
    {
        return(
            <div>
                <div><Navigation /></div>
                <div style={{margin:"70px"}}>
            <form onSubmit={placeset}>
                <table style={{backgroundColor:"Window"}}>
                    <tr>
                        <td>Select Place</td>
                        <td> <select name='place'>
        <option value="Guntur">Guntur</option>
        <option value="Vijayawada">Vijayawada</option>
      </select></td>
                    </tr>
                    <br></br>
                    <tr><input type="submit"/></tr>
                </table>
            </form>
                </div>
            </div>
        )
    
    }
    else if(rests!=null)
    {
        return(
            <div>
                <div><Navigation /></div>
                <div>
                       <center>
                       <table border='2px'>
                            <tr>
                                <th>S.No</th>
                                <th>Restaurents</th>
                                <th>Get Directions</th>
                            </tr>
                            {rests.map((iter,id)=>(
                                <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{iter.restaurent}</td>
                                    <td><button onClick={(()=>{
                                        Axios.post('http://localhost:8081/restaurent',{restaurent:iter.restaurent})
                                        setRest(iter.restaurent);
                                        history('/table',{state:{restaurent:rest}})
                                    })}>Select</button></td>
                                </tr>
                            ))}
                            
                        </table>
                       </center>
                    </div>
            </div>
        )
    }
   
   
}
export default PlaceSelecting;