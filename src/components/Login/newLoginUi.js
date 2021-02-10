import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './newLoginUi.scss'
import useLoginInterface from './loginLogic';
import {useSelector} from 'react-redux';


function NewLoginUi({onOff, toggle}){
    const {
        username, setUsername,
        password, setPassword,
        password2, setPassword2,
        avatarImg, setAvatarImg,
        createNew, setCreateNew,
        login,
        newAccount} = useLoginInterface(toggle)


        const store = useSelector(store=>store)
  
    return (
        <div className={`nLoginUi_Background ${onOff ? "":"hide"}`} onClick={(e)=>{e.target.classList.contains("nLoginUi_Background") && toggle(false)}}>
            
            <div className="nLoginUi_Container" >
            <HighlightOffIcon className="nLoginUi_closeButton" onClick={()=>toggle(false)}/>
                <div className="nLoginUi_UiContainer">
                    <input className="nLoginUi_username" placeholder="Username" type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                    <input className="nLoginUi_password" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    {createNew && <><input className="nLoginUi_password" placeholder="Password" type="password" value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
                    <input className="nLoginUi_password" placeholder="Image URL" type="text" value={avatarImg} onChange={(e)=>{setAvatarImg(e.target.value)}}/>
                    </>}
                    {createNew ? <button className="nLoginUi_submit"  onClick={()=> newAccount(username,password,password2)}>Create Account</button>:
                    <button className="nLoginUi_submit"  onClick={()=> login(username,password)}>Log In</button> 
                    }
                </div>
                {createNew ? 
                <p className="nLoginUi_createAccount" onClick={()=>setCreateNew(false)} >Have an account?</p>
                :<p className="nLoginUi_createAccount" onClick={()=>setCreateNew(true)}>Need an account?</p>
                }
                <button onClick={()=>{console.log(store)}}>test</button>
            </div>
        </div>
    );
};

export default NewLoginUi;