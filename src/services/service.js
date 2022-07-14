import React from "react";
import axios from "axios";

const url ='http://localhost:8089/'


const Services ={

    uploadImage:(profileImg)=>{

        return new Promise((resolve,reject)=>{

            const formData =new FormData()

        formData.append('image',profileImg)

        console.log(formData.profileImg);

        console.log(profileImg)

        let img;

          axios.post(url+'imageUpload/',formData).then((res)=>{

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

            axios.get(url+'sellers/'+no).then((res)=>{

                resolve(res.data.length)
  
          }).catch((err)=>{
  
              reject(err)
  
          })

        })

    },

    newAccount:(user)=>{

        return new Promise((resolve,reject)=>{

            axios.post(url+'sellers/',user).then((res)=>{

                localStorage.setItem('zomoto-user',JSON.stringify(res.data))

                console.log(res.data);

                resolve(res.data)

                window.location.pathname='/'

            }).catch((err)=>{

                reject(err)

            })

        })

    },
    login:(no,password)=>{
    
         
        return new Promise((resolve,reject)=>{

            axios.get(url+'sellers/'+no).then((res)=>{

                if(res.data.length===0){

                    reject({
                        title:'User Not Found',
                        content:'Invalid User No this No is not found'
                    })

                }else{

                if(res.data[0].password===password){

                    localStorage.setItem('zomoto-user',JSON.stringify(res.data[0]))

                    window.location.pathname='/'

                    resolve(true)
                }else{
                    reject({
                        title:'Invalid User Password',
                        content:'The password is invalid please Enter Valid password'
                    })
                }
                }
  
          }).catch((err)=>{
  
              reject(err)
  
          })

        })

    }

}

export default Services