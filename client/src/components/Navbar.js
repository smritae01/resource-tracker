// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserActions from "../redux/actions/generated/UserActionsGenerated";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Person from "@material-ui/icons/Person";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Group from "@material-ui/icons/Group";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Divider from "@material-ui/core/Divider";

// Style

import SecurityService from "../security/SecurityService";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  user: {
    color: "white"
  }
};

class Navbar extends React.Component {
  state = {
    auth: SecurityService.getUser() != null,
    anchorEl: null,
    openDrawer: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = open => () => {
    this.setState({
      openDrawer: open
    });
  };

  logout = () => {
    this.props.actions.logout();
    this.handleClose();
    SecurityService.logout();
    this.props.history.push("/home");
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    const sideList = (
      <div className={classes.list}>
        <div className="navbar-drawer-header">

          <div className="navbar-drawer-text">SITEMAP</div>
        </div>
        <Divider />
        {SecurityService.hasRole("ADMIN") ?
        (<List>
           <Link to="/courses">
            <ListItem button key="course">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="Manage Inventory" />
            </ListItem>
          </Link>{" "}
           <Link to="/requests">
            <ListItem button key="exam">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="Check Requests" />
            </ListItem>
          </Link>{" "}
           <Link to="/complaints">
            <ListItem button key="student">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="Check Complaint" />
            </ListItem>
          </Link>{" "}
        </List> ):

        (<List>
          <Link to="/courses">
            <ListItem button key="course">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="Inventory" />
            </ListItem>
          </Link>{" "}
          <Link to="/requests">
            <ListItem button key="exam">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="Make Request" />
            </ListItem>
          </Link>{" "}
          <Link to="/students">
            <ListItem button key="student">
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText className="menu-text" primary="Raise a Complaint" />
            </ListItem>
          </Link>{" "}
        </List>)}
      </div>
    );

    return (
      <div className="{classes.root}">
        <AppBar position="static">
          <Toolbar>
            {this.props.user && (
              <div>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  open={this.state.openDrawer}
                  onClose={this.toggleDrawer(false)}
                  onOpen={this.toggleDrawer(true)}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                  >
                    {sideList}
                  </div>
                </SwipeableDrawer>
              </div>
            )}
            <Typography variant="h6" color="inherit" className={classes.grow}>
            {SecurityService.hasRole("ADMIN") ? (
              <div>
              <Link to="/home" className="white">
                DASHBOARD
              </Link>
              </div>
              ) :
              <div>
              <Link to="/user/dashboard" className="white">
                DASHBOARD
              </Link></div>}
            </Typography>
            {this.props.user && (
              <div>
                <IconButton
                  aria-owns={anchorEl ? "navbar-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  className={classes.user}
                >
                  {this.props.user.username}
                  <KeyboardArrowDown />
                </IconButton>
                <Menu
                  id="navbar-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <Link to="/profile">
                    <MenuItem onClick={this.handleClose}>
                      <Person />
                      Profile
                    </MenuItem>
                  </Link>
                  {SecurityService.hasRole("ADMIN") && (
                    <Link to="/users">
                      <MenuItem onClick={this.handleClose}>
                        <Group />
                        User Management
                      </MenuItem>
                    </Link>
                  )}
                  <Divider />
                  <MenuItem onClick={this.logout.bind(this)}>
                    <PowerSettingsNew />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

// Store actions
const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
};

// Validate types
Navbar.propTypes = {
  actions: PropTypes.object.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    user: state.LoginReducer.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Navbar)));
