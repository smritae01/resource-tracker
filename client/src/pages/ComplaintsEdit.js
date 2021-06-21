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
import { DateTimePicker } from "material-ui-pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import { makeStyles } from '@material-ui/core/styles';

// Custom Actions


// START IMPORT ACTIONS
import StudentActions from "../redux/actions/generated/StudentActionsGenerated";
import ExamActions from "../redux/actions/generated/ExamActionsGenerated";
import CourseActions from "../redux/actions/generated/CourseActionsGenerated";

// END IMPORT ACTIONS

/** APIs

* actionsStudent.create
*	@description CRUD ACTION create
*
* actionsStudent.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsStudent.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsExam.findBy_student
*	@description CRUD ACTION findBy_student
*	@param Objectid key - Id of model to search for
*
* actionsCourse.list
*	@description CRUD ACTION list
*

**/

class ComplaintsEdit extends Component {
  // Init student
  constructor(props) {
    super(props);
    this.state = {
      student: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsStudent.loadStudent(this.props.match.params.id);
      this.props.actionsExam.findBy_student(this.props.match.params.id);
    }

    this.props.actionsCourse.loadCourseList();
  }

  // Insert props student in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      student: props.student
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.student._id) {
      this.props.actionsStudent.saveStudent(this.state.student).then(data => {
        this.props.history.push("/students/");
      });
    } else {
      this.props.actionsStudent.createStudent(this.state.student).then(data => {
        this.props.history.push("/students/");
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
          value: 'dt',
          label: "Date or Time of order",
        },
        {
          value: 'ven',
          label: "Vendor",
        },
        {
          value: 'pq',
          label: "Product quality",
        },
        {
          value: 'mi',
          label: "Missing items",
        },
        {
          value: 'da',
          label:  "Delivery & Address",
        },
        {
          value: 'oth',
          label: "Other",
        }];

        var depArr = [
            {
              value: 'cse',
              label: "Computer Science",
            },
            {
              value: 'mech',
              label: "Mechanical",
            },
            {
              value: 'civ',
              label: "Civil",
            },
            {
              value: 'eee',
              label: "Electrical & Electronics",
            },
            {
              value: 'hs',
              label:  "Humanities",
            },
            {
              value: 'oth',
              label: "Other",
            }];
        // const [cat, setCat] = React.useState('');
        //
        // const handleChange = (event) => {
        //   setCat(event.target.value);
        // };
    return (
      <div>
        <h1>Check Complaints</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          <DateTimePicker
            id="date"
            label="Search by Date"
            className="mt-20 mb-20"
            ampm={false}
            value={
              this.state.student.date
                ? new Date(this.state.student.date)
                : null
            }
            onChange={Utils.handleChangeDate.bind(this, "student", "date")}
            fullWidth
            autoOk
            disableFuture
            required
            {...(!this.state.student.date && this.state.student.date === ""
              ? { error: true }
              : {})}
          />

          {/* RELATIONS

          //
          // <FormControl fullWidth className="mb-20">
          //   <InputLabel htmlFor="category">Choose Category</InputLabel>
          //   <Select
          //   //   multiple
          //   //   value={this.state.student.category || catArr}
          //   //   onChange={Utils.handleChangeSelect.bind(this, "student")}
          //   //   input={<Input id="category" name="Category" />}
          //   //   renderValue={selected => (
          //   //     <div>
          //   //       {selected.map(value => (
          //   //         <Chip key={value} label={value} />
          //   //       ))}
          //   //     </div>
          //   //   )}
          //   // >
          //   //MODIFY HERE WITH CATEGORY
          //     {catArr.map(item => (
          //       <MenuItem
          //         key={item}
          //         selected={option === "Other"} onClick={handleClose}
          //       >{item}
          //       </MenuItem>
          //     ))}
          //     </Select>
          // </FormControl>*/}
          <FormControl fullWidth className="mb-20">
      <InputLabel htmlFor="dept">Choose Department</InputLabel>
        <Select
          id="dept"
          select
          label="Select"
          value={this.state.student.dept || ""}
          onClick={Utils.handleChange.bind(this, "student")}
          helperText="Please select the Department"
          >
          {depArr.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        </FormControl>

        <FormControl fullWidth className="mb-20">
    <InputLabel htmlFor="category">Choose Category</InputLabel>
      <Select
        id="category"
        select
        label="Select"
        value={this.state.student.category || ""}
        onClick={Utils.handleChange.bind(this, "student")}
        helperText="Please select the category"
        >
        {catArr.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      </FormControl>



          {/* <h2 className="mb-20">Relations</h2>*/}

          {/* Relation m:m _courses with course */}

          {/*/ <FormControl fullWidth className="mb-20">
          //   <InputLabel htmlFor="_courses">Type complaint here</InputLabel>
          //   <Select
          //     multiple
          //     value={this.state.student._courses || []}
          //     onChange={Utils.handleChangeSelect.bind(this, "student")}
          //     input={<Input id="_courses" name="_courses" />}
          //     renderValue={selected => (
          //       <div>
          //         {selected.map(value => (
          //           <Chip key={value} label={value} />
          //         ))}
          //       </div>
          //     )}
          //   >
          //     {this.props.listCourse && this.props.listCourse.map(item => (
          //       <MenuItem
          //         key={item._id}
          //         value={item._id}
          //         style={{
          //           fontWeight:
          //             this.state.student._courses &&
          //             this.state.student._courses.indexOf(item._id) === -1
          //               ? "regular"
          //               : "bold"
          //         }}
          //       >
          //         {item._id}
          //       </MenuItem>
          //     ))}
          //   </Select>
          // </FormControl>*/}

          {/* EXTERNAL RELATIONS */}

          {/* External relation with exam */}

        {/*  <h3>Exam</h3>
          {(!this.props.listExam || this.props.listExam.length === 0) &&
            <div>No Exam associated</div>
          }
          {this.props.listExam &&
            this.props.listExam.map((item, i) => {
              return (
                <Link to={"/exams/" + item._id} key={item._id}>
                  {item._id}
                </Link>
              );
            })}
            */}

          {/* Footer */}
          <div className="footer-card">
            <Link to="/complaints/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Search
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
    actionsStudent: bindActionCreators(StudentActions, dispatch),
    actionsExam: bindActionCreators(ExamActions, dispatch),
    actionsCourse: bindActionCreators(CourseActions, dispatch),
  };
};

// Validate types
ComplaintsEdit.propTypes = {
  actionsStudent: PropTypes.object.isRequired,
  actionsExam: PropTypes.object.isRequired,
  actionsCourse: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    student: state.StudentEditReducer.student,
    listCourse: state.StudentEditReducer.listCourse,
    listExam: state.StudentEditReducer.listExam
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplaintsEdit);
