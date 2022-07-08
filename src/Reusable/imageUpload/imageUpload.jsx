import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Services from "../../services";
import axios from 'axios'


function ImageUpload(props){

    const [img,setImg] = useState(null)

    const [imgUrl,setImgUrl] = useState('')

    const uploadImage=(e)=>{

        console.log(e.target.files[0])

        Services.uploadImage(e.target.files[0]).then((res)=>{

          console.log(res);
          
         // setImgUrl('http://localhost:8089/'+e.target.files[0].na)

         /* axios.get('http://localhost:8089/imageUrl/'+e.target.files[0].name).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          })*/
        
        }).catch((err)=>console.log(err))

    }

    return(
        <>
          {
            imgUrl?
              <img src={imgUrl}/>
            :null
          }
           <input type="file" name="file" id="" value={img} onChange={uploadImage}/>
        </>
    )

}

export default ImageUpload