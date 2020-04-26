import { makeStyles } from '@material-ui/styles';

const SubPanelStyles = makeStyles({
  subPanel: {
    boxSizing: 'border-box',
    display: 'inline-block',
    border: props => `2px solid ${props.theme && props.theme.text}`,
    width: '285px',
    minWidth: '285px',
    height: '470px',
    margin: '15px',
    backgroundColor: props => props.theme && props.theme.background,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  titleHeader: {
    fontSize: '20px',
    padding: '10px 20px 0px 20px',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text,
    zIndex: '2',
    position: 'relative',
    verticalAlign: 'bottom'
  },
  subtitle: {
    display: 'block',
    fontStyle: 'italic',
    fontWeight: '200',
    fontSize: '0.8em',
    marginLeft: '20px'
  },
  sliderLabel: {
    display: 'block',
    fontFamily: 'Roboto Condensed',
    color: props => props.theme && props.theme.text
  },
  vertical: {
    textAlign: 'center',
    width: '80%',
    marginBottom: '5px'
  }
});

export default SubPanelStyles;
