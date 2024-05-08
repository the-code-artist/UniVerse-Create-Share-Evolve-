// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = async (inputs) => {
//     const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
//       withCredentials: true,
//     });

//     setCurrentUser(res.data)
//   };

//   useEffect(() => {
//     // store the user info in local storage in form of string only so that we can check it for auth purposes
//     // we cant store object inside local storage..it need to be a string
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export default AuthContextProvider;

// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = async (inputs) => {
//     try {
//       const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
//         withCredentials: true,
//       });
//       setCurrentUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const updateUserDetails = (updatedUser) => {
//     setCurrentUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//   };

//   useEffect(() => {
//     // store the user info in local storage in form of string only so that we can check it for auth purposes
//     // we cant store object inside local storage..it need to be a string
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);
//   console.log("currentUser:",currentUser)
//   return (
//     <AuthContext.Provider value={{ currentUser, login, updateUserDetails }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout =() => {
    try {
      setCurrentUser(null);
      localStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
