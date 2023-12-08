import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import {
    MaterialIcons,
    AntDesign,
    Feather,
    Ionicons,
} from "@expo/vector-icons";

const HomeScreen = () => {
    const list = [
        {
            id: "0",
            image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            name: "Home",
        },
        {
            id: "1",
            image: "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
            name: "Deals",
        },
        {
            id: "3",
            image: "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
            name: "Electronics",
        },
        {
            id: "4",
            image: "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
            name: "Mobiles",
        },
        {
            id: "5",
            image: "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
            name: "Music",
        },
        {
            id: "6",
            image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
            name: "Fashion",
        },
    ];

    const [selectedAddress, setSelectedAdress] = useState("");
    return (
        <>
            <SafeAreaView
                style={{
                    paddingTop: Platform.OS === "android" ? 40 : 0,
                    flex: 1,
                    backgroundColor: "white",
                }}
            >
                <ScrollView>
                    <View
                        style={{
                            backgroundColor: "#77AB9C",
                            padding: 10,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginHorizontal: 7,
                                gap: 10,
                                backgroundColor: "white",
                                borderRadius: 3,
                                height: 38,
                                flex: 1,
                            }}
                        >
                            <AntDesign
                                style={{ paddingLeft: 10 }}
                                name="search1"
                                size={22}
                                color="black"
                            />
                            <TextInput placeholder="Tìm kiếm sản phẩm" />
                        </Pressable>

                        <Feather name="mic" size={24} color="black" />
                    </View>
                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            padding: 10,
                            backgroundColor: "#C3DFCD",
                        }}
                    >
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color="black"
                        />

                        <Pressable>
                            {selectedAddress ? (
                                <Text>
                                    Deliver to {selectedAddress?.name} -{" "}
                                    {selectedAddress?.street}
                                </Text>
                            ) : (
                                <Text
                                    style={{ fontSize: 13, fontWeight: "500" }}
                                >
                                    Add a Address
                                </Text>
                            )}
                        </Pressable>

                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color="black"
                        />
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
