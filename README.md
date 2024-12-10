<h1 align='center'>🧙‍♂️ React class-based components 🧙‍♂️</h1>
Class-bassed components were frequently used a time ago, for be more specifically in the versions behind 16.8 of React. In that version React added hooks and with that a more functional way to work based on functional components. 
In this project i will demonstrate how to translate that functional component to a class component and also take a look on where i can keep using class-based components and see how some hooks like useState(), useEffect(), useContext() works in a class way.

## ⚡️Functional component to class-based component

//Functional
const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};

//Class
import { Component } from 'react';
class User extends Component {
  constructor(){
  super()
  }
  
  render (){
  return <li className={classes.user}>{this.props.name}</li>;
  }
}

//Using a class component is the same thing
<User name={user.name} />

- Component must be imported
- User must extends Component ➡️ it allow to use all the methods from the parent (Component)
- constructor() ➡️ enables you to provide any custom initialization that must be done before any other methods can be called on an instantiated object.
- super() ➡️ call the constructor of its parent class to access the parent's properties and methods
- render() ➡️ inherit method that allow to rended the value within
- this ➡️ to refer our class prop context (props are automatically forwarded by react)

In the example above the constructor() and super() are not really needed because i don't want to provide some custom initialization or change some parent inherited property like state.

### ⚡️useState()
//Functional
import { useState } from 'react';

const Users = () => {

  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>
      {showUsers && usersList}
    </div>
  )

//Class
class Users extends Component {
  constructor() {
    super();
    this.state = { showUsers: true }
  }

  toggleUsersHandler() {
    this.setState((prevState) => {
      return { showUsers: !prevState.showUsers }
    })
  }

  render() {
  ...
  return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    )
  }

Changes i need to do to manage state in my class showed above are:
- this.state ➡️ inherit property from Component which his value will always must be an object {}
- toggleUsersHandler() ➡️ as my class method and also using the keyword this to refer my class context
- this.state.showUsers ➡️ always refer to the state on my class
- bind() ➡️ to pass data as an argument to the function of a class based component

If you want to know more about bind take a look on this links
[https://www.geeksforgeeks.org/reactjs-bind-method/](ReactJS-Bind-Method-GG)
[https://stackoverflow.com/questions/60774235/what-does-bindthis-is-exactly-doing-in-this-example-of-the-react-app#:~:text=%22bind%22%20method%20is%20used%20to,the%20value%20of%20parent%20component.](ReactJS-Bind-Method-StackOverflow)




<p align="center">🌟 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🌟</p>
