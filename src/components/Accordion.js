import axios from "axios";
import "../assets/Accordion.css";
import { useEffect,useState } from "react";
import usericon from  "../assets/usericon.png"
export default function Accordion(){
    const[userDetails,setUserDetails] = useState([]);
    const[userId,setUserId] = useState(null);
    const[checkError,setError] = useState(false)
    const{REACT_APP_DOMAIN_NAME} = process.env;
    const viewConsole = false;
    useEffect(()=> {
        axios.get(`${REACT_APP_DOMAIN_NAME}/api/users`)
        .then(response =>{
            viewConsole && console.log("response",response);
            viewConsole && console.log("response.data.data",response.data.data);
            setUserDetails(response.data.data);
            viewConsole && console.log("userDetails",userDetails);
        })
        .catch((error)=>{
            viewConsole && console.log("error",error.message);
            setError(true)
        })
    },[])
    viewConsole && console.log("userDetails",userDetails);

    function handleClick(id,user) {
        if (userId === id) {
          return setUserId(null);
        }
        setUserId(id);
        localStorage.setItem('userDetails',JSON.stringify(user))
    
    }
  
    return (
        <div>
          {checkError && <h1>There is some error while viewing the page</h1>}
          {((userDetails.length !== 0) && !checkError) ? 
          userDetails.map((user) => {
            const { id, first_name, last_name, email, avatar } = user;
            return (
              <div key={id}>
                <div className="accordion-title" onClick={() => handleClick(id,user)}>
                  {first_name}
                  <span
                    className={userId === id ? "uparrow" : "downarrow"}
                  ></span>
                </div>
  
                <div
                  className={
                    userId === id
                      ? "userDisplayDetails show"
                      : "userDisplayDetails"
                  }
                >
                  <img src={avatar || usericon} alt="userprofile"></img>
                  <div className = "displayDetails">
                  <label>First Name : {first_name}</label>
                
                  <label>Last Name : {last_name}</label>
                  
                  <label>Email : {email}</label>
                  </div>
                </div>
              </div>
            );
          }) : <h1>THERE IS NO USER DETAILS</h1> }
  
  
        </div>
  
      );
    }
  