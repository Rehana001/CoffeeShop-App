import { StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList,Dimensions ,ToastAndroid} from 'react-native'
import React, { useState, useRef } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import CoffeeCard from '../components/CoffeeCard'


const getCategoriesFromData = (data) => {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
}

const getCoffeeList = (category, data) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item) => item.name == category);
    return coffeelist;
  }
}

const HomeScreen = ({navigation}) => {
  const CoffeeList = useStore(state => state.CoffeeList);
  const BeansList = useStore(state => state.BeansList);
  console.log("COFFEELIST", CoffeeList)
  console.log("BEANLIST", BeansList)
  const addToCart = useStore((state) => state.addToCart);
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState("")
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[1]
  })
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );

  const ListRef = useRef();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0
      });
      setCategoryIndex({ index: 0, category: categories[0] })
      setSortedCoffee([
        ...CoffeeList.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )]
      )
    }
  };

  const resetSearchCoffee = () => {
    ListRef?.current.scrollToOffset({
      animated: true,
      offset: 0
    })
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  }

  const CoffeeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices}) =>{
    addToCart({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${name} is Added to Cart`,ToastAndroid.SHORT,ToastAndroid.CENTER)
  }


  console.log("Sorted Coffee= ", sortedCoffee.length);

  return (
    <ScrollView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>

        {/*Search Input*/}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={()=>{
            searchCoffee(searchText);
          }}>
            <Icon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity>
          <TextInput placeholder="Find your Coffee ...."
            value={searchText}
            onChangeText={text => {
              setSearchText(text)
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 ? 
          <TouchableOpacity onPress={()=>{
            resetSearchCoffee();
          }}>
            <Icon2
              style={styles.InputIcon}
              name="cross"
              size={FONTSIZE.size_16}
              color={COLORS.primaryLightGreyHex} />
          </TouchableOpacity> : <></>}
        </View>

        {/*Category Scroller*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollviewStyle}
        >
          {categories.map((data, index) => (
            <View key={index.toString()}
              style={styles.CategoryScrollViewContainer}
            >
              <TouchableOpacity
                style={styles.CategoryScrollViewItems}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  })
                  setCategoryIndex({ index: index, category: categories[index] })
                  setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
                }}>
                <Text
                  style={[styles.CategoryText,
                  categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {},
                  ]}
                >{data}</Text>
                {categoryIndex.index == index ? <View style={styles.ActiveCategory} /> : <></>}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/*Coffee Flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatlistContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { 
            navigation.push('Details',{
              index:item.index,
              id:item.id,
              type:item.type
            });
            }}>
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                name={item.name} 
                buttonPressHandler={CoffeeCardAddToCart}
                />
            </TouchableOpacity>
          }}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Beans List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeansList}
          contentContainerStyle={[styles.FlatlistContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => {
              navigation.push('Details',{
                index:item.index,
                id:item.id,
                type:item.type
              });
             }}>
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeeCardAddToCart}
                name={item.name} />
            </TouchableOpacity>
          }}
        />
      </ScrollView>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  InputContainerComponent: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center'
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,

  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  CategoryScrollviewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  CategoryScrollViewItems: {
    alignItems: 'center'
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  FlatlistContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex
  },
  EmptyListContainer:{
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:SPACING.space_36 * 3.6,
  }

})