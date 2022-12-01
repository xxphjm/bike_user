import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, ImageBackground } from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from "../../const/colors"
import { Colors } from 'react-native/Libraries/NewAppScreen';


const DetailsScreen = ({ navigation, route }) => {
    // 這邊注意 怎麼跟上一頁(homescreen) 拿資料到這一頁來. 
    const pet = route.params;
    console.log("pet= ", pet)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.background} />
            {/* 標頭 */}
            <View style={{ height: 400, backgroundColor: COLORS.background }}>
                {/* 背景圖 */}
                <ImageBackground
                    source={pet?.image}
                    resizeMode="contain" style={{ height: 280, top: 20 }}
                >
                    <View style={styles.Header}>
                        <Icon name="arrow-left" size={28} color={COLORS.dark} onPress={navigation.goBack} />
                        <Icon name="dots-vertical" size={28} color={COLORS.dark} />
                    </View>
                </ImageBackground>
                {/* 中間的資訊欄 */}
                <View style={styles.DetailContainer}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: COLORS.dark,
                            fontWeight: "bold",
                        }}>
                            {pet?.name}</Text>
                        <Icon name="gender-male" size={25} color={COLORS.dark} />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.dark,
                        }}>{pet?.type}</Text>
                        <Text style={{
                            fontSize: 13,
                            color: COLORS.dark,
                        }}>{pet?.age}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Icon name='map-marker' size={20} color={COLORS.primary} />
                        <Text style={{ fontSize: 14, marginLeft: 5, color: COLORS.grey }}>5 Green Swamp Road, Nyora, New South Wales, 2646 Australia</Text>
                    </View>
                </View>
            </View>
            {/* 下方資訊欄 */}
            <View style={{ flex: 1, marginTop: 80, justifyContent: "space-between" }}>
                <View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                        {/* 左邊:頭像  */}
                        <Image source={require("../../assets/person.png")}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20
                            }}
                        />
                        {/* 右邊: 個人資訊 */}
                        <View style={{ flex: 1, paddingLeft: 10, height: 20 }}>
                            <Text style={{ fontSize: 12, color: COLORS.dark, fontWeight: "bold" }}>Smile Hsu</Text>
                            <Text style={{ fontSize: 11, color: COLORS.grey, fontWeight: "bold", marginTop: 2 }}>Owner</Text>
                        </View>
                        {/* 注意: 這邊文字一開始無法顯示 是要去 最上層 SafeAreaView 把 flex:1 加上去才正常 */}
                        <Text style={{ fontSize: 12, color: COLORS.grey }}>Feb 10, 2022</Text>
                    </View>
                    <Text style={styles.Comment}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima id exercitationem impedit eveniet nobis molestias nostrum dolorem officiis?</Text>
                </View>
                {/* 頁尾 按鈕 */}
                <View style={styles.Footer}>
                    <View style={styles.IconContainer}>
                        <Icon name='heart-outline' size={22} color={COLORS.white} />
                    </View>
                    <View style={styles.Btn}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>ADOPTION</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    Header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 20,
    }, DetailContainer: {
        flex: 1,
        height: 120,
        backgroundColor: COLORS.white,
        padding: 20,
        marginHorizontal: 20,
        bottom: -60,
        elevation: 10,
        borderRadius: 20,
        justifyContent: "center",
    },
    Comment: {
        marginTop: 10,
        fontSize: 12.5,
        color: COLORS.dark,
        marginHorizontal: 20,
        lineHeight: 20,
    },
    Footer: {
        flexDirection: "row",
        height: 100,
        backgroundColor: COLORS.light,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    IconContainer: {
        backgroundColor: COLORS.primary,
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    Btn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginLeft: 20,
    },
});

export default DetailsScreen;
