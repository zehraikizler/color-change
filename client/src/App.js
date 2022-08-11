import { useEffect, useState } from 'react';
import './App.css';
import Palette from './components/Palette';
import {init, subscribe} from './socketApi';

function App() {

  const [activeColor, setActiveColor] = useState("#f52905");

  useEffect(() => {
    init()

    subscribe((color) => {
      setActiveColor(color);
    })
  }, []);

  return (
    <div className="App" style={{backgroundColor: activeColor}}>
      <h3>
        Background Color Change
        <br/>
        {activeColor}
      </h3>
      <Palette activeColor={activeColor} />
    </div>
  );
}

export default App;
