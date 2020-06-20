import React from 'react';
import {
  View,
} from 'react-native'
import MockData from './MockData'
import OnBoard from './components/OnBoard'


export default function App(){
    return(
      <View>
        <OnBoard data={MockData}/>
      </View>
    )
}


