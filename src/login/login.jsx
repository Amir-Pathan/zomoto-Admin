import React, { useState } from "react";
import { Grid,TextField,Button,Link } from "@mui/material";
import Services from "../services/service";
import AlertDialogSlide from "../Reusable/dialog";
import { useNavigate } from "react-router-dom";


const style={
    grid:{
        width:'60%',
        marginRight:'20%',
        gridGap:'10px',
        marginLeft:'15%',
        marginTop:'5%',
        border:'2px solid black',
        paddingLeft:'6%',
        paddingRight:'6%',
        paddingTop:'3%',
        paddingBottom:'6%',
        borderRadius:'15px',
        backgroundColor:'whiteSmoke'
    },
    btn:{
        marginTop:'10px',
        backgroundColor:'#cb202d',
        color:'white'
    },
    link:{
        textAlign:'center',
        marginTop:'5px',
        color:'red',
        textAlign:'center'
    }
}

function Login(){

    const [isOpen,setIsopen] = useState(false)
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    const navigate= useNavigate()

    const toCreateAccount=()=>navigate('/createAccount')

    const user = {
        no :'',
        password:''
    }

    const [details,setDetails] = useState(user)

    const handleChange=(e,k)=>{

        setDetails(prev=>({
            ...prev,
            [k]:e
        }))
    }

    const handleClose=()=>setIsopen(false)


    const login = ()=>{

         
        if(details.no.length===10&&details.password.length>7){

            Services.login(details.no,details.password).then((res)=>{

                console.log(res);
            }).catch((obj)=>{
                setIsopen(true)
                setTitle(obj.title)
                setContent(obj.content)
            })

        }else{

            setIsopen(true)
            setTitle('Invalid User No Password')
            setContent('Please Enter Valid User No Password')

        }

    }

    return(
        <>
        <div style={style.grid}>
        <h3 style={{textAlign:'center'}}>Login</h3>
          <Grid item container gap={'10px'}>
            <Grid item xs={12} md={12}>
                <TextField fullWidth size="small" label='No' type='number'
                value={details.no} onChange={(e)=>handleChange(e.target.value,'no')}/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField fullWidth size="small" type={'password'} label='Password'
                value={details.password} onChange={(e)=>handleChange(e.target.value,'password')}/>
            </Grid>
          </Grid>
          <Grid>
            <Button fullWidth style={style.btn} onClick={login}>Login</Button>
          </Grid>
          <Grid style={style.link}>
            <Link onClick={toCreateAccount}>Create Account</Link>
          </Grid>
          </div>
          <AlertDialogSlide isOpen={isOpen} title={title} content={content} close={handleClose}/>
        </>
    )
}

export default Login