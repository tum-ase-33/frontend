import React, { PropTypes } from 'react';

const LessonList = ({ lessons }) => {
  return (
    <ul className="list-group">
      {lessons.map((lesson, i) =>
        <li className="list-group-item" key={i}>
          {lesson.name}
        </li>
      )}
    </ul>
  );
};


export default LessonList;
