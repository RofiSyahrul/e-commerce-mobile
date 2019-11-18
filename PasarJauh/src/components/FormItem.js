import React from 'react';
import {Item, Label, Input, View} from 'native-base';
import {RadioField, RadioButton} from './Radio';
import {CheckboxField, CheckboxItem} from './Checkbox';
import {style} from '../stylesheets';

export function FormItem({
  label,
  type,
  value,
  onChange,
  active,
  values = [],
  rows = 1,
}) {
  switch (type) {
    case 'text':
      return (
        <View style={style.formItemContainer}>
          <Item stackedLabel>
            <Label style={{color: '#000'}} >{label}</Label>
            <Input value={value} onChangeText={onChange} />
          </Item>
        </View>
      );

    case 'numeric':
      return (
        <View style={style.formItemContainer}>
          <Item stackedLabel>
            <Label style={{color: '#000'}} >{label}</Label>
            <Input value={value} onChangeText={onChange} keyboardType="numeric" />
          </Item>
        </View>
      );

    case 'textarea':
      return (
        <View style={style.formItemContainer}>
          <Item stackedLabel>
            <Label style={{color: '#000'}}>{label}</Label>
            <Input
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={rows}
              style={{height: 20 * rows, textAlignVertical: 'top'}}
            />
          </Item>
        </View>
      );

    case 'radio':
      return (
        <RadioField label={label} onChange={onChange} active={active}>
          {values.map((value, i) => (
            <RadioButton key={i} value={value} />
          ))}
        </RadioField>
      );

    case 'checkbox':
      return (
        <CheckboxField label={label} onChange={onChange} active={active}>
          {values.map((value, i) => (
            <CheckboxItem key={i} value={value} />
          ))}
        </CheckboxField>
      );

    default:
      return <></>;
  }
}
