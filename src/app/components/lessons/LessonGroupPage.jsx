import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/lessons';
import { fetchLessonGroups, assignLessonGroup, fetchLessonGroupUsers} from '../../actions/lessons';


class LessonGroupPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { assigned: false };
    this.assignLessonGroup = this.assignLessonGroup.bind(this);
  }
  componentWillMount() {
    this.props.onFetchLessonGroups();
    this.props.onFetchLessonGroupUsers();
  }
  assignLessonGroup() {
    this.props.onAssignLessonGroups(this.props.lessonId);
  }
  render() {
    const lessonGroup = this.props.lessonGroup;
    const userEnrolled = this.props.userEnrolled;
    if (lessonGroup == null) {
      return null;
    }
    if(userEnrolled){
      return(<h2> You are alredy enrolled to this class</h2>);
    }
    return (
      <div className="col-md-12">
        <h1>Lessons Group

        </h1>
        <div className="col-md-8">
          <h2>{lessonGroup.name}</h2>
          <button className="btn btn-default" onClick={this.assignLessonGroup}>Enroll</button>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.params.lid;
  const lessonGroupId = ownProps.params.gid;
  const lessonGroups = state.lesson.groupList;
  const users = state.lesson.users;
  const user = JSON.parse(localStorage.getItem('user'));
  let lessonGroup = { name: '', dates: [] };
  if (lessonGroups == null) {
    return {};
  }
  if(users == null){
    return {};
  }
  console.log("users");
  console.log(users);
  console.log("user");
  console.log(user);
  let userEnrolled = users.find(u => u.userId === user.data._id);
  console.log("userE");
  console.log(userEnrolled);
  lessonGroup = Object.assign({}, lessonGroups.find(l => l._id === lessonGroupId));
  return { lessonGroup, lessonId, userEnrolled};
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const lessonId = ownProps.params.lid;
  const lessonGroupId = ownProps.params.gid;

  return {
    onFetchLessonGroups: () => dispatch(fetchLessonGroups(lessonId)),
    onAssignLessonGroups: () => dispatch(assignLessonGroup(lessonId, lessonGroupId)),
    onFetchLessonGroupUsers: () => dispatch(fetchLessonGroupUsers(lessonId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonGroupPage);
