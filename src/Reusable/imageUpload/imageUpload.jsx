import React from "react";
import { useEffect } from "react";
import { useState,useRef } from "react";
import Services from "../../services";
import axios from 'axios'
import { Button } from "@mui/material";

const style={
  btnColor:{
    backgroundColor:'#cb202d',
    color:'white'
}
}


function ImageUpload(props){

  const [imageUrl,setImgUrl] = useState(null)

  const {imgUrl,img} = props

    const ref = useRef(null)

    const handleClick=()=>{
      ref.current.click()
    }

    const uploadImage=(e)=>{

      setImgUrl(e.target.files[0])

        console.log(e.target.files[0])

        Services.uploadImage(e.target.files[0]).then((res)=>{

          const u = res.replace('/public','')

          console.log(u);
          
          imgUrl(u)

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
          <Button onClick={handleClick} style={style.btnColor}>Upload Image</Button>
           <input type="file"
           name="file"
           value={imgUrl} 
           onChange={uploadImage}
           ref={ref}
           id="image" 
           accept="image/*"
           style={{display:'none'}}
           />
        </>
    )

}

export default ImageUpload