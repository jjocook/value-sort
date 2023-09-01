import React, { useState, useEffect } from 'react';
import './App.css';
import CardGrid from './components/CardGrid';

function App() {
  const [items, setItems] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch data from the data.txt file
    fetch('/data/data.txt')
      .then(response => response.text())
      .then(text => {
        // Process the text data as before
        const lines = text.split('\n');
        const keyValuePairs = lines.map(line => {
          const [key, value] = line.split(':');
          return { key: key.trim(), value: value.trim() };
        });
        setItems(keyValuePairs);
        setDataLoaded(true); // Mark data as loaded
      })
      .catch(error => console.log('Error fetching data:', error));

      console.log(`Items set at app level`)

  }, []);

  

  return (
    <div className="App">
      <h1>Value Sort</h1>
      {console.log(items)}
      {dataLoaded ? (
      <CardGrid data = {items}></CardGrid>
      ) : (<p>Loading Cards</p>)}
    </div>
  );
}

export default App;
