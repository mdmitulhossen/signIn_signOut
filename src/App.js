import { initializeApp } from 'firebase/app';
import './App.css';
import firebaseConfig from './components/firebaseConfig/Firebase.config';
import { getAuth,signInWithPopup,GoogleAuthProvider,signOut } from "firebase/auth";
import { useState } from 'react';

const app=initializeApp(firebaseConfig);

function App() {
  const [user,setuser]=useState({
    isSignIn:false,
    name:'',
    email:'',
    photo:''
  })
  
  const auth = getAuth(app);

  //Sign In
  const handleSignIn = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then(res=>{
      const {displayName,email,photoURL}=res.user;
     const users={
      isSignIn:true,
      name:displayName,
      email:email,
      photo:photoURL
     };
     setuser(users)
      
    }).catch(err=>{
      console.log(err.massage)
    })
    
  }
  
  //SignOut
  const handleSignOut =()=>{
    signOut(auth).then(() => {
      setuser({
        isSignIn:false,
        name:'',
        email:'',
        photo:''
      })
    }).catch((error) => {
      console.log(error.massage)
    });
  }
  console.log(auth)
  return (
    <div className="App">
      {
        user.isSignIn?<button onClick={handleSignOut}>Sign Out</button>
        :<button onClick={handleSignIn}>Sign In</button>
      }
      
      {user.isSignIn &&
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
