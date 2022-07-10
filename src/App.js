import { initializeApp } from 'firebase/app';
import './App.css';
import firebaseConfig from './components/firebaseConfig/Firebase.config';
import { getAuth,signInWithPopup,GoogleAuthProvider,signInWithEmailAndPassword, signOut,FacebookAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

const app=initializeApp(firebaseConfig);

function App() {
  const [user,setuser]=useState({
    isSignIn:false,
    name:'',
    email:'',
    photo:''
  });

  const [mail,setMail]=useState('');
  const [pass,setPass]=useState('');
  const [displayName,setDisplayName]=useState('');
  
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

  //SignIn using Facebook
   const handleFbSignIn=()=>{
    const provider= new FacebookAuthProvider();

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

    console.log(res.user)
      
    }).catch(err=>{
      console.log(err.massage)
    })
   }

  //Handle Email Password Login
  
  const changeInput =(e)=>{
    
    if(e.target.name==="text"){
      setDisplayName(e.target.value)
    }
    else if(e.target.name==="password"){
          console.log("Password ",e.target.value)
          let r = new RegExp('(?=.*[0-9])');
          // console.log(r.test(e.target.value))
          // console.log(e.target.value.length)

          if(!r.test(e.target.value) && e.target.value.length<8 && !(e.target.value==='')){
            alert('Enter valid Password!!')
          }
           setPass(e.target.value)
    }
    else if(e.target.name==="email"){
          //console.log("Email ",e.target.value)
          let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
          //console.log(regex.test(e.target.value))
          if(!regex.test(e.target.value) && !(e.target.value==='')){
            alert('Enter Valid Email!!')
          }

           setMail( e.target.value)

    }
    e.preventDefault()
    
  }


 // console.log(mail,pass)
  

  

  // //Handle email password logIn
  const handleEmailPassLogIn = ()=>{
    console.log("login Click")
        createUserWithEmailAndPassword(auth,mail,pass)
        .then(res => {
          // Signed in 
          //console.log(res.user)
         alert('Create Successfully');
          // ...
         res.user.displayName=displayName;
        })
        .catch((error) => {
          console.log(error.code , error.massage)
          // ..
        });
  }

  // //Email pass Login

  const emailpassLogIn = ()=>{
    
    signInWithEmailAndPassword(auth, mail, pass)
    .then(res => {
      // Signed in 
   // console.log(res.user);
      const {email}=res.user;
      const users={
       isSignIn:true,
       name:displayName,
       email:email,
       photo:''
      };
      setuser(users)
      
    })
    .catch((error) => {
      console.log(error.code , error.massage)
    });
  }
  //manage user

  // const users = auth.currentUser;
  // if(users){
  //   console.log(users);
  //   users.displayName=displayName;
  // }
  // else{
  //   console.log('Noone signIn')
  // }
  //console.log(auth)
  return (
    <div className="App">
      
      {
        user.isSignIn?<button onClick={()=>handleSignOut()}>Sign Out</button>
        :<button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>SignIn using Facebook</button>
      <br/>
      <br/>
      <form onSubmit={changeInput}>
        
          <input type="text" name="text" onBlur={changeInput} placeholder='Enter your Name'/><br/>
          <input type="email" name="email" onBlur={changeInput} placeholder='Enter your Email'/><br/>
          <input type="password" name="password" onBlur={changeInput} placeholder='Enter Password'/><br/>
          
          
          <button onClick={handleEmailPassLogIn}>Resister</button><br/>
          <button onClick={emailpassLogIn}>SignIn</button>
        
        
      </form>
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
