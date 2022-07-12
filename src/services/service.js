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

    },

    isAble:(no)=>{

        return new Promise((resolve,reject)=>{

            axios.get('http://localhost:8089/sellers/'+no).then((res)=>{

                resolve(res.data.length)
  
          }).catch((err)=>{
  
              reject(err)
  
          })

        })

    },

    newAccount:(user)=>{

        return new Promise((resolve,reject)=>{

            axios.post('http://localhost:8089/sellers/',user).then((res)=>{

                localStorage.setItem('zomoto-user',JSON.stringify(res.data))

                console.log(res.data);

                resolve(res.data)

            }).catch((err)=>{

                reject(err)

            })

        })

    }

}

export default Services