//import pages from other folders
import React, { useState } from 'react';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
//import componets from react router dom
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/Leftbar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import  {AuthContext} from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const {currentUser} = useContext(AuthContext);
  // const currentUser = true;
  const { darkMode } = useContext(DarkModeContext);
  // console.log(darkMode);
  // const darkMode="dark";
  const queryClient = new QueryClient();

  const [isLeftBarOpen, setIsLeftBarOpen] = useState(true);

  const toggleLeftBar = () => {
    setIsLeftBarOpen(prevState => !prevState);
  };

  //layout structure for all the pages
  const Layout = () => {
    return (
      //jsx value can be a expression or quoted text hence mention it in {}
      <QueryClientProvider client={queryClient}>
    <div className={`theme-${darkMode?"dark":"light"}`}>
    <Navbar toggleLeftBar={toggleLeftBar} />
        <div style={{ display: "flex" }}>
        <LeftBar isLeftBarOpen={isLeftBarOpen} />
          {/* since outline has max area thus flex:6 */}
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
      </QueryClientProvider>
    );
  };
  //creating a protected
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  //for redirect links or layout exhibitiion
  const router = createBrowserRouter([
    //for layout of home and profile pages
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      //all the children routes which have same layout as <Layout/> along with its individual layouts
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  //return the display page...
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
