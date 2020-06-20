import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window')

const boldConvertedText = (text,type) => {
    var fields = []
    var words = text.split(" ")
    var stillContinue = false
    for (var i = 0; i < words.length; i++) {
        if (words[i][0] === '*' && words[i][1] === '*') {
            if (words[i][words[i].length - 1] !== '*' && words[i][words[i].length - 2] !== '*') stillContinue = true
            else stillContinue = false
            fields.push(
               <Text style={{ fontWeight: 'bold',textAlign: 'center',fontSize:type===0?20:15}}>{words[i].replace(/\**/g,"")+" "}</Text>
            )
        }
        else{
            if(stillContinue){
                if (words[i][words[i].length - 1] !== '*' && words[i][words[i].length - 2] !== '*') stillContinue = true
                else stillContinue = false
                fields.push(
                    <Text style={{ fontWeight: 'bold',textAlign: 'center',fontSize:type===0?20:15 }}>{words[i].replace(/\**/g,"")+" "}</Text>
                )
            }
            else{
                fields.push(
                    <Text style={{textAlign: 'center',fontSize:type===0?20:15}}>{words[i].replace(/\**/g,"")+" "}</Text>
                )
                
            }
        }
    }
    return fields
}

const OnBoardItem = ({ item }) => {
    return (
        <View style={styles.item}>
            <Image style={styles.image} source={item.image} />
            <View style={styles.textView}>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                {boldConvertedText(item.title,0)}
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
                {boldConvertedText(item.description,1)}
                </View>
                
            </View>
        </View>
    )
}
export default OnBoardItem

const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: width,
        height: height / 2.5,
        alignItems: 'center'
    },
    textView: {
        alignItems: 'center',
    },
    image: {
        width: width / 2,
        height: width / 2,
    }
})