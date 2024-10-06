import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';


const DetailsScreen = ({ navigation, route }) => {
  const ItemOfIndex = useStore((state) => route.params.type == 'Coffee' ? state.CoffeeList : state.BeansList
  )[route.params.index];
  console.log('route ', route)


  const addToFavoriteList = useStore((state) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state) => state.deleteFromFavoriteList);

  const [price,setPrice] =useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const ToggleFavourite = (favourite, type, id) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id)
  }

  const BackHandler = () => {
    navigation.pop();
  }


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          ingredients={ItemOfIndex.ingredients}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.Infotitles}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => { setFullDesc(prev => !prev) }}
            >
              <Text
                style={styles.DescriptionText}
              >
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => { setFullDesc(prev => !prev) }}
            >
              <Text
                numberOfLines={3}
                style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}

          <Text style={styles.Infotitles}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data)=>(
              <TouchableOpacity key={data.size}
              onPress={()=>{
                setPrice(data);
              }}
               style={[styles.SizeBox,{
                borderColor: data.size == price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex,
              }]}>
                <Text style={[styles.SizeText,{
                  fontSize:ItemOfIndex.type=="bean" ?FONTSIZE.size_14 : FONTSIZE.size_16,
                  color:data.size == price.size ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
                  }]}>{data.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter price={price} buttonTitle='Add to Cart' buttonPressHandler={() => {}}/>
      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  Infotitles: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30
  },
  SizeOuterContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    gap:SPACING.space_20
  },
  SizeBox:{
    flex:1,
    backgroundColor:COLORS.primaryDarkGreyHex,
    alignItems:'center',
    justifyContent:'center',
    height:SPACING.space_24*2,
    borderRadius:BORDERRADIUS.radius_10,
    borderWidth:2
  },
  SizeText:{
    fontFamily:FONTFAMILY.poppins_medium,

  }
})