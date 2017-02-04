import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchLessons, fetchLessonGroups } from '../../actions/lessons';
import LessonGroupsList from './LessonGroupsList'

class LessonPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isEditing: false,
      lesson: this.props.lesson,
      lessonGroups: this.props.lessonGroups };
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  componentWillMount() {
    this.props.onFetchLessons();
    this.props.onFetchLessonGroups(this.props.lessonId);
  }
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing })
  }
  render() {
    console.log(this.props.lesson);
    console.log(this.props.lessonGroups);
    if(this.props.lesson == null || this.props.lessonGroups == null){
      return (null);
    } else if (this.state.isEditing) {
      return (
        <div>
          <h1>edit Lesson</h1>
        </div>
      )
    } else {
      return (
        <div className="col-md-8 col-md-offset-2">
          <h1>{this.props.lesson.name}</h1>
          <LessonGroupsList lessonGroups={this.props.lessonGroups} />
          <button onClick={this.toggleEdit}>edit</button>
        </div>
    );
  }
  }
}
LessonPage.propTypes = {
  lesson: PropTypes.object,
  onFetchLessons: PropTypes.func,
  onFetchLessonGroups: PropTypes.func,
  lessonId: PropTypes.string,
  lessonGroups: PropTypes.array,

};

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.params.id;
  const lessons = state.lesson.list;
  console.log("anan");
  console.log(lessons);
  const lessonGroups = state.lesson.groupList;
  let lesson = { name: '' };

  if (lessons == null) {
    return {};
  }

  lesson = Object.assign({}, lessons.find(l => l._id === lessonId));
  return { lesson, lessonGroups, lessonId };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const lessonId = ownProps.params.id;
  return {
    onFetchLessons: () => dispatch(fetchLessons()),
    onFetchLessonGroups: () => dispatch(fetchLessonGroups(lessonId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);
