// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/
// Tutorial: https://www.youtube.com/watch?v=F8x-dyIsrJ8

import * as React from 'react';
import { StatusBar, Image, Animated, Text, View, StyleSheet } from 'react-native';
import { faker } from '@faker-js/faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.datatype.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
            'women',
            'men',
        ])}/${faker.datatype.number({
            min: 0,
            max: 60,
        })}.jpg`,
        name: faker.name.fullName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const BG_IMG =
    'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function FlatlistScreen() {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Image
                source={{ uri: BG_IMG }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={58}
            />
            <Animated.FlatList
                data={DATA}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42,
                }}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2),
                    ];

                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 1),
                    ];

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                    });

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                    });

                    return (
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                padding: SPACING,
                                marginBottom: SPACING,
                                borderRadius: 12,
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 10,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                transform: [{ scale }],
                                opacity,
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE,
                                    borderRadius: AVATAR_SIZE,
                                    marginRight: SPACING / 2,
                                }}
                            />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '700' }}>
                                    {item.name}
                                </Text>
                                <Text style={{ fontSize: 12, opacity: 0.7 }}>
                                    {item.jobTitle}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        opacity: 0.8,
                                        color: '#0099cc',
                                    }}
                                >
                                    {item.email}
                                </Text>
                            </View>
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
}
