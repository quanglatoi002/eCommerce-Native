import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { Provider } from "react-redux";
import { ModalPortal } from "react-native-modals";
import store from "./store";
import { UserContext } from "./userContext";
export default function App() {
    return (
        <>
            <Provider store={store}>
                <UserContext>
                    <StackNavigation />
                    <ModalPortal />
                </UserContext>
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
