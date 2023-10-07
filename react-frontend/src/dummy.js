import { useState } from "react";

function Dummy() {
  const [title, setTitle] = useState("Click");

  function handleButtonClick(userId, password){
    console.log(userId)
    console.log(password)
  }

  return (
    <div>
    <MyButton title={title} onClick={handleButtonClick}/> 
    </div>
  );
}


function MyButton({title,onClick}){
  const [userDict, setUserDict] = useState({});
  const userIdAttr =  'userId';
  const pwAttr =  'password';
  let anotherDict = {}

  function onInputChange(event){
    const { name, value } = event.target;
    anotherDict[name] = value  
    //console.log(anotherDict)

    // Update the userDict using the spread operator to ensure immutability
    setUserDict( userDict => 
      ({  //if we don't wrap in (), js can't differentiate between a block {statements} or object {s:'sd'}
        ...userDict,
        [name]: value,
      })
      
    );
    //console.log(userDict)
  }

  function dos(){
    console.log(anotherDict)
  }

  return (
    <>
    <input type="text" name={userIdAttr} onChange={onInputChange}/>
    <input type="password" name={pwAttr}/>
    <button type="Submit" onClick={dos}> {title} </button>
    </>
  )
}


export default App;
