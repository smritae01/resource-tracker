import React, { Component } from "react";
import { Link } from "react-router-dom";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions
import UserActions from '../redux/actions/generated/UserActionsGenerated';

// START IMPORT ACTIONS

// END IMPORT ACTIONS

/** APIs

**/

class Home extends Component {
  render() {
    return (
      <div id="sitemap">
        <h3>Sitemap</h3>

        <div>
          <Link to="/complaints">Check Complaints</Link>
        </div>
        <div>
          <Link to="/teachers">Check Status</Link>
        </div>
        <div>
          <Link to="/courses">Inventory</Link>
        </div>
        <div>
          <Link to="/exams">Requests</Link>
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
