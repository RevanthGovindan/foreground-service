/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
  Button
} from 'react-native';

import ForegroundService from '@supersami/react-native-foreground-service';
const App = () => {

  useEffect(() => {
    let subscip = DeviceEventEmitter.addListener(
      'notificationClickHandle',
      function (e) {
        console.log('json', e);
      },
    );
    return function cleanup() {
      subscip.remove();
    };
  }, []);


  async function start() {
    let obj = { routeName: "mainActivity", routeParams: { data: "" } }
    let obj1 = { routeName: "mainActivity 1", routeParams: { data: "" } }

    let notificationConfig = {
      id: 434,
      title: 'SuperService',
      message: `I hope you are doing your `,
      vibration: false,
      visibility: 'public',
      icon: 'ic_launcher',
      importance: 'max',
      number: String(1),
      button: false,
      buttonText: 'Checking why are you repeating your self',
      buttonOnPress: JSON.stringify(obj),
      mainOnPress: JSON.stringify(obj1)
    };

    await ForegroundService.startService(notificationConfig);

    await ForegroundService.runTask({
      taskName: 'myTaskName',
      delay: 0,
      loopDelay: 5000,
      onLoop: true,
    });

  }

  async function stopservice() {
    await  ForegroundService.stopService()
  }



  return (
    <>
      <View style={styles.container}>
        <Button title="Start foreground service" onPress={() => start()} />
        <View style={styles.space} />
        <Button title="Stop foreground service" onPress={() => stopservice()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  space: {
      flex: 0.1
  }
});
export default App;
