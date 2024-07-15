import { useState } from 'react';
import { navigate } from 'astro:transitions/client';
import './Select.css';

import { useAsync } from 'react-use';

const DEFAULT_VAL = 'Select.tsx';

export default function Form() {
  const [selectedDemo, setSelectedDemo] = useState('/');
  // const [prevSection, setPrevSelection] = useState('/')

  useAsync(async () => {
    await navigate(selectedDemo)
      .then(() => {
        console.log('navigated to', selectedDemo);
      })
      .catch((err) => {
        console.error('error navigating to', selectedDemo, err.message);
      });
  }, [selectedDemo]);

  return (
    <label id="label1" htmlFor="demo">
      <select
        id="demo"
        onChange={(ev) => {
          setSelectedDemo(ev.target.value);
        }}
        title="see a layout"
        defaultValue={selectedDemo}
        size={1}
      >
        <option value="/">{DEFAULT_VAL}</option>
        <option value="/">select</option>
        <option value="/demo/parrallex">para</option>
        <option value="/demo/cluster-demo">cluster</option>
        <option value="/demo/sidebar-demo">sidebar</option>
        <option value="/demo/switcher-demo">switcher-demo</option>
        <option value="/demo/grid-demo">grid-demo</option>
        <option value="/demo/reel-demo">reel-demo</option>
        <option value="/demo/imposter-demo">imposter-demo</option>
        <option value="/demo/harmonic-demo">harmonic-demo</option>
        <option value="/demo/colums-demo">colums-demo</option>
      </select>
    </label>
  );
}


