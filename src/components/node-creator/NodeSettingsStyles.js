import { makeStyles } from '@material-ui/styles';

const NodeDetailStyles = makeStyles({
  nodeDetailPanel: {
    borderStyle: 'solid',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    height: '400px',
    width: '350px',
    margin: '0px',
    transition: '0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    overflowY: 'scroll',
    zIndex: '2'
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
  placeholder: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.5s',
    opacity: '0'
  },
  placeholderText: {
    fontStyle: 'italic',
    fontSize: '1.2em',
    color: props => props.theme && props.theme.secondary,
    height: '0px',
    justifySelf: 'center',
    alignSelf: 'center'
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
    backgroundColor: props => props.theme && props.theme.background,
    outline: 'none',
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
    outline: 'none',
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
    zIndex: '3',
    borderWidth: '0px 0px 2px 0px !important',
    borderColor: `${props => props.theme && props.theme.text} $important`,
    color: props => props.theme && props.theme.text,
    outline: 'none !important',
    boxShadow: 'none !important',
    padding: '0px !important',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: `${props => props.theme && props.theme.text} !important`,
      outline: 'none'
    },
    '& div': {
      '& input': {
        color: props => props.theme && props.theme.text
      }
    }
  }
});

export default NodeDetailStyles;
