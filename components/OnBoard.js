import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    Dimensions,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import OnBoardItem from './OnBoardItem'

const { width, height } = Dimensions.get('window')

const scrollX = new Animated.Value(0)

let position = Animated.divide(scrollX, width)


const OnBoard = ({ data }) => {

    const [pageNumber, setPageNumber] = useState(1)
    const listRef = useRef()


    const onScrollEnd = (e, size) => {
        setPageNumber(Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0), size))

    }

    const scrollNext = () => {
        setPageNumber(pageNumber + 1)
        if (pageNumber != data.length) {
            listRef.current.scrollToOffset({
                offset: width * pageNumber,
                animated: true
            })
        }
    }
    const scrollLast = (len) => {
        setPageNumber(data.length)
        listRef.current.scrollToOffset({
            offset: width * len,
            animated: true
        })
    }
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('first-user-screen-shown', JSON.stringify(true))
        } catch (e) {
            console.log(e)
        }
    }

    if (data && data.length) {
        return (
            <View>
                <TouchableOpacity style={{ marginLeft: 'auto', margin: 8 }}
                    onPress={() => scrollLast(data.length)}
                >
                    <Text style={{ color: '#799bf7' }}>Skip Introduction</Text>
                </TouchableOpacity>
                <FlatList
                    ref={listRef}
                    data={data}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    onMomentumScrollEnd={(e) => onScrollEnd(e, data.length)}
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <OnBoardItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )
                    }
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    opacity,
                                    height: 10,
                                    width: 10,
                                    backgroundColor: '#4ff077',
                                    margin: 5,
                                    borderRadius: 180
                                }}
                            />
                        )
                    })}
                </View>
                <TouchableOpacity
                    onPress={() => pageNumber<data.length?scrollNext():storeData()}
                    style={{
                        alignSelf: 'center',
                        width: width / 1.5,
                        backgroundColor: '#4ff077',
                        alignItems: 'center',
                        height: height / 15,
                        justifyContent: 'center',
                        borderRadius: 30
                    }}>
                    {pageNumber < data.length
                        ?
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>NEXT</Text>
                        :
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>START</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

export default OnBoard