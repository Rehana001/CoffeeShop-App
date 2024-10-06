import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import CartScreen from '../screens/CartScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../theme/theme'
import { moderateScale } from 'react-native-size-matters'
import { BlurView } from '@react-native-community/blur'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground: () => (
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
            )
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <EntypoIcon
                            name="home"
                            size={20}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}>
            </Tab.Screen>
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <EntypoIcon
                            name="shopping-cart"
                            size={20}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}></Tab.Screen>
            <Tab.Screen
                name="Favorite"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <IonIcons
                            name="heart"
                            size={20}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="History"
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <EntypoIcon
                            name="bell"
                            size={20}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                        />
                    )
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: moderateScale(70, 0.1),
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyles: {
        position: 'absolute',
        top:0,
        bottom:0,
        borderRadius:0,
        left: 0,
        right: 0
       
    }
})