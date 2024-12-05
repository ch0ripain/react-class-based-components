import { Component } from 'react';
import classes from './User.module.css';

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

class User extends Component {

  componentWillUnmount() {
    console.log('User component unmounted')
  }

  componentDidMount() {
    console.log('User component mounted')
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

export default User;
