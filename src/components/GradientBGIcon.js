import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import { moderateScale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Entypo';


const GradientBGIcon = ({ name, color, size }) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.LinearGradientBG}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      >
        <Icon
          name={name}
          color={color}
          size={size}
        // style={styles.Icon} 
        />

      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    borderWidth: moderateScale(2, 0.1),
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden'

  },
  LinearGradientBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default GradientBGIcon