import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import BGIcon from './BGIcon'

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
    name }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.secondaryGreyHex, COLORS.primaryBlackHex]}
        >
            <ImageBackground
                source={imagelink_square}
                style={styles.CardImageBG}
                resizeMode='cover'
            >
                <View style={styles.CardRatingContainer}>
                    <Icon
                        name={"star"}
                        size={FONTSIZE.size_16}
                        color={COLORS.primaryOrangeHex}
                    />
                    <Text style={styles.CardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
            <View style={styles.CardFooterRow}>
            <Text style={styles.CardPriceCurrency}>$
                <Text style={styles.CardPrice}>{price.price}</Text>
            </Text>
            <TouchableOpacity>
                <BGIcon 
                color={COLORS.primaryWhiteHex} 
                name={'plus'} 
                BGColor={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_10}
                />
            </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding:SPACING.space_15,
        borderRadius:BORDERRADIUS.radius_25,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden'
    },
    CardRatingContainer: {
        flexDirection:'row',
        backgroundColor:COLORS.primaryBlackRGBA,
        alignItems:'center',
        justifyContent:'center',
        gap:SPACING.space_10,
        paddingHorizontal:SPACING.space_10,
        position:'absolute',
        borderBottomLeftRadius:BORDERRADIUS.radius_20,
        borderTopRightRadius:BORDERRADIUS.radius_20,
        top:0,
        right:0
    },
    CardRatingText: {
        fontFamily:FONTFAMILY.poppins_medium,
        color:COLORS.primaryWhiteHex,
        fontSize:FONTSIZE.size_14,
        lineHeight:22
    },
    CardTitle:{
        fontFamily:FONTFAMILY.poppins_medium,
        color:COLORS.primaryWhiteHex,
        fontSize:FONTSIZE.size_16
    },
    CardSubtitle:{
        fontFamily:FONTFAMILY.poppins_light,
        color:COLORS.primaryWhiteHex,
        fontSize:FONTSIZE.size_10
    },
    CardFooterRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:SPACING.space_15
    },
    CardPriceCurrency:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_18,
        color:COLORS.primaryOrangeHex
    },
    CardPrice:{
        color:COLORS.primaryWhiteHex
    }
})

export default CoffeeCard

