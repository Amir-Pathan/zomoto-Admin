import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { zomotoUser } from '../redux'

function Header(){

    const [user,setUser] = useState({})

    const [no,setNo] = useState(0)

    const dispatch = useDispatch()

    const data =useSelector(state=>state.user)

    useEffect(()=>{
        dispatch(zomotoUser())
        setUser(data)
        console.log(data);
        setNo(1)
    },[no])

    return(
        <>
        <h1>{user.hotelName?user.hotelName:'no'}</h1>
        </>
    )

}

export default Header