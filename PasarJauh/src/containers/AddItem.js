import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Left,
  Button,
  Icon,
  Body,
  Title,
} from 'native-base';
import {connect} from 'react-redux';
import {addData} from '../actions/data';
import {FormItem} from '../components/FormItem';
import {convertPrice} from '../helpers/convertPrice';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      brand: '',
      title: '',
      description: '',
      price: '',
      stock: '',
      detail: '',
      capacities: [],
      sizes: [],
      images: [],
    };
  }

  handleChangeText = name => text =>
    this.setState({[name]: name === 'price' ? convertPrice(text) : text});
  handleCheckbox = name => value =>
    this.setState(prevState => ({
      [name]: prevState[name].includes(value)
        ? prevState[name].filter(val => val !== value)
        : [...prevState[name], value],
    }));

  selectSpecification = category =>
    category === 'Smartphone'
      ? {
          name: 'capacities',
          label: 'Capacity',
          type: 'checkbox',
          values: [16, 32, 64, 128, 256, 512].map(x => `${x} GB`),
          active: this.state.capacities,
        }
      : category === 'Fashion'
      ? {
          name: 'sizes',
          label: 'Size',
          type: 'checkbox',
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          active: this.state.sizes,
        }
      : {};

  render() {
    let forms = [
      {
        name: 'category',
        label: 'Category',
        type: 'radio',
        active: this.state.category,
        values: ['Smartphone', 'Fashion'],
      },
      {name: 'title', label: 'Title', type: 'text', value: this.state.title},
      {name: 'brand', label: 'Brand', type: 'text', value: this.state.brand},
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 2,
        value: this.state.description,
      },
      {name: 'price', label: 'Price', type: 'numeric', value: this.state.price},
      {name: 'stock', label: 'Stock', type: 'numeric', value: this.state.stock},
      this.selectSpecification(this.state.category),
      {
        name: 'detail',
        label: 'Detail Product',
        type: 'textarea',
        rows: 10,
        value: this.state.detail,
      },
      {name: 'images', label: 'Choose images', type: 'image'},
    ];

    forms = forms.map(form => ({
      ...form,
      onChange: ['text', 'numeric', 'textarea', 'radio'].includes(form.type)
        ? this.handleChangeText(form.name)
        : form.type === 'checkbox'
        ? this.handleCheckbox(form.name)
        : () => {},
    }));

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add Item</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            {forms.map((form, i) => (
              <FormItem key={i} {...form} />
            ))}
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addData(item)),
});

export default connect(null, mapDispatchToProps)(AddItem);
