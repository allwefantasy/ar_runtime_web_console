import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { APIViewSwitcher } from './router/APIViewSwitcher';

function App() {
  return (
    <div className="App">
        <APIViewSwitcher app={this}></APIViewSwitcher>
    </div>
  );
}

export default App;
