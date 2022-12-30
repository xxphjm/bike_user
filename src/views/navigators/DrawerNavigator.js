import {  View, Image, Text, Alert} from 'react-native';
import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen"
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent =  props => {    
        const {userName,img}=props.userdata
  
    return (
        <DrawerContentScrollView style={{ paddingVertical: 30 }}>
     
            <View style={{ marginLeft: 20, marginVertical: 40 }}>
               {userName? <><Image source={img}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 20
                    }}
                />
                <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold", marginTop: 10 }}>{userName}</Text></>: 
                   <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold", marginTop: 10 }} onPress={()=>props.navigation.navigate("Login")} >登入</Text>}
            </View>
            <DrawerItemList
                {...props}
            />

           {userName&&<Text  style={{ marginLeft: 20,color: COLORS.white, fontSize: 18, fontWeight: "bold", marginTop: 10 }} onPress={()=>showAlert(props)}>登出</Text>}
        </DrawerContentScrollView>
    )
}
const showAlert=(props)=>{
    Alert.alert(
        '提示',
        "確定要登出？",
        [
            {
                text: '取消',
                onPress:()=>props.navigation.goBack
            },
            {
                text: '好',
                onPress:()=>{
                    props.navigation.navigate("HomeScreen")
                    props.navigation.navigate("Home")
                }
               },
        ],
    )
}
const DrawerNavigator = (props) => {
   
    let userdata=props.route.params?props.route.params:{userName:false,img:false}
     
    const Drawerinfo=[
        {
            title:"ADOPTION",
            name:'Home',
            icon:'paw'
        },
        {
            title:"站點查詢",
            name:'FindStation',
            icon:'paw'
        },
        {
            title:"維修通報",
            name:'Fixform',
            icon:'tools'
            
        }
    ]
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
            drawerContent={props => <CustomDrawerContent {...props} userdata={userdata}/>}
        >
                   {/* ==================== 選單項目 ==================== */}
        {Drawerinfo.map((value)=>{
            const{title,name,icon}=value
            return <Drawer.Screen key={title} name={name} options={{
                title: title, drawerIcon: ({ color }) =>
                    <Icon name={icon}
                        size={25}
                        color={color}
                        style={{ marginRight: -20 }}
                    />
            }} >
                {(props) =>
                (
                    <HomeScreen {...props} toggle={name} />
                )
                }
            </Drawer.Screen>
            })}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;