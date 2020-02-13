import React from 'react';
import './App.css';
import { HelloSwitcher } from './router/HelloSwitcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloSwitcher app={this}></HelloSwitcher>
      </header>
    </div>
  );
}

export default App;
