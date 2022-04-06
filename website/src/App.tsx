import React, { useEffect } from 'react';
import './App.scss';
import { xorTest } from './nn_lib/test'

function App() {
  useEffect(() => {
    xorTest()
  }, [])
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
