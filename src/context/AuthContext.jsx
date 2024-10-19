import React, { createContext, useContext, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const loginApi = useApi(async (credentials) => {
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      return { user };
    }
    throw new Error('Invalid credentials');
  });

  const registerApi = useApi(async (userData) => {
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  });

  const logoutApi = useApi(async () => {
    
    return { success: true };
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  const login = async (credentials) => {
    try {
      const result = await loginApi.execute(credentials);
      if (result.user) {
        const userWithType = { ...result.user, userType: result.user.userType || 'student' };
        setUser(userWithType);
        localStorage.setItem('currentUser', JSON.stringify(userWithType));
        console.log('User logged in:', userWithType);
        return true;
      }
      throw new Error('Login failed: User data not returned'); //Keep track of any errors if you get any
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };
  //KEEP THIS HERE TO LOOK BACK AND SEE WHAT YOU DID DIFFERENT
  // const login = async (credentials) => {
  //   try {
  //     const result = await loginApi.execute(credentials);
  //     setUser(result.user);
  //     localStorage.setItem('currentUser', JSON.stringify(result.user));
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  const register = async (userData) => {
    try {
      await registerApi.execute(userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await logoutApi.execute();
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update the currentUser in localStorage Learn the difference between this and the one below
    setUser(updatedUser); // Update the user in state
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        updateProfile, 
        isLoading: loading, 
        error: loginApi.error || registerApi.error || logoutApi.error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
