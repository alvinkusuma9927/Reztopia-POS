import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './Pages/Login';
import SignUp from './Pages/Login/SignUp';
import MainMenu from './Pages/MainMenu';
import OutletMenu from './Pages/MainMenu/OutletMenu';
import Logout from './Auth/Logout';
import DetailOrder from './Pages/MainMenu/DetailOrder';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  },
  {
    path: "/MainMenu",
    element: <MainMenu />
  },
  {
    path: "/MainMenu/:section",
    element: <MainMenu />
  },
  {
    path: "/MainMenu/OutletMenu/:idOutlet",
    element: <OutletMenu />
  },
  {
    path: "/Logout",
    element: <Logout/>
  },
  {
    path: "/MainMenu/DetailOrder/:idOrder",
    element: <DetailOrder />
  }
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
  
)
