/**
 * Created by zhuzihao on 2017/7/21.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,Picker,PickerIOS,
    Text,DatePickerIOS,
    View,Image,Button,PanResponder,TouchableHighlight,TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    picker:{
        height:300,
        width:300,
        backgroundColor:'yellow'
    }
})
export default class  DatePickerIOSCom extends Component{
    cars = {
        amc: {
            name: 'AMC',
            models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
        },
        alfa: {
            name: 'Alfa-Romeo',
            models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
        },
        aston: {
            name: 'Aston Martin',
            models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
        },
        audi: {
            name: 'Audi',
            models: ['90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7'],
        },
        austin: {
            name: 'Austin',
            models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
        },
        borgward: {
            name: 'Borgward',
            models: ['Hansa', 'Isabella', 'P100'],
        },
        buick: {
            name: 'Buick',
            models: ['Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
                'Roadmaster', 'Skylark'],
        },
        cadillac: {
            name: 'Cadillac',
            models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
        },
        chevrolet: {
            name: 'Chevrolet',
            models: ['Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
                'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt'],
        },
    };
    constructor(options){
        super(options);
        this.state={
            date:new Date(),
            source:'amc',
            index:0
        }
        Image.prefetch()
    }
    timeChange = (date)=>{
        this.setState({
            date:date
        })
    }
    render() {
        return (
            <View>
                <DatePickerIOS style={ styles.picker } date={ this.state.date } onDateChange={ this.timeChange } mode={ 'datetime' }></DatePickerIOS>
                {/*<Picker*/}
                    {/*style={ {backgroundColor:"yellow",overflow:'hidden'} }*/}
                    {/*selectedValue={this.state.language}*/}
                    {/*onValueChange={(lang) => this.setState({language: lang})}>*/}
                    {/*<Picker.Item label="Java" value="java" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                {/*</Picker>*/}
                <View style={ {flexDirection:'row'} }>
                    <PickerIOS style={ {backgroundColor:'red',flex:1} } selectedValue={ this.state.source } onValueChange={ (car)=>{
                        this.setState({
                            source:car,
                            index:0
                        })
                    } }>
                        {
                            Object.keys(this.cars).map((pp)=>{
                                return (<PickerIOS.Item key={ pp } value={ pp } label={ this.cars[pp].name }></PickerIOS.Item>)
                            })
                        }
                    </PickerIOS>
                    <PickerIOS itemStyle={{color:'red'}}  style={ {flex:1,backgroundColor:'yellow'} } selectedValue={ this.state.index } onValueChange={ (index)=>{
                        this.setState({index})
                    } }>
                        {
                            this.cars[this.state.source].models.map((name,index)=>{
                                return (
                                    <PickerIOS.Item  key={name} value={index} label={ name }/>
                                )
                            })
                        }
                    </PickerIOS>
                </View>
            </View>
        );
    }
}
/**
 * (
 <PickerItemIOS key={name} value={index} label={ name }/>
 )
 * */