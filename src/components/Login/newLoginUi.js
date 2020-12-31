import React, {useState} from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './newLoginUi.scss'
function NewLoginUi({onOff, toggle}){

    const[newAccount, setNewAccount] = useState(false)

    console.log(onOff)
    return (
        <div className={`nLoginUi_Background ${onOff ? "":"hide"}`} onClick={(e)=>{e.target.classList.contains("nLoginUi_Background") && toggle(false)}}>
            
            <div className="nLoginUi_Container" >
            <HighlightOffIcon className="nLoginUi_closeButton" onClick={()=>toggle(false)}/>
                <div className="nLoginUi_UiContainer">
                    <input className="nLoginUi_username" placeholder="Username" type="text"/>
                    <input className="nLoginUi_password" placeholder="Password" type="password"/>
                    {newAccount && <input className="nLoginUi_password" placeholder="Password" type="password"/>}
                    <button className="nLoginUi_submit">Log In</button>
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