import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "../Screens/Cart";
import Profile from "../Screens/Profile";
import Home from "../Screens/Home";



function BottomTab() {
    const Tab = createBottomTabNavigator();

    return(

        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Cart" component={Cart}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
       
    )
}

export default BottomTab;