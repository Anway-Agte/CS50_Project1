import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View , Button, TextPropTypes, VirtualizedList } from 'react-native';

class Timer extends React.Component{
  shouldComponentUpdate(nextProps){
    
    return (nextProps.workTimeInSeconds > 0)
  }
  render(){
    return(
      <Text style = {this.props.style}>{Math.floor(this.props.time / 60)}:{this.props.time% 60 }</Text>
    )
  }
}
 
class Counter extends React.Component{
  
  constructor(props){
    super(props) ; 
    this.state = {
      workTimeInSeconds : 10 , 
      restTimeInSeconds : 60 ,
    }
    
  }

  initiateTimer(){
    this.timer = setInterval(()=>{this.setState(prevState => ({workTimeInSeconds : prevState.workTimeInSeconds - 1})) ;} , 1000)
  }

  componentDidMount(){
   this.timer = setInterval(this.startWorkTimer , 1000)
  }

  shouldComponentUpdate(nextProps){
    return !(nextProps.workTimeInSeconds % 2)
  }

  startWorkTimer = ()=> {
    this.setState(prevState => ({workTimeInSeconds : prevState.workTimeInSeconds - 1})) ; 
  }
  
  render(){
      return( 
       
        <Timer style = {styles.timer} time = {this.state.workTimeInSeconds}></Timer> )
  }
}

class Mode extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      mode : "Work Mode"
    }
  }
  render(){
    return(
      <Text style = {{fontSize:35 , }}>{this.state.mode}</Text>
    )
  }
}

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      counterActive : false 
    }
  }

  startTimer(){
    this.setState({
      counterActive:true 
    }) 
  }
  render(){ 
    if(!this.state.counterActive){
      return(
        <View style={styles.container}>
        <StatusBar style="auto" />
        <View style = {styles.buttondiv}>
          <View style = {styles.button}>
            <Button onPress  = {this.startTimer.bind(this)} title = "Start"></Button>
          </View>
          <View style = {styles.button}>
            <Button color = "#FF0000"  title = "Stop"></Button>
          </View>
          <View style = {styles.button}>
            <Button title = "Reset"></Button>
          </View>
        
        </View>
      </View>

      )
    }
    else{
      return (
    <View style={styles.container}>
      <Mode></Mode>
      <Counter></Counter>
      <StatusBar style="auto" />
      <View style = {styles.buttondiv}>
        <View style = {styles.button}>
          <Button onPress  = {this.startTimer.bind(this)} title = "Start"></Button>
        </View>
        <View style = {styles.button}>
          <Button color = "#FF0000"  title = "Stop"></Button>
        </View>
        <View style = {styles.button}>
          <Button title = "Reset"></Button>
        </View>
      
      </View>
    </View>
  );
    }
} 
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer : {
   marginVertical:20 ,
   color: "#841584" , 
   fontSize : 25 , 
  } , 
  buttondiv:{
    flexDirection:'row',
    justifyContent:'space-between' , 
  } , 
  button:{
    marginHorizontal : 5 ,
    height : 100 , 
    width : 100 ,
  }
});
