import React, {Component, Children, cloneElement} from 'react';
import {Text, ListItem, Radio, View, Label, Body} from 'native-base';
import {style} from '../stylesheets';

export function RadioButton({value = '', onPress = () => {}, active = ''}) {
  return (
    <ListItem onPress={() => onPress(value)} selected={active === value}>
      <Radio onPress={() => onPress(value)} selected={active === value} />
      <Body>
        <Text>{value}</Text>
      </Body>
    </ListItem>
  );
}

export class RadioField extends Component {
  render() {
    console.log('active:', this.props.active);
    const {label, onChange} = this.props;
    return (
      <View
        style={style.formItemContainer}>
        <Label>
          {label}
        </Label>
        {Children.map(this.props.children, child =>
          cloneElement(child, {
            onPress: value => onChange(value),
            active: this.props.active,
          }),
        )}
      </View>
    );
  }
}
