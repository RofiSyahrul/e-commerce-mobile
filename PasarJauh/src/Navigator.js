import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ListItem from './containers/ListItem';
import AddItem from './containers/AddItem';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: ListItem},
    Add: {screen: AddItem},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  },
);

export default createAppContainer(MainNavigator);
