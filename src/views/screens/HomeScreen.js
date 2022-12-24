import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    StatusBar
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'react-native-vector-icons/Feather';

import COLORS from "../../const/colors"
//寵物資料的api
import pets from '../../const/pets';
//
const { height } = Dimensions.get("window")
//寵物分類的選單項目
const petCategories = [
    { name: 'CATS', icon: 'cat' },
    { name: 'DOGS', icon: 'dog' },
    { name: 'BIRDS', icon: 'ladybug' },
    { name: 'BUNNIES', icon: 'rabbit' },
];

// 寵物卡片
const Card = ({ pet, navigation }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("DetailsScreen", pet)}>
            <View style={styles.CardContainer}>
                {/* 寵物的圖片 */}
                <View style={styles.CardImageContainer}>
                    <Image source={pet.image}
                        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                    />
                </View>
                {/* 寵物的簡介 */}
                <View style={styles.CardDetailContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: COLORS.dark, fontSize: 20, fontWeight: "bold" }}>{pet?.name}</Text>
                        <Icon name='gender-male' size={22} color={COLORS.grey}
                        />
                    </View>
                    <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>{pet?.type}</Text>
                    <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>{pet?.age}</Text>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Icon name='map-marker' size={18} color={COLORS.primary} />
                        <Text style={{ fontSize: 12, marginLeft: 5, color: COLORS.primary }}>Distance:7.8km</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const HomeScreen = ({ navigation,route }) => {
    //
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    const [filteredPets, setFilteredPet] = useState([])
   
    const filterPet = (index) => {
        const currentPets = pets.filter((item) => item?.pet?.toLocaleUpperCase() == petCategories[index].name)[0].pets
        // console.log("currentPets =", currentPets[0])
        setFilteredPet(currentPets)
    }

    //
    useEffect(() => {
        filterPet(0)
    }, [])

     let img=route.params&&route.params.img

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.MainContainer}>
                    {/* 搜尋列 search bar */}
                    <View style={styles.SearchBarContainer}>
                        <Icon name='magnify' size={24} color={COLORS.grey} />
                        {/* flex:1 讓字靠右 */}
                        <TextInput
                            placeholder='Search pet to adopt'
                            placeholderTextColor={COLORS.grey}
                            style={{ flex: 1 }} />
                        <Icon name="sort-ascending" size={24} color={COLORS.grey} />
                    </View>
                    {/* 寵物分類選單 */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}>
                        {/* 用map輸出 寵物分類選單的項目 */}
                        {petCategories.map((item, index) => (
                            // 讓icon跟下方文字 置中對齊 要寫在這邊
                            <View key={"pet" + index} style={{ alignItems: "center" }}>
                                {/* 這邊注意 點選icon 會改變顏色 的寫法 */}
                                {/* 注意 onpress 加入 filterPet(index) 第一次用到 大刮號 加兩個函式 */}
                                <TouchableOpacity style={[styles.CategoryBtn, { backgroundColor: selectedCategoryIndex == index ? COLORS.primary : COLORS.white }]}
                                    onPress={() => {
                                        filterPet(index)
                                        setSelectedCategoryIndex(index)
                                    }}
                                >
                                    <Icon name={item.icon} size={30} color={selectedCategoryIndex == index ? COLORS.white : COLORS.primary} />
                                </TouchableOpacity>
                                <Text style={styles.CategoryBtnName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                    {/* 下方的寵物展示 內容區塊 */}
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}

                            data={filteredPets}
                            renderItem={({ item }) => <Card pet={item} navigation={navigation} />}
                        />
                    </View>
                </View>
            </ScrollView>
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
    SearchBarContainer: {
        flexDirection: "row",
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    CategoryBtn: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
    CategoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        fontWeight: "bold",
        marginTop: 5,
    },
    CardContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,


    }, CardImageContainer: {
        width: 140,
        height: 150,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
    CardDetailContainer: {
        flex: 1,
        height: 120,
        backgroundColor: COLORS.white,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: "center"
    },
});

export default HomeScreen;
