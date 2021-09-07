
import { useEffect, useState } from "react";
import axios from "axios";
const dataSet = [
    "http://www.mocky.io/v2/59b3f0b0100000e30b236b7e",
    "http://www.mocky.io/v2/59ac28a9100000ce0bf9c236",
    " http://www.mocky.io/v2/59ac293b100000d60bf9c239"
   ];



function useData(page){
   const [data,setData] = useState([]);
   const [error,setError] = useState(false);
   const [loading,setLoading] = useState(true);


   useEffect(()=>{
       axios.get(dataSet[page]).then((res)=>{
           
           setError(false);
           setLoading(false);

           setData(res.data.posts);
           


           let items = localStorage.getItem("localkey");
           let newArray = [];
           if(items){
            newArray = JSON.parse(items);
           }
        
           localStorage.setItem("localKey",JSON.stringify(newArray.concat(res.data.posts)));

        
       }).catch(()=>{
           setError(true);
           setLoading(false);
       })
   },[page])
   

   return {data,error,loading};
}

export {useData};