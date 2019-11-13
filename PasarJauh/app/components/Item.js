import React from 'react';
import {Card, CardItem, Button, Icon, H2, Text, H3} from 'native-base';
import {Rating} from 'react-native-ratings';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {convertPrice} from '../helpers/convertPrice';
import ImageSlider from './ImageSlider';

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
    <Card style={{flex: 1}}>
      <CardItem header>
        <ImageSlider images={filenames} />
      </CardItem>
      <CardItem cardBody style={{marginHorizontal: 20, marginBottom: 10}}>
        <Grid>
          <Row>
            <H2>{title}</H2>
          </Row>
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Rating readonly startingValue={rate} imageSize={25} />
            <Text style={{flexWrap: 'wrap'}}>
              {rate} (
              <Icon name="person" type="Ionicons" style={{fontSize: 15}} />{' '}
              {testimonials.length})
            </Text>
          </Row>
          <Row style={{marginBottom: 10}}>
            <Text>{description}</Text>
          </Row>
          <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <Icon name="pricetag" type="Ionicons" style={{fontSize: 30}} />
            <H3>{convertPrice(price)}</H3>
          </Row>
        </Grid>
      </CardItem>
      <CardItem footer>
        <Button primary rounded block onPress={() => {}}>
          <Icon name="information-circle" type="Ionicons" />
          <Text>{' Detail'}</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
