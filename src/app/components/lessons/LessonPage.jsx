import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchLessons, fetchLessonGroups, editLesson, deleteLesson } from '../../actions/lessons';
import LessonGroupsList from './LessonGroupsList'
import LessonForm from './LessonForm'

class LessonPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isEditing: false,
      lesson: this.props.lesson,
      lessonGroups: this.props.lessonGroups };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateLessonState = this.updateLessonState.bind(this);
    this.updateLessonGroups = this.updateLessonGroups.bind(this);
    this.saveLesson = this.saveLesson.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
  }
  componentWillMount() {
    this.props.onFetchLessons();
    this.props.onFetchLessonGroups(this.props.lessonId);
  }
  componentWillReceiveProps(nextProps) {

    if(this.props.lesson != null){
      this.setState({ lesson: nextProps.lesson });
    }
  }
  deleteLesson(event) {
    this.props.onDeleteLesson(this.props.lessonId);
  }
  saveLesson(event) {
    event.preventDefault();
    console.log("saveLesson");
    console.log(this.state.lesson);
    this.props.onUpdateLesson(this.state.lesson);
    this.setState({ isEditing:false });
 }
  updateLessonState(event) {
    const field = event.target.name;
    const lesson = this.state.lesson;
    lesson[field] = event.target.value;
    return this.setState({ lesson });
  }
  updateLessonGroups(event) {
    const lesson = this.state.lesson;
    const lessonGroupId = event.target.value;
    this.setState({lesson});

  }
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing })
  }
  render() {
    console.log("render");
    console.log(this.state.lesson);
    if(this.props.lesson == null || this.props.lessonGroups == null){
      return (null);
    } else if (this.state.isEditing) {
      return (
        <div>
          <h1>edit Lesson</h1>
          <LessonForm
            lesson={this.state.lesson}
            onSave={this.saveLesson}
            onChange={this.updateLessonState}
           />
        </div>
        )
    } else {
      return (
        <div className="col-md-8 col-md-offset-2">
          <h1>{this.props.lesson.name}</h1>
          <LessonGroupsList lessonGroups={this.props.lessonGroups} lessonId={this.props.lesson._id}/>
          <Link to={`/lessons/${this.props.lessonId}/new`} className="btn btn-default">
            Create New Group
          </Link>
          <button className="btn btn-default" onClick={this.toggleEdit}>edit</button>
        </div>
    );
  }
  }
}
LessonPage.propTypes = {
  lesson: PropTypes.object,
  onFetchLessons: PropTypes.func,
  onFetchLessonGroups: PropTypes.func,
  onDeleteLesson: PropTypes.func,
  onUpdateLesson: PropTypes.func,
  lessonId: PropTypes.string,
  lessonGroups: PropTypes.array,

};

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.params.id;
  const lessons = state.lesson.list;
  console.log("anan");
  console.log(lessons);
  let lessonGroups = state.lesson.groupList;
  let lesson = { name: '' };

  if (lessons == null) {
    return {};
  }

  lesson = Object.assign({}, lessons.find(l => l._id === lessonId));
  lessonGroups = lessonGroups.filter(l => l.lessonId === lessonId);
  console.log(lessonGroups);
  return { lesson, lessonGroups, lessonId };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const lessonId = ownProps.params.id;
  return {
    onFetchLessons: () => dispatch(fetchLessons()),
    onFetchLessonGroups: () => dispatch(fetchLessonGroups(lessonId)),
    onUpdateLesson: lesson => dispatch(editLesson(lesson)),
    onDeleteLesson: () => dispatch(deleteLesson(lessonId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);
