//make the necessary imports from react..
import { createContext, useEffect, useState } from "react";
//using create context create an object named darkmodecontext and also export it so that we can use it in other parts of out app
export const DarkModeContext = createContext();

//create a provider..The provider is responsible for creating and managing the context, which holds the data to be shared between components. 
// we are going to wrap entire application inside this
export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    //convert the string frm localstrorage to json format for further checking
    //thus ultimatel darkmode will be set according to existing i/p or else by default false(which means visiting website for first time)
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
//to toggle using icon
  const toggle = () => {
    setDarkMode(!darkMode);
  };
//write /set the local starage item and value as darkMode:darkMode..darkMode value comes from [darkMode] whici is set in useState()
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
// return the provider by passing the darkMode and toogle function as we need them further..we pass it as object thus double paranthesis
  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
