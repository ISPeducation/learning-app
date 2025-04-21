import { Link, useParams } from 'react-router-dom';

const topics = {
  math: [
    { id: 'algebra', name: 'Algebra' },
    { id: 'geometry', name: 'Geometry' },
  ],
  science: [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
  ],
  social: [
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
  ],
};

export default function Subject() {
  const { subjectId } = useParams();
  const topicList = topics[subjectId] || [];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Topics in {subjectId}</h2>
      <div className="flex flex-col gap-3">
        {topicList.map(topic => (
          <Link key={topic.id} to={`/subject/${subjectId}/${topic.id}`} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
  );
}