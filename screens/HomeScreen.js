import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    TextInput,
    Image,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useCallback, useEffect } from "react";
import {
    MaterialIcons,
    AntDesign,
    Feather,
    Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { deals, images, list, offers } from "../utils/contain";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const [selectedAddress, setSelectedAdress] = useState("");
    const [open, setOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [category, setCategory] = useState("jewelery");

    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelery", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "women's clothing", value: "women's clothing" },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://fakestoreapi.com/products"
                );
                setProducts(response.data);
            } catch (error) {
                console.log("error message", error);
            }
        };

        fetchData();
    }, []);

    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);
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
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {list.map((item, index) => (
                            <Pressable
                                key={index}
                                style={{
                                    margin: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "contain",
                                    }}
                                    source={item.image}
                                />

                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 12,
                                        fontWeight: "500",
                                        marginTop: 5,
                                    }}
                                >
                                    {item?.name}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <SliderBox
                        images={images}
                        autoPlay
                        circleLoop
                        dotColor={"#13274F"}
                        inactiveDotColor="#90A4AE"
                        ImageComponentStyle={{ width: "100%" }}
                    />

                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Trending Deals of the week
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {deals.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item.id,
                                        title: item.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })
                                }
                                style={{
                                    marginVertical: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{
                                        width: 180,
                                        height: 180,
                                        resizeMode: "contain",
                                    }}
                                    source={{ uri: item?.image }}
                                />
                            </Pressable>
                        ))}
                    </View>
                    <Text
                        style={{
                            height: 1,
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            marginTop: 15,
                        }}
                    />

                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Today's Deals
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {offers.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item.id,
                                        title: item.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })
                                }
                                style={{
                                    marginVertical: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    style={{
                                        width: 150,
                                        height: 150,
                                        resizeMode: "contain",
                                    }}
                                    source={{ uri: item?.image }}
                                />

                                <View
                                    style={{
                                        backgroundColor: "#E31837",
                                        paddingVertical: 5,
                                        width: 130,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 10,
                                        borderRadius: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: 13,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Upto {item?.offer}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <Text
                        style={{
                            height: 1,
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            marginTop: 15,
                        }}
                    />

                    <View
                        style={{
                            marginHorizontal: 10,
                            marginTop: 20,
                            width: "45%",
                            marginBottom: open ? 50 : 15,
                        }}
                    >
                        <DropDownPicker
                            style={{
                                borderColor: "#B7B7B7",
                                height: 30,
                                marginBottom: open ? 120 : 15,
                            }}
                            open={open}
                            value={category} //genderValue
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setItems}
                            placeholder="choose category"
                            placeholderStyle={styles.placeholderStyles}
                            onOpen={onGenderOpen}
                            // onChangeValue={onChange}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {products
                            ?.filter((item) => item.category === category)
                            .map((item, index) => (
                                <ProductItem item={item} key={index} />
                            ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
