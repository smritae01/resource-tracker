// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";
import DialogDelete from "../components/DialogDelete";
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
import Chip from "@material-ui/core/Chip";

// Custom Actions


// START IMPORT ACTIONS
import CourseActions from "../redux/actions/generated/CourseActionsGenerated";
import ExamActions from "../redux/actions/generated/ExamActionsGenerated";
import TeacherActions from "../redux/actions/generated/TeacherActionsGenerated";
import StudentActions from "../redux/actions/generated/StudentActionsGenerated";

// Table
import EnhancedTable from "../components/EnhancedTable";

// END IMPORT ACTIONS

/** APIs

* actionsCourse.create
*	@description CRUD ACTION create
*
* actionsCourse.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsCourse.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsExam.findBy_course
*	@description CRUD ACTION findBy_course
*	@param Objectid key - Id of model to search for
*
* actionsTeacher.findBy_courses
*	@description CRUD ACTION findBy_courses
*	@param Objectid key - Id of model to search for
*
* actionsStudent.findBy_courses
*	@description CRUD ACTION findBy_courses
*	@param Objectid key - Id of model to search for
*

**/

class CourseEdit extends Component {
  // Init course
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsCourse.loadCourse(this.props.match.params.id);
      this.props.actionsExam.findBy_course(this.props.match.params.id);
      this.props.actionsStudent.findBy_courses(this.props.match.params.id);
      this.props.actionsTeacher.findBy_courses(this.props.match.params.id);
    }

  }
  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }
  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsCourse.deleteCourse(this.state.idDelete).then(data => {
      this.props.actionsCourse.loadCourseList();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }
  // Insert props course in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      course: props.course
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.course._id) {
      this.props.actionsCourse.saveCourse(this.state.course).then(data => {
        this.props.history.push("/courses/");
      });
    } else {
      this.props.actionsCourse.createCourse(this.state.course).then(data => {
        this.props.history.push("/courses/");
      });
    }
  }
  handleChange = (event, index, value) => {
    this.setState({ selectedValue: value });
  };
  // Show content
  render() {
    var catArr = [
      {
        value: 'cs',
        label: "Computer Science",
      },
      {
        value: 'mc',
        label: "Workshop",
      },
      {
        value: 'ds',
        label: "Design Thinking",
      },
      {
        value: 'ec',
        label: "Electrical",
      },
      {
        value: 'et',
        label:  "Electronics",
      },
      {
          value: 'ch',
          label:"Chemistry",
      },
      {
        value: 'qc',
        label: "Quantum Computers",
      }];
      const columns = [

        {
          id: "department",
          type: "string",
          label: "Department"
        },
        {
          id: "QuanNo",
          type: "number",
          label: "Quantity"
        },
      ];
      const link = "/courses/";
    return (
      <div>
        <h1>Department</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

        {/*
          <TextField
            id="department"
            label="Department"
            value={this.state.course.department || ""}
            onChange={Utils.handleChange.bind(this, "course")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.course.name && this.state.course.name === ""
              ? { error: true }
              : {})}
          />
        */}
          {/* RELATIONS */}

          {/* EXTERNAL RELATIONS */}

          {/* External relation with exam */}

          <FormControl fullWidth className="mb-20">
      <InputLabel htmlFor="department">Choose Department</InputLabel>
        <Select
          id="category"
          select
          label="Select"
          value={this.state.course.category || ""}
          onClick={Utils.handleChange.bind(this, "student")}
          helperText="Please select the department "
          >
          {catArr.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        </FormControl>



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
          {/* Footer */}
          <div className="footer-card">
            <Link to="/courses/">Back to list</Link>

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
    actionsCourse: bindActionCreators(CourseActions, dispatch),
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsTeacher: bindActionCreators(TeacherActions, dispatch),
    actionsStudent: bindActionCreators(StudentActions, dispatch),
  };
};

// Validate types
CourseEdit.propTypes = {
  actionsCourse: PropTypes.object.isRequired,
  actionsExam: PropTypes.object.isRequired,
  actionsTeacher: PropTypes.object.isRequired,
  actionsStudent: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    course: state.CourseEditReducer.course,
    listExam: state.CourseEditReducer.listExam,
    listStudent: state.CourseEditReducer.listStudent,
    listTeacher: state.CourseEditReducer.listTeacher
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseEdit);
