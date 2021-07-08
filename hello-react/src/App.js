import React, {Component} from 'react';
import MyComponent from "./MyComponent";
//import Counter from "./Counter";
//import logo from './logo.svg';
//import './App.css';
//import Say from './Say';
//import EventPractice from "./EventPractice";
//import ValidationSample from "./ValidationSample";
//import ScrollBox from "./ScrollBox";
import IterationSample from "./IterationSample";


/*
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}
 */

/*
function App() {
    return (
        <div>
            <h1>리액트 안녕?</h1>
            <h2>잘 작동하나?</h2>
        </div>
    )
}


function App() {
    const name = 'Park';
    return (
        <>
            <h1>{name} 안녕?</h1>
            <h2>잘 작동하나?</h2>
        </>
    )
}


function App() {
    const name = '리액트';
    return <div>
        {name === '리액트' && <h1>리액트입니다.</h1>}
    </div>;
}


function App() {
    const name = undefined;
    return name || '값이 undefined입니다.';
}



const App = () => {
    return <Say/>;
};

 */

class App extends Component {
    render() {
        return (
            <IterationSample/>
        );
    }
}

export default App;
