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
    Alert,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from "../../const/colors"
import { CheckBox } from '@rneui/themed';

const { height } = Dimensions.get("window")
const SendFrom = () =>
    Alert.alert(
      '確定送出表單', '',
      [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'), style: 'cancel'
        },
        { text: '確定', onPress: () => {Alert.alert('送出成功!','',[{text: '確定'}]),console.log('Ok Pressed')} }
      ],
    );

const Fixform = ({ navigation }) => {

    const [bikeID, setbikeID] = React.useState("");
    const [headlight, setheadlight] = useState(false);
    const [taillight, settaillight] = useState(false);
    const [bell, setbell] = useState(false);
    const [gearbox, setgearbox] = useState(false);
    const [chain, setchain] = useState(false);
    const [basket, setbasket] = useState(false);
    const [dashboard, setdashboard] = useState(false);
    const [other, setother] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* 標頭  header */}
            <View style={styles.Header}>
                <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
                <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: "bold" }}>Smile Hsu</Text>
                <Image source={require(".././../assets/person.png")} style={{ width: 30, height: 30, borderRadius: 15 }} />
            </View>

            {/* 主要內容 main */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.MainContainer}>
                    <Text style={styles.FixHeader}>維修項目</Text>
                    <Text style={styles.FixContainerHeader}>單車序號</Text>
                    <TextInput style={styles.BikeContainer} placeholder='輸入單車序號'></TextInput>
                    <View style={{marginBottom:8,paddingLeft:'4%'}}>
                        <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                            <CheckBox left title="前燈" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={headlight} onPress={() => setheadlight(!headlight)}/>
                            <CheckBox left title="後燈" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={taillight} onPress={() => settaillight(!taillight)}/>
                            <CheckBox left title="置物籃" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={basket} onPress={() => setbasket(!basket)}/>          
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <CheckBox left title="鍊條" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={chain} onPress={() => setchain(!chain)}/>
                            <CheckBox left title="車機" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={dashboard} onPress={() => setdashboard(!dashboard)} />
                            <CheckBox left title="變速器" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={gearbox} onPress={() => setgearbox(!gearbox)}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <CheckBox left title="鈴鐺" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={bell} onPress={() => setbell(!bell)}/>
                            <CheckBox left title="其他" checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={other} onPress={() => setother(!other)}/>
                        </View>
                    </View>
                    <Text style={styles.FixContainerHeader}>備註</Text>
                    <TextInput style={styles.FixContainer} maxLength={23} multiline={true} placeholder='備註說明'></TextInput>
                    <TouchableOpacity style={styles.FixBtn} onPress={SendFrom}><Text style={styles.FixBtnText}>送出</Text></TouchableOpacity>
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
        minHeight: 700,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    BikeContainer: {
        height: 45,
        paddingLeft:10,
        fontSize: 15,
        marginBottom: 8,
        backgroundColor:'white',
        borderRadius: 8,
        borderWidth: .5,
        borderColor: '#d6d6d6',
        textAlign:'left',
        justifyContent:'flex-start'},
    FixHeader: {
        minHeight: 30,
        textAlign:'center',
        justifyContent:'start',
        fontSize: 23,
    },
    FixContainerHeader: {
        minHeight: 30,
        textAlign:'left',
        fontSize: 18,
        marginBottom: 5,
    },
    FixContainer: {
        height: 80,
        paddingLeft:5,
        fontSize: 15,
        marginBottom: 30,
        backgroundColor:'white',
        borderRadius: 8,
        borderWidth: .5,
        borderColor: '#d6d6d6',
        textAlign:'left',
        justifyContent:'flex-start'},
    FixBtn: {
        width: '100%',
        height: 50,
        backgroundColor:COLORS.primary,
        borderRadius: 8,
        paddingTop:5,
        paddingLeft: '45%',
        paddingRight: '40%',
        paddingTop:'7%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    FixBtnText: {
        width: '100%',
        height: 50,
        color:'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        fontSize:18,
    },
});

export default Fixform;