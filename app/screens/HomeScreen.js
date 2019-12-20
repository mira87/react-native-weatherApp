import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
export class HomeScreen extends Component {

    constructor(props) {

        super(props);

        var navigation = this.props.navigation;


        this.state = {

            cities: [
                {
                    name: 'London',
                    country: 'UK'
                },
                {
                    name: 'Edinburgh',
                    country: 'UK'
                },
                {
                    name: 'Doha',
                    country: 'Qatar'
                },
                {
                    name: 'South Carolina',
                    country: 'US'
                },
                {
                    name: 'New York',
                    country: 'US'
                },
                {
                    name: 'Texas',
                    country: 'US'
                },
                {
                    name: 'Sydney',
                    country: 'Australia'
                },
                {
                    name: 'Paris',
                    country: 'France'
                },
                {
                    name: 'Madrid',
                    country: 'Spain'
                },
                {
                    name: 'Cancun',
                    country: 'Mexico'
                },
            ],
            list: [],
            refresh: true


        }

        this.fetchTemps();

    }


    getRandom = (arr, n) => {

        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result
    }


    fetchTemps = () => {

        var newList = []

        var list = this.getRandom(this.state.cities, 6)
        // console.log(list)


        for (let home in list) {

            var name = list[home].name;
            var country = list[home].country


            this.fetchCityTemp(name, country, newList)
        }
        // for (let i = 0; i < 7; i++) {
        //     console.log('The random cities', this.state.cities[Math.floor(Math.random() * this.state.cities.length)].name)
        // }
        // console.log(this.state.cities.name)
    }


    loadNewTemps = () => {

        this.setState({
            list: [],
            refresh: true
        })

        this.fetchTemps();
    }


    fetchCityTemp = (city, country, newList) => {

        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&APPID=9fb1cee88677ae05f8221e64bb743701&units=metric')
            .then(res => {


                // console.log('Maaaaain', res.data.main)

                var r = res.data.main;
                var obj = res.data;
                var city = {
                    name: obj.name,
                    country: country,
                    temp: Math.ceil(r.temp),
                    type: obj.weather[0].main,
                    desc: 'Humidty: ' + r.humidity + '%  - ' + obj.weather[0].main
                }


                newList.push(city);

                console.log('Here is before', this.state.list)
                this.setState({
                    list: newList,
                    refresh: false

                })
                console.log('Here is after', this.state.list)

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
        // console.log('Here is city', this.city)

        // this.fetchCityTemp("London", "uk")

        return (
            <View style={styles.Container}>

                <StatusBar barStyle="light-content" />
                <Text style={{ fontFamily: 'Roboto', width: '100%', paddingTop: 40, paddingBottom: 15, color: '#fff', backgroundColor: '#feb301', fontWeight: 'bold', textAlign: 'center' }}>🌤CityWeather</Text>
                <FlatList style={{ width: '100%' }}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNewTemps}
                    data={this.state.list}
                    renderItem={({ item, seperators }) => (
                        // <TouchableHighlight underlayColor="#feb301" onPress={() => alert('Tap Made')}>
                        <TouchableHighlight underlayColor="#feb301" onPress={() => alert(item.desc)}>
                            <LinearGradient

                                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
                                start={[0, 0.5]}
                            >

                                <View style={styles.row}>


                                    <Text style={[
                                        (this.getTempRange(item.temp) == 1) ? styles.cold : styles.temp,
                                        (this.getTempRange(item.temp) == 2) ? styles.medium : styles.temp,
                                        (this.getTempRange(item.temp) == 3) ?
                                            styles.hot : styles.temp,
                                        (this.getTempRange(item.temp) == 4) ? styles.vhot : styles.temp,

                                        styles.temp]}>{this.getEmoji(item.type)}{item.temp} °C</Text>
                                    <Text style={styles.cityName}> {item.name}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableHighlight>


                    )}

                />

            </View>
        )
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
        justifyContent: 'center'
    },
    cityName: {
        fontSize: 20,
        lineHeight: 40,
        fontFamily: 'Roboto'
    },
    row: {
        flex: 1,
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


export default HomeScreen
