import  { createTheme } from '@mui/material/styles';

export default function Theme(){
  const theme = createTheme({
    palette: {
      primary:{
        light: '#CAD2C5',
        main: '#84A98C',
        dark: '#2F3E46'
      },
      secondary: {
        main: '#52796F',
        dark: '354F52'
      }
    }
  })

  return theme
}