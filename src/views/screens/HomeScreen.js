import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { List } from './List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'react-native-vector-icons/Feather';
import Fixform from "../screens/Fixform"
import COLORS from "../../const/colors"
//寵物資料的api
//
const { height } = Dimensions.get("window")

// 寵物卡片
const HomeScreen = ({ navigation,route,toggle}) => {
    //

     let img=route.params&&route.params.img
    
    const Togglepage=()=>{
        
        switch (toggle) {
            case 'Fixform':
                return <Fixform/>
               
            default:
   
            return <List navigation={navigation}/>
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* 標頭  header */}
             <StatusBar hidden={true}/>
            <View style={styles.Header}>
                <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
         
                {img?<TouchableOpacity onPress={navigation.toggleDrawer}><Image source={img} 
                style={{ width: 30, height: 30, borderRadius: 60  ,borderWidth: 1, borderRadius: 60 ,borderColor:COLORS.grey}} 
               /></TouchableOpacity>:  
                  <UserIcon name='user' size={26} color={COLORS.grey}  onPress={() => navigation.navigate("Login")}/>}
 
      
            </View>
            {/* 主要內容 main */}
           {Togglepage()}
        
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    Header: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    MainContainer: {
        minHeight: height,
        backgroundColor: COLORS.light,
        marginTop: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },


    
});

export default HomeScreen;
