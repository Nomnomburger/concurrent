import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, YellowBox, Button, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

YellowBox.ignoreWarnings(['Require cycle']);

export var sku = 'RE-VRC-19-9191';
export var yourTeam = '839Z';


export default function SettingsScreen() {

  //SKU Storage

  const STORAGE_KEY_SKU = '@save_sku'

  const [sku, setSku] = useState('')

  const saveSku = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_SKU, sku)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readSku = async () => {
    try {
      const selectedSku = await AsyncStorage.getItem(STORAGE_KEY_SKU)

      if (selectedSku !== null) {
        setSku(selectedSku)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  //SKU storage ends


  //Team Storage

  const STORAGE_KEY_TEAM = '@save_team'

  const [team, setTeam] = useState('')

  const saveTeam = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_TEAM, team)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readTeam = async () => {
    try {
      const selectedTeam = await AsyncStorage.getItem(STORAGE_KEY_TEAM)

      if (selectedTeam !== null) {
        setTeam(selectedTeam)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  //Team Storage Ends

  //divistion storage
  const STORAGE_KEY_DIVISION = '@save_division'

  const [division, setDivision] = useState('')

  const saveDivision = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_DIVISION, division)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readDivision = async () => {
    try {
      const selectedDivision = await AsyncStorage.getItem(STORAGE_KEY_DIVISION)

      if (selectedDivision !== null) {
        setDivision(selectedDivision)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  //division storage ends




  //Global Storage

  useEffect(() => {
    readSku()
    readTeam()
    readDivision()
  }, [])

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Data successfully cleared!')
      setSku('')
      setTeam('')
      setDivision('')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  const onChangeTextSku = selectedSku => setSku(selectedSku)

  const onChangeTextTeam = selectedTeam => setTeam(selectedTeam)

  const onChangeTextDivision = selectedDivision => setDivision(selectedDivision)

  const onSubmitEditing = () => {
    if (!sku) return
    saveSku(sku)
    setSku(sku)

    if (!team) return
    saveTeam(team)
    setTeam(team)

    if (!division) return
    saveDivision(division)
    setDivision(division)

  }

  //Global storage ends







  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          style={styles.textBox}
          value={sku}
          placeholder="Place Event Code here"
          onChangeText={onChangeTextSku}
        //onSubmitEditing={onSubmitEditing}
        />
      </View>

      <View>
        <TextInput
          style={styles.textBox}
          value={team}
          placeholder="Place Team Number here"
          onChangeText={onChangeTextTeam}
        //onSubmitEditing={onSubmitEditing}
        />
      </View>

      <View>
        <TextInput
          style={styles.textBox}
          value={division}
          placeholder="Place Division Name here (NOT SUPPORTED AT THE MOMENT)"
          onChangeText={onChangeTextDivision}
        //onSubmitEditing={onSubmitEditing}
        />
      </View>

      <View style={{ alignContent: "center", flex: 1, flexDirection: "row", justifyContent: "space-around" }}>


        <View style={{ width: 120 }}>
          <Button title={'save'} onPress={onSubmitEditing} />
        </View>

        <View style={{ width: 120 }}>
          <Button title={'clear'} onPress={clearStorage} color={'red'} />
        </View>




      </View>
      <View style={{ alignContent: "center", flex: 1, flexDirection: "row", justifyContent: "space-around", marginTop: 30 }}>
        <View style={{ width: 180 }}>
          <Button title={'send feedback for beta'} onPress={sendFeedbackPress} color={'orange'} />
        </View>
      </View>

    </ScrollView>
  );
}

function sendFeedbackPress() {
  WebBrowser.openBrowserAsync(
    'https://forms.office.com/Pages/ResponsePage.aspx?id=PA5Ebz_QaUuD_BGsxHDozlrVNm6tcWFPnfmqroaBLahUNEZaMzlPMkQ2WE5KNU0xUU1DNE5WVU5OMC4u'
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
        elevation: 20,
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
  textBox: {
    borderColor: '#d4d4d4',
    borderWidth: 2,
    height: 60,
    borderRadius: 10,
    padding: 10,
    margin: 20,
  }
});
