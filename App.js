import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/views/screens/Login'
import Signup from'./src/views/screens/Signup'
import DrawerNavigator from './src/views/navigators/DrawerNavigator';
import DetailsScreen from './src/views/screens/DetailsScreen';
import { BikeScreen} from './src/views/screens/FindStation';

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
 
        <Stack.Screen name="BikeScreen" component={BikeScreen} navigation={navigation}/>
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
