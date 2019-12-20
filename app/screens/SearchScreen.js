import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight, TextInput } from 'react-native'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
export class SearchScreen extends Component {

    constructor(props) {

        super(props);

        var navigation = this.props.navigation;


        this.state = {

            searchInput: '',
            searchResult: 0,
            error: 'Search for a city...',
            item: {}



        }


    }

    searchCity = () => {
        this.fetchCityTemp(this.state.searchInput)
    }



    fetchCityTemp = (city) => {

        this.setState({
            item: {},
            searchResult: 0,
            error: 'Search for a city'
        })
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=9fb1cee88677ae05f8221e64bb743701&units=metric')
            .then(res => {


                // console.log('Maaaaain', res.data.main)

                var r = res.data.main;
                var obj = res.data;
                if (!res.data) {

                    this.setState({
                        searchResult: 0,
                        error: 'City not found!'
                    })
                } else {

                    var city = {
                        name: obj.name,
                        // country: country,
                        temp: Math.ceil(r.temp),
                        type: obj.weather[0].main,
                        desc: 'Humidty: ' + r.humidity + '%  - ' + obj.weather[0].main
                    }

                }





                // newList.push(city);

                // console.log('Here is before', this.state.list)
                this.setState({
                    item: city,
                    searchResult: 1

                })
                // console.log('Here is after', this.state.list)

            })




    }




    getTempRange = (t) => {

        if (t <= 10) {
            return 1
        }

        if (t > 10 && t < 20) {
            return 2
        }

        if (t >= 20 && t < 30) {
            return 3
        }

        if (t >= 30) {
            return 4
        }
    }




    getEmoji = (type) => {
        if (type == 'Clouds') {
            return '☁️';
        }

        if (type == 'Clear') {
            return '☀️'
        }

        if (type == 'Haze') {
            return '🌤'
        }

        if (type == "Thunderstorm") {
            return '🌩'
        }

        if (type == "Snow") {
            return '❄️'
        }

        if (type == "Rain") {
            return '🌧'
        }

        if (type == 'Smoke') {
            return '🌫'
        }

    }


    // componentDidMount() {
    //     axios.get('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9fb1cee88677ae05f8221e64bb743701')
    //         .then(res => console.log(res.data))


    // }


    render() {




        return (
            <View style={styles.Container}>

                <StatusBar barStyle="light-content" />
                <Text style={{ fontFamily: 'Roboto', width: '100%', paddingTop: 40, paddingBottom: 15, color: '#fff', backgroundColor: '#feb301', fontWeight: 'bold', textAlign: 'center' }}>🌤CityWeather</Text>

                <View style={{ width: '90%', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', lineHeight: 20, padding: 5, fontSize: 16 }}>Search for city</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({
                            searchInput: text
                        })}
                        value={this.state.searchInput}

                        style={{ width: '80%', padding: 15, backgroundColor: 'black', color: 'white', margin: 5 }}
                    />

                    <TouchableHighlight
                        style={{ backgroundColor: 'grey', padding: 20, borderRadius: 8 }}
                        onPress={() => this.searchCity()}>

                        <Text style={{ fontSize: 14, color: 'white' }}>Search</Text>
                    </TouchableHighlight>
                </View>



                {
                    this.state.searchResult == 1 ? (

                        <TouchableHighlight underlayColor="#feb301" onPress={() => alert(this.stateitem.desc)}>
                            <LinearGradient

                                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
                                start={[0, 0.5]}
                            >

                                <View style={styles.row}>


                                    <Text style={[
                                        (this.getTempRange(this.state.item.temp) == 1) ? styles.cold : styles.temp,
                                        (this.getTempRange(this.state.item.temp) == 2) ? styles.medium : styles.temp,
                                        (this.getTempRange(this.state.item.temp) == 3) ?
                                            styles.hot : styles.temp,
                                        (this.getTempRange(this.state.item.temp) == 4) ? styles.vhot : styles.temp,

                                        styles.temp]}>{this.getEmoji(this.state.item.type)}{this.state.item.temp} °C</Text>
                                    <Text style={styles.cityName}> {this.state.item.name}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableHighlight>


                    ) : (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Text>{this.state.error}</Text>
                            </View>
                        )}



            </View>)
    }

}


const styles = StyleSheet.create({
    temp: {
        fontSize: 30,
        lineHeight: 40,
        width: 130,
        marginRight: 15,
        fontWeight: 'bold',
        fontFamily: 'Roboto'

    },
    Container: {
        // marginTop: 24,
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    cityName: {
        fontSize: 20,
        lineHeight: 40,
        fontFamily: 'Roboto'
    },
    row: {
        flex: 1,
        width: 375,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },

    cold: {
        color: 'blue'
    },
    medium: {
        color: 'green'
    },
    hot: {
        color: 'orange'
    },
    vhot: {
        color: 'red'
    }





})


export default SearchScreen
