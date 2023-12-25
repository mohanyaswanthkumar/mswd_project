import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {container,AppBar,ToolBar} from '@material-ui/core';
import Login from './Login';
import Registration from './Registration';
import Menu from './Menu';
import Profile from './Profile';
import Navigation1 from './Navigation';
import { Navigation } from '@mui/icons-material';
import MyOrders from './MyOrders';
import NearBy from './NearBy';
import TableBooking from './TableBooking';
import MyCart from './MyCart';
import Allusers from './Allusers';
import AllOrders from './AllOrders';
import ChangePassword from './ChangePassword';
import PlaceSelecting from './PlaceSelecting';
import AllTables from './AllTables'
function App({store}) {
  return (
    <div className="App">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login store={store} />}/>
    <Route path='/reg' element={<Registration />} />
    <Route path='/menu' element={<Menu />} />
    <Route path='/profile' element={<Profile store={store} />} />
    <Route path='/nav' element={<Navigation1 />} />
    <Route path='/track' element={<MyOrders />} />
    <Route path='/nearby' element={<NearBy />} />
    <Route path='/table' element={<TableBooking />} />
    <Route path='/cart' element={<MyCart />} />
    <Route path='/allusers' element={<Allusers />} />
    <Route path='/alltables' element={<AllTables />} />
    <Route path='/allorders' element={<AllOrders />} />
    <Route path='/changepass' element={<ChangePassword />} />
    <Route path='/locset' element={<PlaceSelecting />} />
  </Routes>
  </BrowserRouter>
  
    </div>
  );
}

export default App;
