
import { StyleSheet, Text, View,Image, ImageBackground,TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { moderateScale } from 'react-native-size-matters'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

const ImageBackgroundInfo = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,

}) => {
  return (
    <View>
      {/* <Text>ImageBackgroundInfo</Text> */}
      <ImageBackground source={imagelink_portrait} style={styles.ImageBackgroundImage}>
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarWithContainer}>
            <TouchableOpacity onPress={()=>{BackHandler()}}>
              <View style={styles.LeftArrowIcon}>
                <Ionicons
                 name="chevron-back-outline"
                  color={COLORS.primaryWhiteHex} 
                  size={FONTSIZE.size_30} 
                  style={styles.BackIconStyle}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ToggleFavourite(favourite,type,id)}}>
              <View style={styles.HeartIconStyle}>
            <Ionicons
                 name="heart-sharp"
                  color={favourite? COLORS.primaryRedHex:COLORS.primaryLightGreyHex} 
                  size={FONTSIZE.size_30} 
                  style={styles.BackIconStyle}
                  />
                  </View>
            </TouchableOpacity>
          </View>
        ):(
          <View style={styles.ImageHeaderBarWithoutContainer}>
         
          <TouchableOpacity onPress={()=>{ToggleFavourite(favourite,type,id)}}>
            <View style={styles.HeartIconStyle}>
          <Ionicons
               name="heart-sharp"
                color={favourite? COLORS.primaryRedHex:COLORS.primaryLightGreyHex} 
                size={FONTSIZE.size_30} 
                style={styles.BackIconStyle}
                />
                </View>
          </TouchableOpacity>
        </View>
        )}

        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={styles.ItemTitleText}>{name}</Text>
                <Text style={styles.ItemSubTitleText}>{special_ingredient}</Text>
              </View>
              <View style={styles.ItemPropertiesContainer}>
                <View style={styles.ProperFirst}>
                  <MaterialCommunityIcon name={type=='Bean' ? 'seed' : 'seed-outline'} 
                  size={type=='Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                  color={COLORS.primaryOrangeHex}
                  />
                  <Text style={[styles.PropertyTextFirst,{marginTop:type=='Bean' ? SPACING.space_4+SPACING.space_2:0}]}>
                    {type}
                    </Text>
                </View>
                <View style={styles.ProperFirst}>
                <EntypoIcon name={type=='Bean' ? 'location' : 'drop'} 
                  size={ FONTSIZE.size_24}
                  color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.PropertyTextLast}>
                    {ingredients}
                    </Text>
                </View>
              </View>
            </View>

            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <AntDesignIcon 
                name={'star'} 
                color={COLORS.primaryOrangeHex} 
                size={FONTSIZE.size_20}
                />
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({ratings_count})</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  ImageBackgroundImage:{
    width:'100%',
    aspectRatio: 20/25,
    justifyContent:'space-between'
  },
  LeftArrowIcon:{
    // paddingLeft:moderateScale(20,0.1),
    // paddingTop:moderateScale(20,0.1),
    padding:moderateScale(6,0.1),
    backgroundColor:COLORS.primaryGreyHex,
    width:moderateScale(40,0.1),
    borderRadius:moderateScale(10,0.1),
    margin:moderateScale(10,0.1)
  },
  BackIconStyle:{
    alignSelf:'center',
    alignItems:'center'
  },
  HeartIconStyle:{
    backgroundColor:COLORS.primaryGreyHex,
    width:moderateScale(40,0.1),
    padding:moderateScale(6,0.1),
    borderRadius:moderateScale(10,0.1),
    margin:moderateScale(10,0.1)
  },
  ImageHeaderBarWithContainer:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  ImageHeaderBarWithoutContainer:{
    justifyContent:'flex-end',
    flexDirection:'row'
  },
  ImageInfoOuterContainer:{
    paddingVertical:SPACING.space_24,
    paddingHorizontal:SPACING.space_30,
    backgroundColor:COLORS.primaryBlackRGBA,
    borderTopLeftRadius:BORDERRADIUS.radius_20*2,
    borderTopRightRadius: BORDERRADIUS.radius_20*2
  },
  ImageInfoInnerContainer:{
    justifyContent:'space-between',
    gap:SPACING.space_15, 
  },
  InfoContainerRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  ItemPropertiesContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap: SPACING.space_20
  },
  ItemTitleText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_24,
    color:COLORS.primaryWhiteHex
  },
  ItemSubTitleText:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_12,
    color:COLORS.primaryWhiteHex
  },
  ProperFirst:{
    height:moderateScale(55,0.1),
    width:moderateScale(55,0.1),
    borderRadius:BORDERRADIUS.radius_20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:COLORS.primaryBlackHex
  },
  PropertyTextFirst:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_10,
    color:COLORS.primaryWhiteHex
  },
  RatingContainer:{
    flexDirection:'row',
    gap:SPACING.space_10,
    alignItems:'center'
  },
  RatingText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryWhiteHex
  },
  RatingCountText:{
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_12,
    color:COLORS.primaryWhiteHex
  },
  RoastedContainer:{
    height:55,
    width:55*2+SPACING.space_20,
    borderRadius:BORDERRADIUS.radius_20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:COLORS.primaryBlackHex
  },
  RoastedText:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_10,
    color:COLORS.primaryWhiteHex
  },
  PropertyTextLast:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_10,
    color:COLORS.primaryWhiteHex,
    marginTop: SPACING.space_2 + SPACING.space_4
  }

})

export default ImageBackgroundInfo