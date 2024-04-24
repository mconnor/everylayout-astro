import  { useState } from 'react'

const ThemeIcon = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button onClick={toggleTheme}>{theme === 'light' ? '🌞' : '🌚'}</button>
  )
}

export default ThemeIcon
