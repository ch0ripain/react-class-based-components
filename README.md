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


<p align="center">🌟 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🌟</p>
