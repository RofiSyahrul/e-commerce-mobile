import React from 'react';
import {Image, Text, View} from 'react-native';
import {DeckSwiper, Card, CardItem, Button, Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import {convertPrice} from '../helpers/convertPrice';

export default function Item({
  itemId,
  filenames,
  title,
  rate,
  description,
  price,
  testimonials,
  showDetail,
}) {
  return (
    <Card>
      <CardItem header>
        <DeckSwiper
          dataSource={filenames}
          renderItem={filename => (
            <Image
              source={{uri: filename}}
              style={{width: 400, height: 'auto'}}
            />
          )}
        />
      </CardItem>
      <CardItem cardBody>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>{title}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 3, flexDirection: 'col'}}>
            <Rating readonly startingValue={rate} />
          </View>
          <View style={{flex: 1, flexDirection: 'col'}}>
            <Text>{rate}</Text>
          </View>
          <View style={{flex: 2, flexDirection: 'col'}}>
            <Icon name="person" />
            <Text>{testimonials ? testimonials.length : 0}</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>{description}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon name="pricetag" />
          <Text>{convertPrice(price)}</Text>
        </View>  
      </CardItem>
      <CardItem footer>
        <Button primary rounded iconLeft onPress={() => showDetail(itemId)}>
          <Icon name="information-circle" />
          <Text>Details</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
