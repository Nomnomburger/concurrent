import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import Constants from 'expo-constants';


import { MonoText } from '../components/StyledText';


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


export default function HomeScreen() {


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    readSku();

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);



  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [sku, setSku] = useState('')

  const STORAGE_KEY_SKU = '@save_sku'

  const readSku = async () => {
    try {
      const selectedSku = await AsyncStorage.getItem(STORAGE_KEY_SKU)

      if (selectedSku !== null) {
        setSku(selectedSku)
      }
    } catch (e) {
      alert('Set the Event Code in the Configure tab first!')
    }
  }




  useEffect(() => {
    readSku()
    //readDivision()
  }, []);

  useEffect(() => {
    if (sku) {
      Axios.get(`https://api.vexdb.io/v1/get_matches?sku=${sku}`)
        .then(({ data }) => {
          //console.log("defaultApp -> data", data)
          setData(data.result)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

  }, [sku]);

  



  const shadowOpt = {
    width: 160,
    height: 170,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => {
              //console.log("item", item)
              return (
                <View style={styles.matchCard}>
                  <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={{ flex: 3, flexDirection: "row", justifyContent: "space-around" }}>
                      <View>
                        <View style={styles.redChip} />
                        <Text style={styles.redTeamText}>{item.red1}</Text>
                        <Text style={styles.redTeamText}>{item.red2}</Text>
                      </View>
                      <View>
                        <View style={styles.blueChip} />
                        <Text style={styles.blueTeamText}>{item.blue1}</Text>
                        <Text style={styles.blueTeamText}>{item.blue2}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1.5, flexDirection: "row" }} >
                      <View style={{ width: 200 }}>
                        <Text style={styles.matchInfoText}>Field: {item.field}</Text>
                        <Text style={styles.matchInfoText}>Time: {item.scheduled.slice(11, 16)}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                        <Text style={styles.matchNumText}>{item.matchnum}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 70,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  matchCard: {
    flex: 1,
    flexDirection: "row",
    height: 270,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    elevation: 3
  },
  redChip: {
    width: 100,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#FF0000',
    //marginRight: 40,
    marginTop: 20
  },
  blueChip: {
    width: 100,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#1500FF',
    //marginLeft: 40,
    marginTop: 20
  },
  redTeamText: {
    fontSize: 28,
    textAlignVertical: "center",
    textAlign: "center",
    marginVertical: 10,
    //marginRight: 40,
  },
  blueTeamText: {
    fontSize: 28,
    textAlignVertical: "center",
    textAlign: "center",
    marginVertical: 10,
    //marginLeft: 40,
  },
  matchInfoText: {
    fontSize: 20,
    marginTop: 8,
    marginLeft: 10,
  },
  matchNumText: {
    fontSize: 60,
    marginVertical: 0,
    textAlign: "center",
    textAlignVertical: "center"
  },
});
