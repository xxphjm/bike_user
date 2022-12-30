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
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UserIcon from "react-native-vector-icons/Feather";
import ActionSheet from "react-native-actionsheet";

import COLORS from "../../const/colors";
import Stations from "../../const/stations";
import { loadLocalRawResource } from "react-native-svg";

const { height } = Dimensions.get("window");

const BikeModal = (props) => {
   const{RentScreenVisible, setRentScreenVisible}=props
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={RentScreenVisible}
      onRequestClose={() => {
        setRentScreenVisible(!RentScreenVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>確認租借？</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, margin: 5, width: 80 }}>
              <Button
                color={COLORS.primary}
                title="取消"
                onPress={() => setRentScreenVisible(!RentScreenVisible)}
              />
            </View>
            <View style={{ flex: 1, margin: 5, width: 80 }}>
              <Button
                 color={COLORS.primary}
                title="確認"
                onPress={() => setRentScreenVisible(!RentScreenVisible)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const BikeScreen = ({ navigation, route }) => {
  const BikeData = route.params.bike;
  const [RentScreenVisible, setRentScreenVisible] = useState(false);

  const BikeCard = ({ bike, navigation }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setRentScreenVisible(true)}
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <BikeModal  RentScreenVisible={RentScreenVisible}  setRentScreenVisible={ setRentScreenVisible}/>
      <View style={{ marginStart: 20, marginTop: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={BikeData}
          renderItem={({ item }) => (
            <BikeCard bike={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const StationCard = ({ station, navigation }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("BikeScreen", station)}
    >
      <View style={styles.CardContainer}>
        {/* 站點的圖片 */}
        <View style={styles.CardImageContainer}>
          <Image
            source={station.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
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
            {"尚餘 " + station?.mat + " 輛"}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
            {station?.addr}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Icon name="map-marker" size={18} color={COLORS.primary} />
            <Text
              style={{ fontSize: 12, marginLeft: 5, color: COLORS.primary }}
            >
              {"距離 " + station?.distance + " KM"}
            </Text>
          </View>
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
    const showCountyList = () => {
      this.CountyActive.show();
    };

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
              <View style={{ width: 100 }}>
                <Button color={COLORS.primary} title={this.state.County} onPress={showCountyList} />
                <ActionSheet
                  ref={(o) => (this.CountyActive = o)}
                  title="選擇地區"
                  options={this.state.CountyList}
                  cancelButtonIndex={this.state.CountyList.indexOf(
                    this.state.County
                  )}
                  destructiveButtonIndex={this.state.CountyList.indexOf(
                    this.state.County
                  )}
                  onPress={(index) => {
                    this.CountyChange(index);
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
                  <StationCard station={item} navigation={navigation}  />
                )}
              />
            </View>
          </View>
        </ScrollView>
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
