import React, {PropTypes} from 'react';

const LessonGroupsList = ({ lessonGroups }) => {
  return (
    <div>
      <h3>Lesson Groups</h3>
      <ul>
        {lessonGroups.map(l =>
          <li key={l.id}>{l.name}</li>
          )}
      </ul>
    </div>
  );
};

LessonGroupsList.propTypes = {
  lessonGroups: PropTypes.array.isRequired
};

export default LessonGroupsList;
