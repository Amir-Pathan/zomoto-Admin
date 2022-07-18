import { GET_USER } from "../createAction";

const user ={}

const userReducer=(state=user,action)=>{
    switch(action.type){
        case GET_USER:
            return state=action.payLoad
        default :
             return state
    }
}

export default userReducer