import React from "react";
import axios from "axios";


const Services ={

    uploadImage:(profileImg)=>{

        return new Promise((resolve,reject)=>{

            const formData =new FormData()

        formData.append('image',profileImg)

        console.log(formData.profileImg);

        console.log(profileImg)

        let img;

          axios.post('http://localhost:8089/imageUpload/',formData).then((res)=>{

             resolve(res.data.userCreated.profileImg)

          }).catch((err)=>{
               console.log(err)
               reject(err)
          })

          return img

        })

    }

}

export default Services