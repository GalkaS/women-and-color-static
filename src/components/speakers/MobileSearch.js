// NPM
import React, { PropTypes, Component } from 'react'
// import {withRouter} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';


// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
// import css from '../../pages/styles.css';
const css = {};
const styles = theme => ({
  form: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main
  },
  searchButton: {
    height: '100%',
    color: theme.palette.primary.main
  }
});

class MobileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.q || '' }
  }

  searchProfiles = (event) => {
    event.preventDefault();
    const query = this.state.query;
    const home = '/'
    if (this.props.history.location.pathname !== home) {
      this.props.history.push(home)
    }
    this.props.updateSearchParams({
      q: query,
      offset: 0,
      limit: 20,
      append: false
    })
  }

  onChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
    if (!query) {
      const home = '/'
      if (this.props.history.location.pathname !== home) {
        this.props.history.push(home)
      }
      this.props.updateSearchParams({
        q: null,
        offset: 0,
        limit: 20,
        append: false
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.searchProfiles} className={this.props.classes.form}>
        <IconButton color="secondary" type="submit" className={this.props.classes.searchButton}>
          <SearchIcon style={styles.icon} />
        </IconButton>
        <TextField
          fullWidth
          type="search"
          onChange={this.onChange}
          value={this.state.query}
          placeholder={'Search for speakers or topics'}
          InputProps={{ disableUnderline: true }}
          className={css.mobileSearchInput}
        />
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchParams: (params) => {
      dispatch(updateSearchParams(params))
    }
  }
}

function mapStateToProps(state) {
  return {
    q: state.speaker.searchParams.q
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MobileSearch));
