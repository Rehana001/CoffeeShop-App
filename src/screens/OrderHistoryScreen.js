// import { StyleSheet, Text, View ,StatusBar,ScrollView} from 'react-native'
// import React,{useState} from 'react'
// import { useStore} from '../store/store';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
// import { COLORS, SPACING } from '../theme/theme';
// import HeaderBar from '../components/HeaderBar';
// import EmptyListAnimation from '../components/EmptyListAnimation';
// import OrderHistoryCard from '../components/OrderHistoryCard';
// import PopUpAnimation from '../components/PopUpAnimation';


// const OrderHistoryScreen = () => {
//   const [showAnimation, setShowAnimation]= useState(false);
//   const OrderHistoryList = useStore((state)=>state.OrderHistoryList);
//   const tabBarHeight = useBottomTabBarHeight();
//   // console.log("History =",OrderHistoryList.length)
//   return (
//     <View style={styles.ScreenContainer}>
//       <StatusBar backgroundColor={COLORS.primaryBlackHex}/>

//       {showAnimation? 
//       <PopUpAnimation 
//         style={styles.LottieAnimation}
//        source={require('../lottie/successful.json')}/> : <></>}
      
//       <ScrollView 
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.ScrollViewFlex}>
//         <View 
//         style={[styles.ScrollViewInnerView,
//         {marginBottom:tabBarHeight}]}>
//           <View style={styles.ItemContainer}>
//           <HeaderBar title="Order History" />

//           {OrderHistoryList.length === 0 ? (
//               <EmptyListAnimation title={'No Order History'} />
//             ) : (
//               <View style={styles.ListItemContainer}>
//                 {OrderHistoryList.map((data,index)=>{
//                   <OrderHistoryCard 
//                   key={index.toString()} 
//                   navigationHandler={()=>{}} 
//                   CartItem={data.CartItems}
//                   CartListPrice={data.CartListPrice}
//                   OrderDate={data.OrderDate} 
//                   />
//                 })}
//                 </View>
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// export default OrderHistoryScreen

// const styles = StyleSheet.create({
//   ScreenContainer:{
//     flex:1,
//     backgroundColor: COLORS.primaryBlackHex
//   },
//   ScrollViewFlex:{
//     flexGrow:1
//   },
//   ScrollViewInnerView:{
//        flex:1,
//     justifyContent:'space-between'
//   },
//   ItemContainer:{
//     flex:1
//   },
//   ListItemContainer: {
//     paddingHorizontal: SPACING.space_20,
//     gap: SPACING.space_30,
//   },
//   LottieAnimation:{
//     height:250,
//   }

// })

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({ navigation }) => {
  const OrderHistoryList = useStore((state) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({ index, id, type }) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title="No Order History" />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data, index) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={buttonPressHandler}>
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieAnimation: {
    height: 250,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },
  DownloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});

export default OrderHistoryScreen;
