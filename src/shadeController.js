import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Slider } from "react-native-elements"; 
import { connect} from 'react-redux'
import { socket } from '../api/socket'

class ShadeController extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      socketValue: '',
      moving: 'Shade position'
    }
  }

  componentDidMount() {
    this.setState({value: this.props.percentage})
  }

  moveShadeSocket = async (value) => {
    await this.setState({ value })
    const data = {
      chipID: this.props.chipID,
      command: this.state.value
    }
    socket.emit("sendCommand", data, this.props.userID)
    this.setState({moving: 'Moving to'})
  }

  clickStop = async () => {
    const data = {
      chipID: this.props.chipID,
      command: 999
    }
    socket.emit("sendCommand", data, this.props.userID)
  }

  open = () => {
    this.moveShadeSocket(100)
  }

  close = () => {
    this.moveShadeSocket(0)
  }
 
  render(){
    socket.on('shades', (usersShades) => {
      let foundShade = usersShades.find(shade => shade.chipID === this.props.chipID)
      this.setState({value: foundShade.currentPosition})
      this.setState({moving: 'Shade position'})

    })
    return (
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{this.props.room}: {this.props.name}</Text>
        </View>
        <Text>{this.state.moving}: {this.state.value}%</Text>
        <View style={styles.controlButtonWrapper}>
          <TouchableOpacity 
          onPress={this.open} 
          style={styles.controlButton}>
            <Text>OPEN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.controlButton} 
          onPress={() => this.clickStop()}>
            <Text>STOP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={this.close} 
          style={styles.controlButton}>
            <Text>CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sliderWrapper}>
          <Slider 
          thumbTintColor="#fff"
          orientation='vertical'
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={this.state.value}
          onValueChange={value => this.moveShadeSocket( value )}
          animateTransitions={true}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          />
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#E1E5EC',
    borderRadius: 5,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15
  },
  nameWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 18,
    color: "#3FB8AF",
    fontWeight: "bold"
  },
  controlButtonWrapper: {
    flexDirection: "column"
  },
  position: {
    marginTop: 4,
    marginBottom: 4
  },
  controlButton: {
    width: "100%",
    margin: 2, 
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  slider: {
    height: 200,
    alignSelf: "center",
  }, 
  track: {
    width: 300,
    marginTop: 15
  },
  thumb: {
    backgroundColor: '#3FB8AF',
    width: 22,
    height: 22, 
    marginTop: 15,
    borderRadius: 22
  },
  sliderWrapper: {
    marginTop: 20
  }
});

const mapStateToProps = state => ({
  userID: state.userID
})


export default connect(mapStateToProps)(ShadeController)