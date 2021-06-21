// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// Table
import EnhancedTable from "../components/EnhancedTable";

// Custom Actions


// START IMPORT ACTIONS
import ExamActions from "../redux/actions/generated/ExamActionsGenerated";

// END IMPORT ACTIONS

/** APIs

* actionsExam.delete
*	@description CRUD ACTION delete
*	@param ObjectId id - Id
*
* actionsExam.list
*	@description CRUD ACTION list
*

**/


class ExamList extends Component {
  // Init component
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false
    };
  }

  // Load data on start
  componentWillMount() {
    this.props.actionsExam.loadExamList();
  }

  // Delete data
  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsExam.deleteExam(this.state.idDelete).then(data => {
      this.props.actionsExam.loadExamList();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  // Show content
  render() {
    const columns = [
      {
        id: "req no.",
        type: "string",
        label: "Request No."
      },
      {
        id: "date",
        type: "date",
        label: "Date"
      },
      {
        id: "desc",
        type: "string",
        label: "Description"
      },
    ];
    const link = "/exams/";

    return (
      <div>
        <h1>Requests</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this)}
        />

        <div className="footer-card">
          <Link to="/exams/new">
            <Button variant="contained" color="primary">
              Make Repair Request
            </Button>
          </Link>
        </div>

        <div className="footer-card">
          <Link to="/exams/new">
            <Button variant="contained" color="primary">
              Make Resource Request
            </Button>
          </Link>
        </div>

      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return {
    actionsExam: bindActionCreators(ExamActions, dispatch),
  };
};

// Validate types
ExamList.propTypes = {
  actionsExam: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.ExamListReducer.listExam
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamList);
