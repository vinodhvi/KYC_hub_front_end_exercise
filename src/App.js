import React from "react";
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import AppLayout from "./layout/app-layout";
import ProductDetails from "./pages/product-details";
import CompareProduct from "./pages/compare-product";

// elements routing

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<ProductDetails />
      },
     
      {
        path:'/compare-product/:id',
        element:<CompareProduct />
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
