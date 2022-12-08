import { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';

const PresentEdit = () => {
  const [present] = useState({
    name: null,
    questions: [],
    numberOfQuestion: null
  });
  /**
   *
   * {
    "name":"Trờ chơi đố vui Web 6",
    "questions":[
        {
            "content" : "Thuật ngữ ko liên quan tới Web",
            "ansA":"html",
            "ansB":"css",
            "ansC":"js",
            "ansD":"lmht",
            "trueAns":"D"
        },
        {
            "content" : "Môn này học gì",
            "ansA":"Android",
            "ansB":"iOS",
            "ansC":"Window",
            "ansD":"Web",
            "trueAns":"D",
            "time":15
        },
        {
            "content" : " ngữ Backend",
            "ansA":"Golang",
            "ansB":"Java",
            "ansC":"Python",
            "ansD":"Swift",
            "trueAns":"D",
            "time":15
        }
    ]
}
   */

  return (
    <BasicLayout>
      <h1>Present Form</h1>
    </BasicLayout>
  );
};
export default PresentEdit;
