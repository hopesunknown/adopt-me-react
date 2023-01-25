import {createContext} from 'react';

// const [theme, setTheme] = useState('darkblue');

const ThemeContext = createContext(['#f06d06', () => {}]);

export default ThemeContext;
