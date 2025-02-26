import { useLocation, useNavigate } from "react-router-dom";
import {useEffect} from 'react'; 
function RefreshHandler({setAuthenticated}){
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(()=>{
      if(localStorage.getItem('jwt_token')){
        setAuthenticated(true);
        if(location.pathname==="/"||location.pathname==="/login"||location.pathname==="/signup"){
            navigate('/home',{replace:false}); 
        }
      }
   },[location,setAuthenticated,navigate]);  

return null; 
}

export default RefreshHandler; 