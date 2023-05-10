import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './Pages/Login';
import SignUp from './Pages/Login/SignUp';
import MainMenu from './Pages/MainMenu';
import OutletMenu from './Pages/MainMenu/OutletMenu';
const router = createBrowserRouter([
  {
    path: "/MainMenu",
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
    path: "/MainMenu/OutletMenu/:idOutlet",
    element: <OutletMenu />
  },
  

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
