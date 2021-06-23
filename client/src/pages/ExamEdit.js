// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Custom Actions

// START IMPORT ACTIONS
import ExamActions from "../redux/actions/generated/ExamActionsGenerated";
import StudentActions from "../redux/actions/generated/StudentActionsGenerated";
import CourseActions from "../redux/actions/generated/CourseActionsGenerated";
import TeacherActions from "../redux/actions/generated/TeacherActionsGenerated";

class ExamEdit extends Component {
  // Init exam
  constructor(props) {
    super(props);
    this.state = {
      exam: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsExam.loadExam(this.props.match.params.id);
    }

    this.props.actionsCourse.loadCourseList();
    this.props.actionsStudent.loadStudentList();
    this.props.actionsTeacher.loadTeacherList();
  }

  // Insert props exam in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      exam: props.exam
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.exam._id) {
      this.props.actionsExam.saveExam(this.state.exam).then(data => {
        this.props.history.push("/requests/");
      });
    } else {
      this.props.actionsExam.createExam(this.state.exam).then(data => {
        this.props.history.push("/requests/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>Make Repair Request</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>


          <TextField
            id="req_no"
            label="Request Number"
            value={this.state.exam.req_no || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="desc"
            label="Describe the request"
            value={this.state.exam.desc || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            margin="normal"
            fullWidth
          />


          <TextField
            id="date"
            value={this.state.exam.date || ""}
            onChange={Utils.handleChange.bind(this, "exam")}
            type="date"
            margin="normal"
            fullWidth
          />


          {/* RELATIONS */}
{/*
          <h2 className="mb-20">Relations</h2> */}

          {/* Relation 1:m _course with course */}
          <FormControl fullWidth className="mb-20">
            <InputLabel> Select Item </InputLabel>
            <Select
              value={this.state.exam._course || ""}
              onChange={Utils.handleChangeSelect.bind(this, "exam")}
              // inputProps={{
              //   id: "_course",
              //   name: "_course"
              // }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.listCourse && this.props.listCourse.map(row => (
                <MenuItem value={row._id} key={row._id}>
                  {row._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          {/* Footer */}
          <div className="footer-card">
            <Link to="/requests/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return {
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsStudent: bindActionCreators(StudentActions, dispatch),
    actionsCourse: bindActionCreators(CourseActions, dispatch),
    actionsTeacher: bindActionCreators(TeacherActions, dispatch),
  };
};

// Validate types
ExamEdit.propTypes = {
  actionsExam: PropTypes.object.isRequired,
  actionsStudent: PropTypes.object.isRequired,
  actionsCourse: PropTypes.object.isRequired,
  actionsTeacher: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    exam: state.ExamEditReducer.exam,
    listCourse: state.ExamEditReducer.listCourse,
    listStudent: state.ExamEditReducer.listStudent,
    listTeacher: state.ExamEditReducer.listTeacher
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamEdit);
