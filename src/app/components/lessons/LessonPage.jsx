import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/lessonGroups';

class LessonPage extends React.Component {
  componentWillMount(){
    //this.props.fetchLessons();
    console.log("lessonpage");
    console.log(this.props.lesson);
    this.props.fetchLessonGroups(this.props.lesson.id)
  }
  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.props.lesson.name}</h1>
      </div>
    );
  }
}
LessonPage.propTypes = {
  lesson: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  let lessons = state.lessons;
  console.log("bla")
  console.log(state);
  let lesson = { name: '', lessonGroups: [] };
  if (lessons == null) {
    lessons = [];
  }
  if (lessons.data == null) {
    return {};
  }
  const lessonId = ownProps.params.id;
  if (lessons.length > 0) {
    lesson = Object.assign({}, lessons.find(l => l.id === lessonId));
  }
  return { lesson };
}

export default connect(mapStateToProps, actions)(LessonPage);
