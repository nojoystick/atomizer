import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  titleHeader: {
    fontSize: '20px',
    padding: '10px 20px 0px 20px',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    color: props.theme ? props => props.theme.text : '#e3e3e3',
    zIndex: '2',
    position: 'relative',
    verticalAlign: 'bottom'
  },
  floatRight: {
    float: 'right',
    verticalAlign: 'middle'
  },
  settingsIcon: {
    margin: '0px 0px 0px 30px',
    width: '15px',
    height: '13px'
  },
  infoIcon: {
    margin: '0px 0px 0px 30px',
    width: '14px',
    height: '14px'
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: props.theme ? props => props.theme.background : '#121212',
    color: props.theme ? props => props.theme.text : '#e3e3e3'
  },
  toolbarItem: {
    marginLeft: '20px',
  }
});