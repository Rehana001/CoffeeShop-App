import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Profilepic from './ProfilePic'
import GradientBGIcon from './GradientBGIcon'


const HeaderBar = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      {/* <Text>{title ? title: 'HeaderBar'}</Text> */}
      <GradientBGIcon 
      name="menu" 
      color={COLORS.primaryLightGreyHex} 
      size={FONTSIZE.size_16} 
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <Profilepic />
    </View>
  )
}


const styles = StyleSheet.create({
    HeaderContainer:{
        padding:SPACING.space_30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    HeaderText:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex
    }
})

export default HeaderBar