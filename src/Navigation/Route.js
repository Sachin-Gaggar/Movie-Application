import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Home from '../components/Home';
import More from '../components/More';
import Search from '../components/Search';

const Tab = createBottomTabNavigator();

export default class Routes extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? require('../assets/homeA.png')
                : require('../assets/homeIn.png');
            } else if (route.name === 'Search') {
              iconName = focused
                ? require('../assets/searchA.png')
                : require('../assets/searchIn.png');
            } else {
              iconName = focused
                ? require('../assets/moreA.png')
                : require('../assets/moreIn.png');
            }
            return <Image style={styles.img} source={iconName} />;
          },
        })}
        tabBarOptions={{
          style: styles.tab,
          inactiveTintColor: '#AAAAAA',
          activeTintColor: '#E67E22',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 20,
  },
  tab: {
    backgroundColor: '#191919',

    borderTopColor: '#666666',
  },
});
