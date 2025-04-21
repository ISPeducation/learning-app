import { useParams } from 'react-router-dom';

export default function Lesson() {
  const { subjectId, topicId } = useParams();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{topicId} ({subjectId})</h2>
      <p className="text-gray-700">This is a sample lesson. You can add explanations, examples, images, and quizzes here!</p>
    </div>
  );
}