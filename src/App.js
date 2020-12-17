import React, {useState, useEffect} from 'react';
import { ThemeProvider } from 'styled-components';
import  {useDarkMode} from "./components/useDarkMode"
import Application from './components/Application';
import { GlobalStyles } from './components/globalStyles';
import { lightTheme, darkTheme } from './components/Theme';
import UserProvider from './providers/userProvider';

function App(){

    const [theme, themeToggler, mountedComponent] = useDarkMode();

    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if(!mountedComponent) return(
        <div style={{backgroundColor:'#000'}}></div>
    );

    return(
        <UserProvider>
            <ThemeProvider theme = {themeMode}>
                <>
                <GlobalStyles/>
                <Application {...{toggle: themeToggler, theme: theme}}/>
                </>
            </ThemeProvider>
        </UserProvider>
    )
}
export default App;
