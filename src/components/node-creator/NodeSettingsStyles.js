import { makeStyles } from '@material-ui/styles';

const NodeSettingsStyles = makeStyles({
  nodeDetailPanel: {
    margin: '15px',
    height: '180px',
    width: '100%',
    transition: '0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    overflowY: 'scroll',
    zIndex: '2',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  nodeHeader: {
    padding: '5px',
    display: 'block'
  },
  bigNodeTitle: {
    padding: '5px',
    display: 'block',
    fontSize: '1.5em'
  },
  nodeToolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.5s'
  },
  scrollButton: {
    flexGrow: '1',
    height: '100px',
    border: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      opacity: '0.4'
    }
  },
  scrollIcon: {
    width: '20px',
    height: '10px'
  },
  sliderGroup: {
    position: 'relative'
  },
  sliderLabel: {
    margin: '20px 0px 0px 20px',
    display: 'inline-block',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    color: props => props.theme && props.theme.text
  },
  input: {
    position: 'absolute',
    top: '20px',
    right: '40px',
    width: '45px',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    border: 'none',
    display: 'inline-block',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      display: 'inline-block'
    }
  },
  dropdown: {
    width: '50px !important',
    maxWidth: '60px',
    height: '18px !important',
    minHeight: '18px !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    zIndex: '9000',
    borderWidth: '0px 0px 2px 0px !important',
    borderColor: `${props => props.theme && props.theme.text} $important`,
    color: props => props.theme && props.theme.text,
    boxShadow: 'none !important',
    padding: '0px !important',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: `${props => props.theme && props.theme.text} !important`
    },
    '& div': {
      '& input': {
        color: props => props.theme && props.theme.text
      }
    }
  }
});

export default NodeSettingsStyles;
