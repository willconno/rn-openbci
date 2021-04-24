/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { LineChart, Grid } from 'react-native-svg-charts'

const Section: React.FC<{title: string}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

class APIClient {


}

const apiclient = new APIClient()

var ws = new WebSocket('ws://192.168.1.107:8080/connect');

ws.onopen = () => {
  // connection opened
  // ws.send('something'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  // console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  // console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};


const LineChartExample = () => {
    const data = []

    const [state, setState] = useState(data);

    ws.onmessage = (e) => {
      // a message was received
      // console.log(e.data);
      let data: object = JSON.parse(e.data)

      // console.log(allChannels.values)

      let result: number[] = state.slice()

      if (result.length < data.numPoints) {

        let unshift = []

          for (let i = result.length; i < data.numPoints; i++) {
            unshift.push(0);
          }
        
        unshift.forEach(i => result.unshift(i))
        

      } else {
        result.shift()
      }

      result.push(data.values[0]);
      
      setState(result)
    };


    return (
        <LineChart
            style={{ height: 75 }}
            data={state}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
            yMax={200}
            yMin={-10}
        >
            <Grid />
        </LineChart>
      )
}

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

    <ScrollView>

    <LineChartExample />
    </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
