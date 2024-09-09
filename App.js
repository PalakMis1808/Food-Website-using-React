//lazy loading to create Grocery component into bundle to reduce the size of the main single JS file
//when going to the component loaded by lazy, it throws error for the short moment it couldn't fetch that component's data
//and when the error in thrown, it couldn't be resolved so it is necessary to use Suspense
//Suspense is a component of react and this is why 'S' is capital.

import React, { Suspense, lazy,useContext,useEffect,useState} from "react";
import ReactDOM from "react-dom"
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import RestaurantMenu from "./src/components/RestaurantMenu";
import Error from "./src/components/Error";
import { createBrowserRouter,RouterProvider, Outlet} from "react-router-dom";
import Shimmer from "./src/components/Shimmer";
import userContext from "./src/utils/userContext";
import Cart from "./src/components/Cart";
// import Grocery from "./src/components/Grocery";  //replaced by Lazy Loading

import { Provider } from "react-redux";     //since providing store to react app is a work of "react-redux"
import appStore from "./src/utils/appStore";



                                                    // to break down app into small logical chunks (to optimise)
                                                    //code splitting
                                                    //dynamic bundling
                                                    //chunking
                                                    //lazy loading
                                                    //on demand loading

const Grocery =lazy(()=>import("./src/components/Grocery"));
const App =() =>{

    
    //for About page to get description
    const[description,setDescription]= useState("");


    useEffect(()=>{
        fetchData();
    },[])
    //for About page, to get my description throught API
    const fetchData =async ()=>{
        const data = await fetch("https://api.github.com/users/PalakMis1808")
        const jsonData= await data.json();
        // console.log(jsonData)
        setDescription(jsonData);
    }
    return (
        <Provider store={appStore}>     
            <userContext.Provider value={{loggedInUser:description}}>
                <div className="app">
                    <Header/>
                    <Outlet/>
                </div>
            </userContext.Provider>
        </Provider>
        // after this create createSlice.js
    )
};
    

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"/",
                element:<Body/>,
            },
            {
                path:"/about",
                element:<About />,
            },
            {
                path:"/contact",
                element:<Contact/>,
            },
            {
                //fallback is necessay to show the piece of JSX till the time it doesn't load the component
                path:"/grocery",
                element:<Suspense fallback={<Shimmer />}><Grocery/></Suspense>,
            },
            {
                //giving dynamic restaurant id for fetching reastaurant's menu
                //importing restaurant menu component
                path:"/restaurant/:resId",      // redId is used. it means this is a parameter used in URL for fetching (useParams in RestaurantMenu.js)
                element:<RestaurantMenu/>   
            },
            {
                path:"/cart",
                element:<Cart/>
            }
        ],
        errorElement:<Error/>,
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/> );
    