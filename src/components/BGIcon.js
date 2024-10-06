import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme'
import Icon from 'react-native-vector-icons/FontAwesome'

const BGIcon = ({name,color,size,BGColor}) => {
  return (
    <View style={[styles.IconBg,{backgroundColor:BGColor}]}>
      <Icon name={name} color={color} size={size}/>
    </View>
  )
}

const styles = StyleSheet.create({
    IconBg:{
      height:SPACING.space_30,
      width:SPACING.space_30,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:BORDERRADIUS.radius_8
    }
})

export default BGIcon

