import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import NavigationMenu from './components/navigation_menu/NavigationMenus';
import MenuBar from './components/navigation_menu/MenuBar';
function App() {
  return (
    <div className="App">
      <NavigationMenu/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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

export default App;
