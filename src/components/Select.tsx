import { useState, useEffect } from 'react'
import { navigate } from 'astro:transitions/client'

export default function Form() {
  const [selectedDemo, setSelectedDemo] = useState('/')
  const [prevSection, setPrevSelection] = useState('/')

  useEffect(() => {
    if (prevSection !== selectedDemo) {
      setPrevSelection(selectedDemo)
      navigate(selectedDemo) // ...and u
    }
  }, [selectedDemo])

  return (
    <label>
      Pick a fruit:
      <select
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
    </label>
  )
}
