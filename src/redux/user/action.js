import { GET_USER } from "../createAction";

export function getUser(payLoad){
    return{
        type:GET_USER,
        payLoad:payLoad
    }
}

export function zomotoUser(){

    const user = localStorage.getItem('zomoto-user')

    const zmtUser = JSON.parse(user)||{}

    return dispatch=>{
        dispatch(getUser(zmtUser))
    }
}