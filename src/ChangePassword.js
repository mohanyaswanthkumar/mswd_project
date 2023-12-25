import Axios from "axios";
import Navigation from "./Navigation";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import Avatara from './avatar.png';
function ChangePassword()
{
    const history=useNavigate();
    var [detail,setDetail]=useState({});
    Axios.get("http://localhost:8081/prof",null).then((res)=>{
    setDetail(res.data);
        })
    function updatepass(event)
    {
        var data=new  FormData(event.currentTarget);
        event.preventDefault();
        console.log(data);
        Axios.post("http://localhost:8081/newpass",{old:data.get('old'),new:data.get('new')}).then((res)=>{
            window.alert(res.data);
            history('/profile')
        })
    }
    return(
        <div>
            <Navigation/>
            <div>
            <div className="bleft">
                        <ul>
                        <li><img src={Avatara} alt="Pineapple" width="210" height="210" /></li>
                        <br></br>
                        <br></br>
                        <li><button onClick={()=>{
                          (<div>
                            <form>
                              <input type="file" name="pic" />
                            </form>
                          </div>)
                        }}>Edit Picture</button></li>
                        <br></br>
                        <br></br>
                        <li><h3>{detail.fname+" "+detail.lname}</h3></li>
                        <br></br>
                        <br></br>
                            <li><a href="/profile">Profile</a></li>
                            <br></br>
                            <br></br>
                            <li><a href="/changepass">Change Password</a></li>
                        </ul>
                    </div>
                    <div className="bright">
                    <h3>ChangePassword</h3>
            <form onSubmit={updatepass}>
                <table>
                    <tr>
                        <td>Old Password</td>
                        <td><input type="text" name="old"/></td>
                    </tr>
                    <br></br>
                    <tr>
                        <td>New Password</td>
                        <td><input type="text" name="new" /></td>
                    </tr>
                    <tr>
                        <input type="submit" value="Update Password"/>
                    </tr>
                </table>
            </form>
                    </div>
            </div>
            
        </div>
    )

}
export default ChangePassword;