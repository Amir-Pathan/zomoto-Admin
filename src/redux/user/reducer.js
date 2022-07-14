import { GET_USER } from "../createAction";

const user ={}

const userReducer=(state=user,action)=>{
    console.log(action);
    switch(action.type){
        case GET_USER:
            console.log('hire2');
            return state=action.payLoad
        default :
        console.log('hire3');
             return state
    }
}

export default userReducer