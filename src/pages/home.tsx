import { Button } from '@mui/material';
import { useState } from 'react';

import blockletLogo from '../assets/blocklet.svg';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import api from '../libs/api';
import './home.css';

function Home() {
  const [count, setCount] = useState(0);

  async function getApiData() {
    // const { data } = await api.get('/api/user/1');
    // alert(`Message from api: ${JSON.stringify(data, null, 2)}`);

    const { data } = await api.put('/api/user/1', {
      name: 'Jo',
      email: 'joh',
      phone: 12345678901,
    });
    alert(`Message from api: ${JSON.stringify(data, null, 2)}`);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
      </div>
      <h1>Vite + React + Blocklet</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((currentCount) => currentCount + 1)}>
          count is {count}
        </button>
        <br />
        <br />
        <Button type="button" onClick={() => getApiData()}>
          Get API Data
        </Button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default Home;
