import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { zomotoUser } from '../redux'
import { AppBar,Box,Toolbar,Button,Typography,IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'

const style={
    appBar:{
        backgroundColor:'white',
        color:'black',
    },
    hotelName:{
        color:'#cb202d',
        fontWeight:'bold'
    },
    active:{
      borderBottom:"3px solid #cb202d"
    }
}

function Header(){

    const [user,setUser] = useState({})

    const [no,setNo] = useState(0)

    const [path,setPath] = useState('')

    const dispatch = useDispatch()

    const data =useSelector(state=>state.user)

    const navigate=useNavigate()

    const toCategories=()=>{
      navigate('/categories')
      setPath(window.location.pathname)
    }

    const toProduct=(path)=>{
      navigate(path)
      setPath(window.location.pathname)
    }

    useEffect(()=>{
        dispatch(zomotoUser())
        setUser(data)
        setPath(window.location.pathname)
        setNo(1)
    },[no])

    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={style.appBar}>
           <Toolbar> 
            <Box sx={{ flexGrow: 1,display:'flex',flexDirection:'row' }}> 
             <Typography variant="h6" component="div" style={style.hotelName}>
               {user.hotelName}
             </Typography>
              <Button color='inherit' onClick={toCategories}
              style={path==='/categories'?style.active:null}
              >Category</Button>
              <Button color='inherit'
              style={path==='/product/'+user._id?style.active:null}
              onClick={()=>toProduct('/product/'+user._id)}
              >
                Products</Button>
              <Button color='inherit'
              onClick={()=>toProduct('/orders')}
              style={path==='/orders'?style.active:null}
              >Orders</Button>
              {
                user.no==='7741943487'?
                <>
                  <Button color='inherit'>Customers</Button>
                  <Button color='inherit'>Sellers</Button>
                </>
                :null
              }
            </Box>
              <IconButton>
                <LogoutIcon/>
              </IconButton>
             </Toolbar>
          </AppBar>
         </Box>
        </>
    )

}

export default Header