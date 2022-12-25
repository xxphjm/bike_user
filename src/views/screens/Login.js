
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ImageBackground,
  
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import Users from '../../const/userdata';

import {useFonts,Chewy_400Regular} from '@expo-google-fonts/chewy'

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    let[Fontload]= useFonts({
        Chewy_400Regular
    })
   
    if (!Fontload) {
        return null;
      }


    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle =(userName, password) => {

        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('輸入錯誤!', '您的名稱或密碼沒輸入', [
                {text: '好'}
            ]);
            return;
        }

       else if ( foundUser.length == 0 ) {
            Alert.alert('無效帳號!', '您的名稱或密碼輸入錯誤', [
                {text: '好'}
            ]);
            return;
        }
        else{

       
            navigation.navigate('Home',{'userName':foundUser[0].username,'img':foundUser[0].img})
            navigation.navigate('HomeScreen',{'userName':foundUser[0].username,'img':foundUser[0].img})
        }
    }

    return (
        <View style={styles.container}>

      <ImageBackground source={require('../../assets/map.png')} style={{flex:1,height:'40%'}} >
    
          <StatusBar backgroundColor='#008080' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={[{color:'#ff5858'},styles.textWel]}>W </Text>
            <Text style={[{color:'#71d845'},styles.textWel]}>e l </Text>
            <Text style={[{color:'#ffbd58'},styles.textWel]}>c o </Text>
            <Text style={[{color:'#00c2cb'},styles.textWel]}>m e </Text>
            <Text style={[{color:'#cb6ce6'},styles.textWel]}>!</Text>
        </View>
 
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>使用者名稱</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="您的名稱"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>使用者名稱必須4個字以上</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>密碼</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="您的密碼"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>密碼必須4個字以上.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#008080', marginTop:15}}>忘記密碼?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            <TouchableOpacity
                    onPress={() => {loginHandle( data.username, data.password )}}
                    style={[styles.signIn, {
                        backgroundColor:'#008080',
                     
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FFF'
                    }]}>登入</Text>
                </TouchableOpacity>

{/* 
                <TouchableOpacity
                    // onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        backgroundColor:'#008080',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FFF'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
            </View>
        </Animatable.View>
        </ImageBackground>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    
    },
    header: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
        flexDirection:'row'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textWel:{
        fontSize:38,
        fontFamily:'Chewy_400Regular',
        textShadowColor: 'rgba(0,0,0,0.65)',
        textShadowOffset: { width: 0.7, height: 0.7 },
        textShadowRadius: 3,
    }
  });