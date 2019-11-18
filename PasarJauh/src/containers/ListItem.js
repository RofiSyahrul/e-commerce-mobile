import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, ActivityIndicator, View, Image} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Right,
  Fab,
  Button,
} from 'native-base';
import Item from './Item';
import {loadData} from '../actions/data';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: false,
      page: 1,
      hasMore: false,
      refreshing: false,
      search: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({splash: true});
  }

  componentDidMount() {
    this.props.loadItems(this.state.page, () => {
      this.setState({splash: false});
    });
  }

  renderSplashScreen = () => {
    return (
      <Container>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../splash-screen.png')} />
        </View>
      </Container>
    );
  };

  renderHome = () => {
    let {items} = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Pasar Jauh</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1}}>
          <FlatList
            data={items}
            keyExtractor={item => item.itemId.toString()}
            renderItem={({item}) => <Item {...item} />}
            onEndReached={this.fetchMoreItems}
            onEndReachedThreshold={0.8}
            initialNumToRender={items.length < 4 ? items.length : 4}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
          <Fab
            style={{backgroundColor: '#007bff'}}
            position="bottomRight"
            onPress={() => {
              this.props.navigation.navigate('Add');
            }}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  };

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
    return this.state.splash ? this.renderSplashScreen() : this.renderHome();
  }
}

const mapStateToProps = state => ({...state.data});

const mapDispatchToProps = dispatch => ({
  loadItems: (page = 1, callback = () => {}) =>
    dispatch(loadData({headers: {sortBy: '', limit: 4, page}}, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
