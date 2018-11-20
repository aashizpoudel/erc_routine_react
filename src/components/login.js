import React,{Component} from 'react';
import {auth} from './../firebase';

class Login extends Component{
   
    _authListener = (user)=>{
        if(user){
            
        this.setState({loggedIn:true});
        }
        
        else
        this.setState({loggedIn:false});
        
        this.setState({working:false});
    };
    
    _login=()=>{
        this.setState({working:true});
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Error signin... :"+errorMessage);
        this.setState({working:false});
    });
    }
    state={
        working:false,
      loggedIn:false,
      email:'admin@admin.com',
        password:'hydrogen',
    };
    authListener={};
    
    componentDidMount(){
        this.authListener=auth.onAuthStateChanged(this._authListener);    
    }
    
    componentWillUnmount(){
        this.authListener();
    }
    
    _logout(){
        this.setState({working:true});
        auth.signOut();
    }
    render(){
        
        if(this.state.working){
            return <div>Please wait.....</div>;
        }
        
        if(this.state.loggedIn)
            return <div>You have logged in.... <a className='btn btn-warning btn-sm' onClick={()=>{this._logout()}}a>Logout</a></div> ;
        return  <a className='btn btn-unique btn-sm' onClick={()=>{this._login()}}a>Login</a>;
    }
}

export default Login;