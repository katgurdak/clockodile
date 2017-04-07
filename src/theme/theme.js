import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#fff',
    canvasColor: '#32936F',
    textColor: '#000',
    secondaryTextColor: '#32936F'
  },
  datePicker: {
    selectColor: '#32936F',
  },
  timePicker: {
    headerColor: '#32936F',
    accentColor: '#32936F'
  },
  flatButton: {
    primaryTextColor: 'black'
  },
  raisedButton: {
  	textColor: '#32936F'
  }
});

export default muiTheme;