import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
export default function Fetch() {
  const [userdetails, setUserDetails] = useState([]);
  const [userId, setUserId] = useState(null);
  const [checkerror,setCheckerror] = useState(false);
  const apilink = "https://reqres.in";
  const viewconsole = false;
  useEffect(() => {
    axios
      .get(`${apilink}/api/users`)
      .then((response) => {
        viewconsole && console.log(response);
        setUserDetails(response.data.data);
        viewconsole && console.log(userdetails);
      })
      .catch((error) => {
        viewconsole && console.log(error.message);
        alert(`${error}`);
        setCheckerror(true)
      });
     
  }, [userdetails,viewconsole]);

  function handleClick(id,user) {
    if (userId === id) {
      return setUserId(null);
    }
    setUserId(id);
    localStorage.setItem('userdetails',JSON.stringify(user))

  }
    if(checkerror){
        return(
            <h1>There is some error while viewing the page</h1>
        )
    }
  else if (userdetails.length === 0) {
    return <h1>THERE IS NO USER DETAILS</h1>;
  } 
  
  else {
    return (
      <div>
        {userdetails.map((user) => {
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
                <img src={avatar} alt="userprofile"></img>
                <br />
                First Name : {first_name}
                <br />
                <br />
                Last Name : {last_name}
                <br />
                <br />
                Email : {email}
                <br />
                <br />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
