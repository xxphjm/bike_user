import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ActionSheet from "react-native-actionsheet";

import COLORS from "../../const/colors";
import Stations from "../../const/stations";


const { height } = Dimensions.get("window");


const BikeModel=(bike,navigation,text,route)=>{
  // eslint-disable-next-line no-sparse-arrays
  Alert.alert('', text, [
    {
      text: '取消',
      onPress: () => console.log('Cancel Pressed'), style: 'cancel'
    },, 
    {text: '是',
    onPress: () => {
     if (text=='確認租借？') {
      
       navigation.navigate("FindStation", bike)
     }
     else{
      Alert.alert('還車成功')
      navigation.navigate("FindStation")
      navigation.navigate("HomeScreen")
     }
    }
}]);
}
const BikeCard = ({ bike, navigation }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => BikeModel(bike,navigation,'確認租借？')}
    >
    
      <View style={styles.CardContainer}>
        {/* 車輛現況圖 */}
        <View style={styles.CardImageContainer}>
          <Image
            source={bike?.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        {/* 車輛的資訊 */}
        <View style={styles.CardDetailContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: COLORS.dark,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {"ID: " + bike?.name}
            </Text>
          </View>
          <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
            {"型號: " + bike?.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const BikeScreen = ({ navigation, route }) => {
  const BikeData = route.params.bike;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
       
      <View style={{ marginStart: 20, marginTop: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={BikeData}
          renderItem={({ item }) => (
            <BikeCard bike={item}  navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const StationCard = ({ station, route,navigation }) => {
  const Confirm_bike=()=>{
 
    if ( route.params) {
      
      Alert.alert('', '請先還車', [
        {text: '好'}
    ]);
    return;
    }
    else{
      navigation.navigate("BikeScreen", station)
    }
    }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => Confirm_bike() }
    >
      <View style={styles.CardContainer}>
        {/* 站點的圖片 */}
        <View style={styles.CardImageContainer}>
          <Image
            source={station.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" ,   borderRadius: 20}}
          />
        </View>
        {/* 站點的簡介 */}
        <View style={styles.CardDetailContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: COLORS.dark,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {station?.name}
            </Text>
          </View>
          <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
            {"尚餘 " + station.bike.length + " 輛"}
          </Text>
          {/* <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
            {station?.addr}
          </Text> */}
          {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Icon name="map-marker" size={18} color={COLORS.primary} />
            <Text
              style={{ fontSize: 12, marginLeft: 5, color: COLORS.primary }}
            >
              {"距離 " + station?.distance + " KM"}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

class FindStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalList: [],
      Local: "",
      CountyList: [],
      County: "",
      StationData: [],
    };
  }

  componentDidMount() {

    const LocalList = Stations.local.map((item) => item.name);
    const Local = LocalList[0];
    const CountyList = Stations.local.map((item) =>
      item.county.map((item) => item.name)
    )[LocalList.indexOf(Local)];
    const County = CountyList[0];
    const StationData = Stations.local.map((item) =>
      item.county.map((item) => item.station.map((item) => item))
    )[LocalList.indexOf(Local)][CountyList.indexOf(County)];
    this.setState({
      LocalList: LocalList,
      Local: Local,
      CountyList: CountyList,
      County: County,
      StationData: StationData,
    });
  }

  LocalChange(index) {
    const Local = this.state.LocalList[index];
    const CountyList = Stations.local.map((item) =>
      item.county.map((item) => item.name)
    )[this.state.LocalList.indexOf(Local)];
    const County = CountyList[0];
    const StationData = Stations.local.map((item) =>
      item.county.map((item) => item.station.map((item) => item))
    )[this.state.LocalList.indexOf(Local)][CountyList.indexOf(County)];
    this.setState({
      Local: Local,
      CountyList: CountyList,
      County: County,
      StationData: StationData,
    });
  }

  CountyChange(index) {
    const County = this.state.CountyList[index];
    const StationData = Stations.local.map((item) =>
      item.county.map((item) => item.station.map((item) => item))
    )[this.state.LocalList.indexOf(this.state.Local)][
      this.state.CountyList.indexOf(County)
    ];
    this.setState({
      County: County,
      StationData: StationData,
    });
  }

  render() {
    const { navigation } = this.props;

    const showLocalList = () => {
      this.LocalActive.show();
    };
    const bikeid=typeof this.props.route.params=='undefined' ?[]:typeof this.props.route.params.name=='undefined'?[]:this.props.route.params.name
    const route=this.props.route?this.props.route:[]

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        
        {/* 主要內容 main */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.MainContainer}>
            {/* 搜尋列 select bar */}
            <View style={styles.SelectBarContainer}>
              <View style={{ width: 100 }}>
                <Button color={COLORS.primary} title={this.state.Local} onPress={showLocalList} />
                <ActionSheet
                  ref={(o) => (this.LocalActive = o)}
                  title="選擇縣市"
                  options={this.state.LocalList}
                  cancelButtonIndex={this.state.LocalList.indexOf(
                    this.state.Local
                  )}
                  destructiveButtonIndex={this.state.LocalList.indexOf(
                    this.state.Local
                  )}
                  onPress={(index) => {
                    this.LocalChange(index);
                  }}
                />
              </View>
       
            </View>
            {/* 下方的站點展示 內容區塊 */}
            <View style={{ marginTop: 20 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.StationData}
                renderItem={({ item }) => (
                  <StationCard station={item} route={route} navigation={navigation}  />
                )}
              />
            </View>
          </View>
        </ScrollView>
          {console.log(bikeid.length!=0)}
        {bikeid.length!=0 &&<TouchableOpacity
                    onPress={() => {BikeModel(bikeid,navigation,'是否歸還 '+bikeid,route)}}
                    style={[ {
                        backgroundColor:'#008080',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 15
                    }]}
                >
                    <Text style={[{
                        color: '#FFF'
                    }]}>還車</Text>
                </TouchableOpacity>}
      </SafeAreaView>
    );
  }
}

export { BikeScreen };
export default FindStation;

const styles = StyleSheet.create({
  // StationCard
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
  SelectBarContainer: {
    flexDirection: "row",
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },


  CardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  CardImageContainer: {
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
    justifyContent: "center",
  },
  // BikeScreen
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});
