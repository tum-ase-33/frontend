import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/lessons';
import { fetchLessonGroups } from '../../actions/lessons';


class LessonGroupPage extends React.Component {
  componentWillMount() {
    this.props.onFetchLessonGroups();
  }
  render() {
    const lessonGroup = this.props.lessonGroup;
    if (lessonGroup == null) {
      return null;
    }

    return (
      <div className="col-md-12">
        <h1>Lessons Group

        </h1>
        <div className="col-md-8">
          <h2>{lessonGroup.name}</h2>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.params.lid;
  const lessonGroupId = ownProps.params.gid;
  const lessonGroups = state.lesson.groupList;
  let lessonGroup = { name: '', dates: [] };

  if (lessonGroups == null) {
    return {};
  }

  lessonGroup = Object.assign({}, lessonGroups.find(l => l._id === lessonGroupId));
  return { lessonGroup, lessonId };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const lessonId = ownProps.params.lid;

  return {
    onFetchLessonGroups: () => dispatch(fetchLessonGroups(lessonId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonGroupPage);
