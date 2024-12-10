<h1 align='center'>🧙‍♂️ React class-based components 🧙‍♂️</h1>

Class-based components were used a lot a while ago, more specifically in versions prior to React 16.8. In that version React added hooks and with that a more functional way of working based on functional components.

In this project I will demonstrate how to translate functional components to class components and also where one can continue using class based components and how to use some class oriented hooks like <code>useState()</code>, <code>useEffect()</code>, <code>useContext()</code>.

## ⚡️Functional component to class-based component
```javascript
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
```

- <code>Component</code> must be imported from React
- <code>User</code> must <code>extends Component</code> ➡️ it allow to use all the methods from the parent (Component)
- <code>constructor()</code> ➡️ enables you to provide any custom initialization that must be done before any other methods can be called on an instantiated object.
- <code>super()</code> ➡️ call the constructor of its parent class to access the parent's properties and methods
- <code>render()</code> ➡️ inherited method that allows to render the value inside
- <code>this</code> ➡️ to refer our class props context (props are automatically forwarded by react)

In the example given above the <code>constructor()</code> and <code>super()</code> are not really needed because i don't want to provide any custom initialization or change any inherited property like <code>state</code> from the parent.

### ⚡️<code>useState()</code>
```javascript
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
```

The changes I need to make to manage state in my class shown above are:
- <code>this.state</code> ➡️ property inherited from the Component whose value must always be an object {}
- <code>toggleUsersHandler()</code> ➡️ as my class method and also using the keyword this to refer my class context
- <code>this.state.showUsers</code> ➡️ always refer to the state on my class
- <code>bind()</code> ➡️ to pass data as an argument to the function of a class based component for context purposes

> [!NOTE]
> You can avoid use "bind" syntax if you use arrow function syntax instead ➡️ <code>toggleUsersHandler() = () => { ... };</code>

If you want to know more about bind take a look on these links

[ReactJS-Bind-Method-GG](https://www.geeksforgeeks.org/reactjs-bind-method/)

[ReactJS-Bind-Method-StackOverflow](https://stackoverflow.com/questions/60774235/what-does-bindthis-is-exactly-doing-in-this-example-of-the-react-app#:~:text=%22bind%22%20method%20is%20used%20to,the%20value%20of%20parent%20component.)

### ⚡️<code>useEffect()</code>
```javascript
//Class
class UserFinder extends Component {
    constructor() {
        super()
        this.state = { filteredUsers: DUMMY_USERS, searchTerm: '' }
    }

    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value })
    }

    //Loading users when component is rendered
    componentDidMount() {
        this.setState({ filteredUsers: DUMMY_USERS })
    }

    //Updating users with state/props changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({ filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm)) })
        }
    }

    render() {...}
}
```
When using <code>useEffect()</code> on class-based component there are 3 main methods that allow me to handle that hook:

- <code>componentDidMount()</code> ➡️ equivalent to <code>useEffect()</code> without deps, only executed once the component is rendered.
- <code>componentDidUpdate()</code> ➡️ equivalent to <code>useEffect()</code> with deps, it is executed every time a property or state changes. We also need to manage those changes and what will happen next.
- <code>componentWillUnmount()</code> ➡️ equivalent to <code>useEffect()</code> cleanup function, executed when the component is unmounted

This is a example of <code>componentWillUnmount()</code>
```javascript
class User extends Component {
  ...
  componentWillUnmount() {
    console.log('User component unmounted')
  }
  ...
}
```

### ⚡️Using Context in Class-based components
```javascript
//First i create my context on my standalone context file
import React from 'react';

const UsersContext = React.createContext({
    users: []
});

export default UsersContext;
```
```javascript
//Then i wrap a parent component in common with all the update state logic
import UsersContext from './store/users-context';

function App() {
  const usersContext = {
    users: DUMMY_USERS
  }

  return (
    <UsersContext.Provider value={usersContext}>
      <UserFinder />
    </UsersContext.Provider>
  );
}
```
```javascript
//Last, use the context in the child component i want
import UsersContext from '../store/users-context';
class UserFinder extends Component {
    ...
    //defining context
    static contextType = UsersContext; //always must be static contextType prop
    ...
    //state
    constructor() {
        super()
        this.state = { filteredUsers: [], searchTerm: '' }
    }
    ...
    //using the context
    componentDidMount() {
        this.setState({ filteredUsers: this.context.users })
    }
```
### ⚡️Error Boundaries
This is probably the main reason to use a class-based component nowadays, as React doesn't support error handling yet (it could barely be implemented using try catch or something like that)
```javascript
//Create your error boundary as a class component and handle all error logic within it.
class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = { hasError: false }
    }
    
    componentDidCatch(error) {
        console.log(error)
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong D:</p>
        }
        return this.props.children //If no error catched just return the children component value
    }
}
```
- <code>componentDidCatch()</code> ➡️ catches exceptions generated in child components.

```javascript
// Wrap child components where errors should occur
import ErrorBoundary from './ErrorBoundary';
<ErrorBoundary><Users users={this.state.filteredUsers} /></ErrorBoundary>

//Dummy error on Users.js
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error('No users provided')
    }
  }
```
So if an error occurs in a child component that is wrapped with my error-component boundary class with all the error logic, this would be rendered:
```javascript
render() {
        if (this.state.hasError) {
            return <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong D:</p> //This message will be seen by the user
        }
        return this.props.children
    }
```
---
<p align="center">🌟 This project is a practice exercise I learned from the <a href='https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=ST7MT110524'>Academind's React Course</a> 🌟</p>
