export const defaultState={
      username: null,
      password: null,
      recentMetaData: {},
      subscribers: {},
      subscribedTo: {},
      avatar:null     
    }


export function userData(state = defaultState, action){

    switch (action.type){
        case "LOGGED_IN":
            return action.payload
        default:
            return state 
    }    
    
}

export function videoData(state, action){

    switch (action.type){
        case "ALL_VIDEOS":
            return {...state,
                videos:action.payload}
        default:
            return state 
    }    
    
}