import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View , Button, TextPropTypes, VirtualizedList ,Vibration} from 'react-native';


class Counter extends React.Component{
  shouldComponentUpdate(nextProps){
    return (nextProps.data.workTime >= 0)
  }
  render(){
    const time = this.props.data.workModeActive ? this.props.data.workTime : this.props.data.restTime 
    return(
      <Text style = {styles.counter}>{Math.floor(time / 60)} m : {time % 60} s</Text>
    )
  }
}

class Timer extends React.Component{
  constructor(){
    super()
    this.state = {
      workTime : 300, 
      restTime : 60 , 
      mode : "Work Mode",
      workModeActive : true , 
      paused : false , 
    }
  }
  componentDidMount(){
    this.timer = setInterval(this.startTimer , 1000)
  }
  startTimer = () =>{
    if(this.state.workModeActive){
    this.setState(prevState => ({workTime : prevState.workTime - 1}))
    if(this.state.workTime === 0 ){
      Vibration.vibrate([500, 500, 500])
    }
    if(this.state.workTime === -1){
      Vibration.vibrate([500, 500, 500])
      this.setState({workModeActive : false}) 
      this.setState({ workTime : 300})
      
    }
    }
    else{
      this.setState(prevState => ({ restTime : prevState.restTime - 1}))
      if(this.state.restTime === 0){
        Vibration.vibrate([500, 500, 500])
      }
      if(this.state.restTime === -1){
        this.setState({workModeActive : true}) 
        this.setState({ restTime : 60})
      }
    }
  }
  reset = ()=> {
    this.setState({workTime : 300, 
      restTime : 60 , 
      mode : "Work Mode",
      workModeActive : true , 
      paused : true , })
      clearInterval(this.timer)
  }

  startPause = () =>{
    if(!this.state.paused){
      clearInterval(this.timer) 
      this.setState({paused : true})
    }
    else{
      this.timer = setInterval(this.startTimer , 1000)
      this.setState({paused : false})
    }
  }
  render(){
    return(
    <React.Fragment>
      <View style = {styles.container}>
      <Text style = {styles.mode}>{this.state.workModeActive ? "Work timer" : "Break Timer"}</Text>
      <Counter data = {this.state}></Counter>
      <View style = {styles.buttondiv}>
          <View style = {styles.button}>
            <Button onPress = {this.startPause} title = {this.state.paused ? "Start" : "Pause"}></Button>
          </View>
          <View style = {styles.button}>
            <Button onPress = {this.reset} title = "Reset"></Button>
          </View>
        
        </View>
      </View>
    </React.Fragment>
    )
  }
}

export default  class App extends React.Component{
render( ){
  return (
    <Timer></Timer>
  )
}

} 



const styles = StyleSheet.create({
  container :{
    flex :1 ,
    alignItems : 'center' , 
    justifyContent : 'center' , 
  } ,
  mode:{
    fontSize : 35 

  } ,
  buttondiv:{
    flexDirection:'row',
    justifyContent:'space-between' , 
  } , 
  button:{
    marginHorizontal : 5 ,
    height : 100 , 
    width : 100 ,
  } , 
  counter : {
    fontSize : 45 , 
    color: "#841584" , 
    marginVertical :10 ,
  }
})