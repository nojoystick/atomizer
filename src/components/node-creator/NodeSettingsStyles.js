import { makeStyles } from '@material-ui/styles';

const useNodeSettingsStyles = makeStyles({
  nodeDetailPanel: {
    position: 'relative',
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
    justifyContent: 'center',
    '& > div': {
      display: 'inline-block'
    }
  },
  elementDropdown: {
    backgroundColor: 'inherit !important',
    color: 'inherit !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    border: 'none !important',
    borderBottom: props => `2px solid ${props.theme && props.theme.text} !important`,
    width: '50px',
    '& *': {
      fontFamily: 'Inconsolata',
      fontWeight: '800'
    },
    '& div': {
      boxShadow: 'none'
    },
    '&__menu': {
      minWidth: '35px',
      boxShadow: props => props.theme && `${props.theme.boxShadow} !important`
    },
    '&__menu-list': {
      zIndex: '8001 !important',
      backgroundColor: props => props.theme && `${props.theme.secondaryBackgroundSolid} !important`
    },
    '&__option': {
      padding: '5px 0px !important',
      color: props => props.theme && `${props.theme.text} !important`
    }
  },
  ellipsis: {
    color: props => props.theme && props.theme.text,
    padding: '10px',
    fontSize: '24px',
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': {
      opacity: '0.6'
    }
  }
});

export default useNodeSettingsStyles;
