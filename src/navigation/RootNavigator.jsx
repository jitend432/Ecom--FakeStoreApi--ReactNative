import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./BottomTab";



function RootNavigator() {


    return(
        
        <NavigationContainer>
           
        <BottomTab/>
            

        </NavigationContainer>
    )
}

export default RootNavigator;