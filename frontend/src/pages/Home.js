import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';

function Home(){
    const navigate = useNavigate();
    const [products,setProducts] = useState([]); 
    const handleOnClick = ()=>{
       localStorage.removeItem('name');
       localStorage.removeItem('jwt_token');
       localStorage.removeItem('isLogedIn');
       localStorage.removeItem('email');  
       handleSuccess("User Logout successfully");  
       setTimeout(()=>{
        navigate("/login");
       },1000); 
    }
   
    const fetchProducts = async ()=>{
        const headers = {
           headers:{
            "Authorization":localStorage.getItem('jwt_token')
           }
        }
        try {
            const url = 'http://localhost:8080/products';
        const response = await fetch(url,headers);
        const products = await response.json();
        setProducts(products);
        } catch (error) {
             handleError(error);
        }
    }

    useEffect(()=>{
    fetchProducts();
    },[]);


    return (<div>
        <h1>Welcome : {localStorage.getItem('name')}</h1>
         <button onClick={handleOnClick} >Logout</button>
         <h1>Product List</h1>
         <ul>
           {
            products.map((product,index)=>{
              return <li key={index} >{product.name}</li>
            })
           }
         </ul>
         <ToastContainer/>
    </div>)
}


export default Home; 