import {connect} from 'react-redux';
import {loadDetail} from '../actions/detail';
import Item from '../components/Item';

const mapDispatchToProps = dispatch => ({
  showDetail: itemId => dispatch(loadDetail(itemId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Item);
