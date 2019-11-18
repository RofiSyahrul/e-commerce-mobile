import React, {Component, Children, cloneElement} from 'react';
import {Text, ListItem, CheckBox, View, Label, Body} from 'native-base';
import {style} from '../stylesheets';

export function CheckboxItem({value = '', onPress = () => {}, active = []}) {
  return (
    <ListItem onPress={() => onPress(value)} selected={active.includes(value)}>
      <CheckBox
        onPress={() => onPress(value)}
        checked={active.includes(value)}
      />
      <Body>
        <Text>{value}</Text>
      </Body>
    </ListItem>
  );
}

export class CheckboxField extends Component {
  render() {
    const {label, onChange} = this.props;
    return (
      <View style={style.formItemContainer}>
        <Label>
          {label}
        </Label>
        {Children.map(this.props.children, child =>
          cloneElement(child, {
            onPress: value  => onChange(value),
            active: this.props.active,
          }),
        )}
      </View>
    );
  }
}
