// AuthProvider.js
import React, { useEffect, useState ,axios} from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
    
  const [user, setUser] = useState({})
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const loggedInState = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedInUser && loggedInState) {
      setUser(loggedInUser);
      setIsLoggedIn(true);
    }
  },[]);
  const login = (userData) => {
    // Implement your login logic here
    console.log('\n Login context Called ');
    localStorage.setItem('user',JSON.stringify(userData))
    localStorage.setItem('isLoggedIn',true);
    setUser(userData);
    setIsLoggedIn(true);
    
  };

  const logout = async() => {
    // Implement your logout logic here
    // let res=await axios.post("http://localhost:3500/logout",user,{ withCredentials: true })
    console.log('Logout context Called ');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser({});
    setIsLoggedIn(false);
  } 
  return (
    <AuthContext.Provider value={{user,isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
