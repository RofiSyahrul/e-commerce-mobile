import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Title,
  Content,
} from 'native-base';
import Item from './Item';
import {loadData} from '../actions/data';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {page: 1, hasMore: false, refreshing: false};
  }

  componentDidMount() {
    this.props.loadItems();
  }

  fetchMoreItems = () => {
    const {pagination, loadItems} = this.props;
    const {numOfPages} = pagination;
    if (this.state.page >= numOfPages) {
      this.setState({hasMore: false});
      return;
    }
    this.setState(
      state => ({page: state.page + 1, hasMore: true}),
      () => {
        loadItems(this.state.page);
      },
    );
  };

  renderFooter = () => {
    if (this.state.hasMore)
      return (
        <View
          style={{
            position: 'relative',
            paddingVertical: 20,
            borderTopWidth: 1,
            marginTop: 10,
            marginBottom: 10,
            borderColor: '#f2f2f2',
          }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    return (
      <View
        style={{
          borderBottomColor: '#007bff',
          borderBottomWidth: '100%',
        }}
      />
    );
  };

  handleRefresh = () => {
    this.setState({page: 1, refreshing: true}, () => {
      this.props.loadItems();
      this.setState({refreshing: false});
    });
  };

  render() {
    let {items} = this.props;
    let item = items[0];

    return (
      <Container>
        <Header
          androidStatusBarColor="#007bff"
          iosBarStyle="light-content"
          style={{backgroundColor: '#007bff'}}>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Pasar Jauh</Title>
          </Body>
        </Header>
        {/* <Content>{item && <Item {...item} />}</Content> */}
        <FlatList
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          }}
          data={items}
          keyExtractor={item => item.itemId.toString()}
          renderItem={({item}) => <Item {...item} />}
          onEndReached={this.fetchMoreItems}
          onEndReachedThreshold={0.8}
          initialNumToRender={items.length < 4 ? items.length : 4}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />
        {/* <Footer>
          <Icon name="copyright" type="MaterialIcons" />
          <Text>Rofi</Text>
        </Footer> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({...state.data});

const mapDispatchToProps = dispatch => ({
  loadItems: (page = 1) =>
    dispatch(loadData({headers: {sortBy: '', limit: 4, page}})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);
