import React from 'react';
import './App.css';
import Search from './components/search';
import Page from './Page';

function App() {
  return (
    <div className="App">
      <div className="page-container">
        <Search/>
        <Page/>
      </div>
    </div>
  );
}

export default App;
