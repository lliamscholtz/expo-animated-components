// Tutorial: https://www.youtube.com/watch?v=vQNg06Hf0MQ
// Credit: Catalin Miron

import * as React from 'react';
import {
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Animated,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;
const DESTINATION_SCREEN = 'Library';

const slides = [
    {
        title: 'Time is what determines security. With enough time nothing is unhackable.',
        text: 'Aniekee Tochukwu Ezekiel',
        initialBgColor: '#03DAC6',
        bgColor: '#222',
        nextBgColor: '#222',
    },
    {
        title: 'Never underestimate the determination of a kid who is time-rich and cash-poor.',
        text: 'Cory Doctorow',
        initialBgColor: '#03DAC6',
        bgColor: '#222',
        nextBgColor: 'yellowgreen',
    },
    {
        title: 'For every lock, there is someone out there trying to pick it or break in.',
        text: 'David Bernstein',
        initialBgColor: '#222',
        bgColor: 'yellowgreen',
        nextBgColor: 'midnightblue',
    },
];

const Circle = ({ onPress, index, slides, animatedValue, animatedValue2 }) => {
    const { initialBgColor, nextBgColor, bgColor } = slides[index];
    const inputRange = [0, 0.001, 0.5, 0.501, 1];
    const backgroundColor = animatedValue2.interpolate({
        inputRange,
        outputRange: [
            initialBgColor,
            initialBgColor,
            initialBgColor,
            bgColor,
            bgColor,
        ],
    });
    const dotBgColor = animatedValue2.interpolate({
        inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
        outputRange: [
            bgColor,
            bgColor,
            bgColor,
            initialBgColor,
            initialBgColor,
            nextBgColor,
        ],
    });

    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                styles.container,
                { backgroundColor },
            ]}
        >
            <Animated.View
                style={[
                    styles.circle,
                    {
                        backgroundColor: dotBgColor,
                        transform: [
                            { perspective: 200 },
                            {
                                rotateY: animatedValue2.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: ['0deg', '-90deg', '-180deg'],
                                }),
                            },

                            {
                                scale: animatedValue2.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1, 6, 1],
                                }),
                            },

                            {
                                translateX: animatedValue2.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 50, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <TouchableOpacity onPress={onPress}>
                    <Animated.View
                        style={[
                            styles.button,
                            {
                                transform: [
                                    {
                                        scale: animatedValue.interpolate({
                                            inputRange: [0, 0.05, 0.5, 1],
                                            outputRange: [1, 0, 0, 1],
                                            // extrapolate: "clamp"
                                        }),
                                    },
                                    {
                                        rotateY: animatedValue.interpolate({
                                            inputRange: [0, 0.5, 0.9, 1],
                                            outputRange: [
                                                '0deg',
                                                '180deg',
                                                '180deg',
                                                '180deg',
                                            ],
                                        }),
                                    },
                                ],
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 0.05, 0.9, 1],
                                    outputRange: [1, 0, 0, 1],
                                }),
                            },
                        ]}
                    >
                        <AnimatedAntDesign
                            name="arrowright"
                            size={28}
                            color={'white'}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

export default function PerspectiveButtonScreen({ navigation }) {
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const animatedValue2 = React.useRef(new Animated.Value(0)).current;
    const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const inputRange = [...Array(slides.length).keys()];
    const [index, setIndex] = React.useState(0);

    const animate = (i) =>
        Animated.parallel([
            Animated.timing(sliderAnimatedValue, {
                toValue: i,
                duration: TEXT_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue2, {
                toValue: 1,
                duration: DURATION,
                useNativeDriver: false,
            }),
        ]);

    const onPress = () => {
        if (index + 1 === slides.length) {
            navigation.navigate(DESTINATION_SCREEN);
            return;
        }
        animatedValue.setValue(0);
        animatedValue2.setValue(0);
        animate((index + 1) % slides.length).start();
        setIndex((index + 1) % slides.length);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 100 }}>
            <StatusBar hidden />
            <Circle
                index={index}
                onPress={onPress}
                slides={slides}
                animatedValue={animatedValue}
                animatedValue2={animatedValue2}
            />
            <Animated.View
                style={{
                    flexDirection: 'row',
                    transform: [
                        {
                            translateX: sliderAnimatedValue.interpolate({
                                inputRange,
                                outputRange: slides.map((_, i) => -i * width * 2),
                            }),
                        },
                    ],
                    opacity: sliderAnimatedValue.interpolate({
                        inputRange: [...Array(slides.length * 2 + 1).keys()].map(
                            (i) => i / 2
                        ),
                        outputRange: [...Array(slides.length * 2 + 1).keys()].map(
                            (i) => (i % 2 === 0 ? 1 : 0)
                        ),
                    }),
                }}
            >
                {slides.slice(0, slides.length).map(({ title, text }, i) => {
                    return (
                        <View
                            style={{ paddingRight: width, width: width * 2 }}
                            key={i}
                        >
                            <Text
                                style={[
                                    styles.paragraph,
                                    { color: slides[i].nextBgColor },
                                ]}
                            >
                                {title}
                            </Text>
                            <Text
                                style={[
                                    styles.paragraph,
                                    {
                                        color: slides[i].nextBgColor,
                                        fontSize: 14,
                                        fontWeight: 'normal',
                                        opacity: 0.8,
                                    },
                                ]}
                            >
                                {text}
                            </Text>
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        paddingBottom: 50,
    },
    paragraph: {
        margin: 12,
        fontSize: 24,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Menlo',
        color: 'white',
    },
    button: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        backgroundColor: 'turquoise',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
