


export default function userData(state = {}, action){

    switch (action.type){
        case "LOGGED_IN":
            return action.payload
        default:
            return state 
    }    
    
}

export default function videoData(state = {}, action){

    switch (action.type){
        case "LOGGED_IN":
            return action.payload
        default:
            return state 
    }    
    
}