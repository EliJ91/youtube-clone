import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LOGGED_IN} from '../../redux/actions'
import {defaultState} from '../../redux/reducer'
import axios from 'axios'

const useHeaderLogic = () =>{
    const [uploadVideo, setUploadVideo] = useState(false)
    const [login, setLogin] = useState(false)
    const [mobileSearchMenu, setMobileSearchMenu]=useState(false)
    const dispatch = useDispatch()
    const [onOff, setOnOff] = useState(false)


    const loggedIn = useSelector(store=>store.username)
    const avatar = useSelector(store=>store.avatar)


    useEffect(()=>{
        async function fetchData(){
            const user = await axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/stayLogged",{}, {withCredentials: true}) 
            if(!user){
                console.log("Not logged in.")
            }
            dispatch(LOGGED_IN(user.data))       
        }
        fetchData()                       
    },[dispatch])

    function logout(e){
        e.preventDefault()
        dispatch(LOGGED_IN(defaultState))
        axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/logout",{},{withCredentials: true})
        
    }

    return {uploadVideo, setUploadVideo, login, logout, setLogin, mobileSearchMenu, setMobileSearchMenu, onOff, setOnOff, loggedIn, avatar}
}

export default useHeaderLogic;