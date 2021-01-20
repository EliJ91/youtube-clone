
import {useState} from 'react'
const useSidebar = () =>{
    const [type, setType]=useState("test")
    return {type,setType}
}
export default useSidebar;