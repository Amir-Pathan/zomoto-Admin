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

    },

    addCategory:(category)=>{

        return new Promise((resolve,reject)=>{
            axios.post(url+'categories/',category).then((res)=>{

                resolve(res.data)

            }).catch((err)=>{

                reject(err)

            })
        })

    },

    categories:()=>{
        
        return new Promise((resolve,reject)=>{

            axios.get(url+'categories/').then((res)=>{
                resolve(res.data)
            }).catch((err)=>{
                reject(err)
            })

        })

    },

    updateCategory:(category)=>{

        console.log(category);

        return new Promise((resolve,reject)=>{

            axios.put(url+'categories',category).then((res)=>{
                console.log('hire');
                resolve(res.data)
            }).catch((err)=>reject(err))

        })

    },

    addProduct:(product)=>{

        return new Promise((resolve,reject)=>{

            axios.post(url+'products/',product).then((res)=>{
                resolve(res.data)
            }).catch((err)=>{
                reject(err)
            })

        })

    },

    getProducts :(isZomoto,userId)=>{

        return new Promise((resolve,reject)=>{

            if(isZomoto){
                return
            }else{

                axios.get(url+'products/'+userId).then((res)=>{

                    resolve(res.data)

                }).catch((err)=>reject(err))
                
            }

        })

    },

    getProduct:(id)=>{

        return new Promise((resolve,reject)=>{
 
            axios.get(url+'products/product/'+id).then((res)=>{

                resolve(res.data[0])

            }).catch((err)=>{

                reject(err)

            })

        })

    },
    
    updateProduct:(product)=>{

        return new Promise((resolve,reject)=>{
            axios.put(url+'products/',product).then((res)=>{

                resolve(res.data)

            }).catch((err)=>reject(err))

        })

    }

}

export default Services