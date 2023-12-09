import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    LoginScreen,
    RegisterScreen,
    CartScreen,
    HomeScreen,
    ProfileScreen,
    ProductInfoScreen,
    AddAddressScreen,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color="#008E97" />
                            ) : (
                                <AntDesign
                                    name="home"
                                    size={24}
                                    color="black"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "#008E97" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color="#008E97"
                                />
                            ) : (
                                <Ionicons
                                    name="person-outline"
                                    size={24}
                                    color="black"
                                />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <AntDesign
                                    name="shoppingcart"
                                    size={24}
                                    color="#008E97"
                                />
                            ) : (
                                <AntDesign
                                    name="shoppingcart"
                                    size={24}
                                    color="black"
                                />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Info"
                    component={ProductInfoScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Address"
                    component={AddAddressScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({});
