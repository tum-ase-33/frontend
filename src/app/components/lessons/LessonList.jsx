import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LessonList = ({ lessons }) => {
  return (
    <ul className="list-group">
      {lessons.map((lesson, i) =>
        <li className="list-group-item" key={i}>
          <Link to={`/lessons/${lesson._id}`} className="btn btn-primary">
            {lesson.name}
          </Link>
        </li>
      )}
    </ul>
  );
};


export default LessonList;
