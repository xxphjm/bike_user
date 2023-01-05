/* eslint-disable no-dupe-keys */
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    TouchableWithoutFeedback } from 'react-native';

import COLORS from "../../const/colors"
import { CheckBox } from '@rneui/themed';


const Fixform = ({ navigation }) => {
    const [bikeID, setbikeID] = useState('');

 

    const Fixval={
            headlight:false,
            taillight:false,
            basket:false,
            chain:false,
            dashboard:false,
            gearbox:false,
            bell:false,
            other:false,}


    const Fix=[
        {
            id:1,
            row:[
                {title:'前燈',name:'headlight'},
                {title:'後燈',name:'taillight'},
                {title:'置物籃',name:'basket'}
            ]
        },
        {
            id:2,
            row:[
                {title:'鍊條',name:'chain'},
                {title:'車機',name:'dashboard'},
                {title:'變速器',name:'gearbox'}
            ]
        },
        {
            id:3,
            row:[
                {title:'鈴鐺',name:'bell'},
                {title:'其他',name:'other'},
            ]
        },
    ]
    const [fixbike,setfixbike]=useState(Fixval)

    const [instruction, setInstruction] = useState('');
    const SendFrom = () =>{
        Alert.alert(
          '確定送出表單', '',
          [
            {
              text: '取消',
              onPress: () => console.log('Cancel Pressed'), style: 'cancel'
            },
            { text: '確定',
              onPress: () => {Alert.alert('送出成功!','',[{text: '確定',onPress: () => {navigation.goBack()}}])}}
          ],
        )
    };

    return (

            <View>
            {/* 主要內容 main */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.MainContainer}>
                    <Text style={styles.FixHeader}>維修項目</Text>

                    {/* 輸入單車序號 */}
                    <Text style={styles.FixContainerHeader}>單車序號</Text>
                    <TextInput style={styles.BikeContainer} placeholder='輸入單車序號' onChangeText={setbikeID} value={bikeID}></TextInput>
                    
                    {/* CheckBox */}
                    <View style={{marginBottom:8,paddingLeft:'4%'}}>
                        {Fix.map((Fixrow) => (
                            <View key={Fixrow.id}  style={{flexDirection:'row',alignItems:'flex-start'}}>
                                {Fixrow.row.map((val,index)=>(<CheckBox checkedColor={COLORS.primary} key={index} title={val.title} checkedIcon="dot-circle-o" uncheckedIcon="circle-o" checked={fixbike[val.name]} onPress={() => setfixbike({...fixbike,[val.name]:!fixbike[val.name]})}/>
                                ))}
                                {/* {console.log(index)} */}
                            </View>
                        ))}
                    </View>

                    {/* 輸入備註說明 */}
                    <Text style={styles.FixContainerHeader}>備註</Text>
                    <TextInput style={styles.FixContainer} maxLength={23} multiline={true} placeholder='備註說明' onChangeText={setInstruction} value={instruction}></TextInput>
                    <TouchableOpacity style={styles.FixBtn} onPress={SendFrom}><Text style={styles.FixBtnText}>送出</Text></TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            </View>
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
        justifyContent:'flex-start',
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
        justifyContent:'flex-start'
    },
    FixBtn: {
        width: '100%',
        height: 50,
        backgroundColor:COLORS.primary,
        borderRadius: 8,
        paddingTop:5,
        paddingLeft: '45%',
        paddingRight: '40%',
        paddingTop: '40%',
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