import React, {PropTypes} from 'react';
import { Link } from 'react-router';


const LessonGroupsList = ({ lessonGroups, lessonId }) => {
  return (
    <div>
      <h3>Lesson Groups</h3>
      {lessonGroups.map(l =>
        <Link to={`/lessons/${lessonId}/groups/${l._id}`} className="btn btn-primary">
          {l.name}
        </Link>
                )}
    </div>
  );
};

LessonGroupsList.propTypes = {
  lessonGroups: PropTypes.array.isRequired,
  lessonId : PropTypes.string.isRequired
};

export default LessonGroupsList;
