import React from 'react'
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export const CardImage = ({ props }) => {
    const { data, index } = props;
    return (
        <View key={index} style={localStyles.outfitCard}>
            <Card style={localStyles.card}>
                <View style={localStyles.imageContainer}>
                    <Card.Cover
                        source={{ uri: data.image }}
                        style={localStyles.cardImage}
                    />
                    <LinearGradient
                        colors={['transparent', 'white']}
                        style={localStyles.imageGradient}
                    />
                </View>
                <Card.Content style={localStyles.cardContent}>
                    <Text style={localStyles.outfitTitle}>{data.label}</Text>
                    <Text style={localStyles.outfitDescription}>
                        {data.description}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    )
}

const localStyles = StyleSheet.create({
    outfitCard: {
        width: 280,
        marginRight: 12,
    },
    card: {
        backgroundColor: 'hsla(0, 0%, 100%, 1.00)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,

    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 180,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
    },
    cardImage: {
        height: 180,
        resizeMode: 'cover',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    cardContent: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    outfitTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    outfitDescription: {
        fontSize: 14,
        color: '#4a4a4a',
    },
});