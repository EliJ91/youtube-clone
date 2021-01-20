import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {LOGGED_IN} from '../../redux/actions'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './newLoginUi.scss'
import {login} from './loginLogic'
function NewLoginUi({onOff, toggle}){
    const dispatch= useDispatch()

    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")
    const [password2, setPassword2] =useState("")
    const [avatarImg, setAvatarImg] =useState("")

    const [createAccount, setCreateAccount]=useState(false)
    const [accountCreated, setAccountCreated]=useState(false)

    const[newAccount, setNewAccount] = useState(false)

    function log_in(username,password){
        let user = login(username,password)
        console.log(user)
        dispatch(LOGGED_IN(user))
        
    }
  
    return (
        <div className={`nLoginUi_Background ${onOff ? "":"hide"}`} onClick={(e)=>{e.target.classList.contains("nLoginUi_Background") && toggle(false)}}>
            
            <div className="nLoginUi_Container" >
            <HighlightOffIcon className="nLoginUi_closeButton" onClick={()=>toggle(false)}/>
                <div className="nLoginUi_UiContainer">
                    <input className="nLoginUi_username" placeholder="Username" type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                    <input className="nLoginUi_password" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    {newAccount && <input className="nLoginUi_password" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword2(e.target.value)}}/>}
                    <button className="nLoginUi_submit"  onClick={()=> log_in(username,password)}>{newAccount ?  "Create Account" : "Log In"}</button>
                </div>
                {newAccount ? 
                <p className="nLoginUi_createAccount" onClick={()=>setNewAccount(false)} >Have an account?</p>
                :<p className="nLoginUi_createAccount" onClick={()=>setNewAccount(true)}>Need an account?</p>
                }
            </div>
        </div>
    );
};

export default NewLoginUi;