import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import DayIcon from './DayIcon'

const ActiveSchedule = ({days, hour, minute, shades, percentage}) => {

    const showDays = days.map((day) => {
      return <DayIcon 
      day={day.substring(0,2).toUpperCase()} 
      key={day}/>
    })

    const showShades = shades.map((shade, i) => {
      return <Text key={i}>{shade.name}; </Text>
    }) 

    return (
      <View style={styles.container}>
        <View style={styles.days}>
          <Text style={styles.bold}>Days:</Text>
            {showDays}
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Time:</Text>
          <Text> 
            {hour < 12 ? hour : hour-12}:
            {minute === 0 && 0}{minute}
          </Text>
          <Text> 
            {hour > 11 ? 'pm' : 'am'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Shades: </Text>
          {showShades}
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Percentage: </Text>
          <Text>{percentage}</Text>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={{backgroundColor: '#33C4D2', padding: 6}}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: '#E7505A', padding: 6}}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>REMOVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 3,
    borderColor: '#E1E5EC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  days: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 2
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4
  }
})

export default ActiveSchedule;