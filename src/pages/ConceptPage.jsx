import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext';
import { motion } from 'framer-motion';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ConceptPage = () => {
  const { subject, subtopic, chapter, concept } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const [videoURL, setVideoURL] = useState('');
  const [pdfURL, setPdfURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const q = query(
          collection(db, 'content'),
          where('subject', '==', subject),
          where('subtopic', '==', subtopic),
          where('chapter', '==', chapter),
          where('concept', '==', concept)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setVideoURL(data.videoURL || '');
          setPdfURL(data.pdfURL || '');
          setMessage('');
        } else {
          setMessage('No content found for this concept.');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setMessage('Error fetching content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [subject, subtopic, chapter, concept]);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-4">📘 {concept}</h1>
        <p className="mb-4 text-lg font-medium text-blue-600 dark:text-blue-400">
          {subject} &gt; {subtopic} &gt; {chapter}
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : message ? (
          <p className="text-red-500 font-semibold">{message}</p>
        ) : (
          <>
            {/* Video Section */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6 shadow-md">
              <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">🎥 Video Lesson</p>
              {videoURL ? (
                <video controls className="w-full rounded" src={videoURL} />
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">No video available</p>
              )}
            </div>

            {/* Presentation Section */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6 shadow-md">
              <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">📊 Presentation</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">[Slides or embedded PPT will go here]</p>
            </div>

            {/* Study Material Section */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6 shadow-md">
              <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">📄 Study Material</p>
              {pdfURL ? (
                <a
                  href={pdfURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Download PDF
                </a>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">No PDF available</p>
              )}
            </div>

            {/* Take Test Button */}
            <button
              onClick={() => navigate('/test')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors duration-300"
            >
              📝 Take Test
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ConceptPage;
