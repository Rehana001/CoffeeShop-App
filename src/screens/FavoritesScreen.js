import { StyleSheet, Text, View,StatusBar,ScrollView,TouchableOpacity} from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import EmptyListAnimation from '../components/EmptyListAnimation'
import HeaderBar from '../components/HeaderBar'
import FavoritesItemCard from '../components/FavoritesItemCard'

const FavoritesScreen = ({navigation}) => {
const FavoritesList = useStore((state)=>state.FavoritesList);
const tabBarHeight= useBottomTabBarHeight();
const deleteFromFavoriteList = useStore((state) => state.deleteFromFavoriteList);
const addToFavoriteList = useStore((state) => state.addToFavoriteList);
const ToggleFavourite = (favourite, type, id) => {
  favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
};

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />

            {FavoritesList.length === 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((data) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                   <FavoritesItemCard
                   id={data.id}
                   imagelink_portrait={data.imagelink_portrait}
                   name={data.name}
                   special_ingredient={data.special_ingredient}
                   type={data.type}
                   ingredients={data.ingredients}
                   average_rating={data.average_rating}
                   ratings_count={data.ratings_count}
                   roasted={data.roasted}
                   description={data.description}
                   favourite={data.favourite}
                   ToggleFavouriteItem={ToggleFavourite}

                   />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
})