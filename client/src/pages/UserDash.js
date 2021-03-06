import React, { Component } from "react";
import { Link } from "react-router-dom";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions
import UserActions from '../redux/actions/generated/UserActionsGenerated';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>

        <div>
          <Link to="/requests">Requests</Link>
        </div>
        <div>
          <Link to="/courses">Inventory</Link>
        </div>
        <div>
          <Link to="/students">Raise Complaint</Link>
        </div>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return {
    actionsUser: bindActionCreators(UserActions, dispatch)
  };
};

// Validate types
Home.propTypes = {
  actionsUser: PropTypes.object.isRequired
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
)(Home);
