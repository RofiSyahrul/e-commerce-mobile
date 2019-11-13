/*  adapted from: https://blog.binoy.io/simple-carousel-in-react-native-ae71cac279de
 and https://medium.com/the-react-native-log/custom-scrolling-carousel-in-react-native-15ee129e7e68 */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {shuffle} from '../helpers/array';

const {width} = Dimensions.get('screen');
const height = width * 0.8;
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

export class ImageSlider1 extends Component {
  render() {
    let {images} = this.props;
    const isArray = images instanceof Array;
    images = isArray && shuffle(images); // shuffle images array
    return (
      isArray && (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            alwaysBounceHorizontal
            showsHorizontalScrollIndicator={true}>
            {images.map(image => (
              <Image key={image} style={styles.image} source={{uri: image}} />
            ))}
          </ScrollView>
        </View>
      )
    );
  }
}

export default class ImageSlider extends Component {
  animVal = new Animated.Value(0);

  renderImagesAndBars = () => {
    let {images} = this.props;
    const isArray = images instanceof Array;
    images = isArray && shuffle(images); // shuffle images array

    const numItems = isArray ? images.length : 0;
    const barItemWidth =
      numItems > 0
        ? FIXED_BAR_WIDTH / numItems - (numItems - 1) * BAR_SPACE
        : 0;

    return (
      isArray &&
      images.map((image, i) => {
        const thisImage = (
          <Image key={i} style={styles.image} source={{uri: image}} />
        );

        const scrollBarVal = this.animVal.interpolate({
          inputRange: [width * (i - 1), width * (i + 1)],
          outputRange: [-barItemWidth, barItemWidth],
          extrapolate: 'clamp',
        });

        const thisBar = (
          <View
            key={`bar${i}`}
            style={[
              styles.track,
              {
                width: barItemWidth,
                marginLeft: i === 0 ? 0 : BAR_SPACE,
              },
            ]}>
            <Animated.View
              style={[
                styles.bar,
                {
                  width: barItemWidth,
                  transform: [{translateX: scrollBarVal}],
                },
              ]}
            />
          </View>
        );

        return {image: thisImage, bar: thisBar};
      })
    );
  };

  render() {
    const imagesAndBars = this.renderImagesAndBars();
    return (
      imagesAndBars && (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={100}
            pagingEnabled
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {x: this.animVal}}},
            ])}>
            {imagesAndBars.map(obj => obj.image)}
          </ScrollView>
          <View style={styles.barContainer}>
            {imagesAndBars.map(obj => obj.bar)}
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: height,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
