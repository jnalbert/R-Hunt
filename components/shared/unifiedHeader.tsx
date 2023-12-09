import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const UnifiedHeader = ({inc}) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 60,
      borderWidth: 1, // This sets the width of the border
      borderColor: '#EBEBE8', // This sets the color of the border
      borderStyle: 'solid', // This sets the style of the border
      backgroundColor: '#FFFFFF',
      paddingBottom: 10,
    }}>
    <TouchableOpacity>
      <Text style={{ fontWeight:'500', fontSize:18 }}> {inc} </Text>
    </TouchableOpacity>
  </View>
);


