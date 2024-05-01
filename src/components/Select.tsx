import { useState } from 'react'
import { navigate } from 'astro:transitions/client'

import {useAsync} from 'react-use';

  


export default function Form() {
  const [selectedDemo, setSelectedDemo] = useState('/')
  // const [prevSection, setPrevSelection] = useState('/')


  useAsync(async ()  => {
    await navigate(selectedDemo).then(() => {
      // console.log('navigated to', selectedDemo)
    }).catch((err) => {
      console.error('error navigating to', selectedDemo, err)
    })

  }, [selectedDemo])



  return (
    <>
<label id="label1" htmlFor="demo" className='visually-hidden'>Label 1</label>
 
      <select
        id='demo'
        onChange={(ev) => setSelectedDemo(ev.target.value)}
        title="see a layout"
        defaultValue={selectedDemo}
        size={1}
      >
        <option value="/demo/cluster-demo">cluster</option>
        <option value="/demo/sidebar-demo">sidebar</option>
        <option value="/demo/switcher-demo">switcher-demo</option>
        <option value="/demo/grid-demo">grid-demo</option>
        <option value="/demo/reel-demo">reel-demo</option>
        <option value="/demo/imposter-demo">imposter-demo</option>
        <option value="/demo/harmonic-demo">harmonic-demo</option>
      </select>
</>
  )
}
