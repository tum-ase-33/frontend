import React from 'react';
import LessonList from '../components/lessons/LessonList';
import LessonForm from '../components/lessons/LessonForm';


const LessonsContainer = () => (
  <div>
    <LessonForm />
    <LessonList />
  </div>
);

export default LessonsContainer;
