# App ->
 - Header Component ----------------------------->  Header remain constant in all pages
 - Outlet ---------------------------------------> not a component, but is used to produce pages in demand

# Outlet (Not a Component. Working) ->
 - a component provided by react-router-dom
 - it used in parent Element
 - it is used to render child elements using path
# createBrowserRouter (used just after outlet is used, just after return block of App.js) ->
 - it is a function provided by react-router-dom
 - used to render children
 - takes array of route objects
 - it contains default element and it's path along with array of objects of child elements as children
# RouterProvider to provide and export ->
 - RouterProvider is a component provided by React Router that allows you to specify which router your application should use. It takes the         router instance created by functions like createBrowserRouter and makes it available throughout your application, enabling navigation and routing functionalities.

 - root.render(<RouterProvider router={appRoute}/>)
# Link ->  import Link from react-router-dom
 - it takes tha path from appRoute and renders that linked path when clicked that element.


# Header Component ->
 - useds Link to render the specific components



# High Order Component ->
 - passes a component as an argument (wrapped in it)
 - also sends props
 - returns the same component (which was passed) but with new features

 Syntax  ---->
        import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

        const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

        {dis !== 0 ? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />}

        
-------|---------------------------|--------------------------------------------------------------|
       | RestaurantCard Component  |   (additional function)                                      |            
-------|---------------------------|--------------------------------------------------------------|

                export const withPromotedLabel = (RestaurantCard) => {
            return (props) =>{
                return (
                    <div className="relative">
                        <label className="absolute top-1 left-0 bg-red-600 text-white px-5 py-1 rounded-xl">Flat Deal</label>
                        <RestaurantCard {...props} />
                    </div>
                );
            };
        };


# dynamic routing of each Restaurant. (i.e. when clicked on each restaurant. it's menu opens) ->
 -          {
                //fallback is necessay to show the piece of JSX till the time it doesn't load the component
                path:"/grocery",
                element:<Suspense fallback={<Shimmer />}><Grocery/></Suspense>,
            },
            {
                //giving dynamic restaurant id for fetching reastaurant's menu
                //importing restaurant menu component

              ************* COLON ************
                path:"/restaurant/:resId",
                element:<RestaurantMenu/>
              ********************************
            },
            {
                path:"/cart",
                element:<Cart/>
                
            }

    REASON -----> The colon (:) before resId indicates that this part of the URL is a placeholder for a dynamic value.
                  When a URL matches the pattern, React Router will extract the value of resId from the URL and make it available to the RestaurantMenu component via the route parameters.


# useParams ->

 - The useParams hook allows us to access URL parameters within our components. It retrieves the value of the parameter specified in the route and makes it available for further use. By leveraging this hook, we can create dynamic routes and display content based on the URL.

    **********************IN APP.JS************************************************************
                path:"/restaurant/:resId",      // redId is used. it means this is a parameter used in URL for fetching

                element:<RestaurantMenu/>  
        ******************************************************



    ******************HOW DYNAMIC RESID IS USED (IN BODY.JS)***************************************
                <Link key={restaurant?.info?.id} to={`/restaurant/${restaurant?.info?.id}`}>


                    {/* rendering restaurantCard information to restaurantCard component */}
                     {dis !== 0 ? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />}

                </Link>
    ****************************************************************************************************



    ************************EXTRACTING DYNAMIC RES ID PASSES (IN RESTAURANTMENU.JS)******************************** 
            const { resId } = useParams();
    ************************************************************************************************************


































































# API TO TELL LATTITUDE AND LONGITUDE
    https://nominatim.openstreetmap.org/search?q={city name}&format=json



# REDUX TOOLKIT
 - install @reduxjs/toolkit and react-redux
 - Build our store
 - Connect our store to App
 - Slice (cartSlice)
 - dispatch(action)
 - read data using Selector hook provided by react-redux in header.js
 - go and read abput RTK quesry in redux-toolkit.js.org