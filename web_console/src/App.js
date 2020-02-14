import React from 'react';
import './App.css';
import { APIViewSwitcher } from './router/APIViewSwitcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <APIViewSwitcher app={this}></APIViewSwitcher>
      </header>
    </div>
  );
}

export default App;
