import { StatusBar, View, Image, Text } from 'react-native';
import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    useDrawerProgress,
    useDrawerStatus
} from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen"
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';


const Drawer = createDrawerNavigator();


//
const CustomDrawerContent = props => {
    return (
        <DrawerContentScrollView style={{ paddingVertical: 30 }}>
            <View style={{ marginLeft: 20, marginVertical: 40 }}>
                <Image source={require("../../assets/person.png")}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 20
                    }}
                />
                <Text style={{ color: COLORS.white, fontSize: 13, fontWeight: "bold", marginTop: 10 }}> Smile Hsu </Text>
            </View>
            <DrawerItemList
                {...props}
            />
        </DrawerContentScrollView>
    )
}

const DrawerScreenContainer = ({ children }) => {
    // 判斷 Drawer 頁面是否作用中
    const isDrawerOpen = useDrawerStatus()
    //
    const progress = useDrawerProgress()
    //
    const scale = Animated.interpolateNode(progress, { inputRange: [0, 1], outputRange: [1, 0.8] })
    //
    const borderRadius = Animated.interpolateNode(progress, { inputRange: [0, 1], outputRange: [0, 25] })
    return (
        <Animated.View style={{ backgroundColor: COLORS.white, flex: 1, transform: [{ scale }], overflow: "hidden", borderRadius }}>
            <StatusBar barStyle='dark-content'
                // 根據 Drawer 頁面是否作用中 改變 statusbar 的顏色
                backgroundColor={isDrawerOpen == "open" ? COLORS.primary : COLORS.white} />
            {children}
        </Animated.View>
    )
}


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerType: "slide",
            drawerStyle: {
                width: 200,
                backgroundColor: COLORS.primary,
            },
            overlayColor: null,
            sceneContainerStyle: {
                // 此設定 在 android無效? 影片是用iso
                backgroundColor: COLORS.primary
            },
            // 作用中的顏色
            drawerActiveTintColor: COLORS.white,
            //非作用中的顏色
            drawerInactiveTintColor: COLORS.secondary,
            //取消 選項的 背景顏色
            drawerItemStyle: { backgroundColor: null },
            //
            drawerLabelStyle: { fontWeight: "bold" },
        }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            {/* ==================== 選單項目 ==================== */}
            <Drawer.Screen name="Home" options={{
                title: "ADOPTION", drawerIcon: ({ color }) =>
                    <Icon name="paw"
                        size={25}
                        color={color}
                        style={{ marginRight: -20 }}
                    />
            }} >
                {(props) =>(<HomeScreen {...props} />)


                }
            </Drawer.Screen>
            {/* ==================== 選單項目 ==================== */}
            <Drawer.Screen name="DONATION" options={{
                drawerIcon: ({ color }) =>
                    <Icon name="gift"
                        size={25}
                        color={color}
                        style={{ marginRight: -20 }}
                    />
            }} >
                {(props) =>
                (
                    <HomeScreen {...props} />
                )
                }
            </Drawer.Screen>
            {/* ==================== 選單項目 ==================== */}
            <Drawer.Screen name="ADD PET" options={{
                drawerIcon: ({ color }) =>
                    <Icon name="plus-box"
                        size={25}
                        color={color}
                        style={{ marginRight: -20 }}
                    />
            }} >
                {(props) =>
                (
                    <HomeScreen {...props} />
                )
                }
            </Drawer.Screen>
            {/* ==================== 選單項目 ==================== */}
            <Drawer.Screen name="FAVORITES" options={{
                drawerIcon: ({ color }) =>
                    <Icon name="heart"
                        size={25}
                        color={color}
                        style={{ marginRight: -20 }}
                    />
            }} >
                {(props) =>
                (
                    <HomeScreen {...props} />
                )
                }
            </Drawer.Screen>
            {/* ==================== 選單項目 ==================== */}
            <Drawer.Screen name="PROFILE" options={{
                drawerIcon: ({ color }) =>
                    <Icon name="account"
                        size={25}
                        color={color}
                        style={{ marginRight: -20 }}
                    />
            }} >
                {(props) =>
                (
                    <HomeScreen {...props} />
                )
                }
            </Drawer.Screen>

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;