import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ParentDashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('Overall');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  const subjects = ['Maths', 'Science', 'Social', 'Others'];
  const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

  const subjectColors = {
    Maths: 'rgba(255, 99, 132, 0.6)',
    Science: 'rgba(54, 162, 235, 0.6)',
    Social: 'rgba(255, 206, 86, 0.6)',
    Others: 'rgba(75, 192, 192, 0.6)',
  };

  const allConcepts = data || [];

  const filterConcepts = (subject, chapter) => {
    return allConcepts.filter(
      c => c.subject === subject && c.chapter === chapter
    );
  };

  const calculateMatrix = () => {
    return chapters.map(chap => {
      const row = { chapter: chap };
      subjects.forEach(sub => {
        const filtered = allConcepts.filter(c => c.chapter === chap && c.subject === sub);
        const totalScore = filtered.reduce((sum, c) => sum + (c.score || 0), 0);
        const totalLearn = filtered.reduce((sum, c) => sum + (c.learningTime || 0), 0);
        const totalTest = filtered.reduce((sum, c) => sum + (c.testTime || 0), 0);
        row[sub] = {
          score: totalScore,
          learningTime: totalLearn,
          testTime: totalTest,
        };
      });
      return row;
    });
  };

  const generateSuggestions = concepts => {
    return concepts
      .filter(c => c.score < 50 || !c.attempted)
      .map(c => `Review ${c.subject} > ${c.chapter} > ${c.name}`);
  };

  const tableClass = 'w-full border-collapse';
  const cellClass = 'border p-2 dark:text-white text-sm text-gray-800 dark:border-gray-600';

  const renderChart = (labels, datasets) => (
    <Bar
      data={{ labels, datasets }}
      options={{
        responsive: true,
        plugins: { legend: { position: 'top' }, title: { display: false } },
      }}
    />
  );

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">📊 Parent Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {['Overall', 'Subject', 'Chapter', 'Concepts', 'Performance Review'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overall Tab */}
      {activeTab === 'Overall' && (
        <div>
          {/* Suggestion Box */}
          <div className="mb-6 bg-yellow-100 dark:bg-yellow-800 p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2 text-yellow-800 dark:text-yellow-100">📌 Suggestions</h2>
            <ul className="list-disc list-inside">
              {generateSuggestions(allConcepts).map((s, i) => (
                <li key={i} className="text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Matrix Table */}
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={cellClass}>Chapter</th>
                {subjects.map(subject => (
                  <th key={subject} className={cellClass}>{subject}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calculateMatrix().map((row, i) => (
                <tr key={i}>
                  <td className={cellClass}>{row.chapter}</td>
                  {subjects.map(subject => (
                    <td key={subject} className={cellClass}>
                      Score: {row[subject].score}<br />
                      📘 Learn: {row[subject].learningTime}m<br />
                      📝 Test: {row[subject].testTime}m
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Subject Tab */}
      {activeTab === 'Subject' && (
        <div className="flex gap-6">
          <div className="w-1/4">
            <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded shadow">
              <h2 className="font-semibold text-lg mb-2 text-yellow-800 dark:text-yellow-100">📌 Suggestions</h2>
              <ul className="list-disc list-inside text-sm">
                {generateSuggestions(allConcepts).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-3/4 space-y-8">
            {renderChart(
              subjects,
              [
                {
                  label: 'Score',
                  data: subjects.map(sub => allConcepts.filter(c => c.subject === sub).reduce((s, c) => s + (c.score || 0), 0)),
                  backgroundColor: subjects.map(sub => subjectColors[sub]),
                },
              ]
            )}
            {renderChart(
              subjects,
              [
                {
                  label: 'Learning Time (mins)',
                  data: subjects.map(sub => allConcepts.filter(c => c.subject === sub).reduce((s, c) => s + (c.learningTime || 0), 0)),
                  backgroundColor: subjects.map(sub => subjectColors[sub]),
                },
                {
                  label: 'Test Time (mins)',
                  data: subjects.map(sub => allConcepts.filter(c => c.subject === sub).reduce((s, c) => s + (c.testTime || 0), 0)),
                  backgroundColor: subjects.map(sub => subjectColors[sub].replace('0.6', '0.3')),
                },
              ]
            )}
          </div>
        </div>
      )}

      {/* Chapter Tab */}
      {activeTab === 'Chapter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map(subject => {
            const chapterScores = chapters.map(ch =>
              allConcepts
                .filter(c => c.subject === subject && c.chapter === ch)
                .reduce((s, c) => s + (c.score || 0), 0)
            );
            const chapterLearn = chapters.map(ch =>
              allConcepts
                .filter(c => c.subject === subject && c.chapter === ch)
                .reduce((s, c) => s + (c.learningTime || 0), 0)
            );
            const chapterTest = chapters.map(ch =>
              allConcepts
                .filter(c => c.subject === subject && c.chapter === ch)
                .reduce((s, c) => s + (c.testTime || 0), 0)
            );

            return (
              <div key={subject} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
                <h2 className="font-semibold mb-2">{subject}</h2>
                {renderChart(chapters, [
                  {
                    label: 'Score',
                    data: chapterScores,
                    backgroundColor: subjectColors[subject],
                  },
                ])}
                {renderChart(chapters, [
                  {
                    label: 'Learning Time (mins)',
                    data: chapterLearn,
                    backgroundColor: subjectColors[subject],
                  },
                  {
                    label: 'Test Time (mins)',
                    data: chapterTest,
                    backgroundColor: subjectColors[subject].replace('0.6', '0.3'),
                  },
                ])}
                <div className="mt-2 text-sm text-yellow-900 dark:text-yellow-200">
                  {generateSuggestions(allConcepts.filter(c => c.subject === subject)).map((s, i) => (
                    <div key={i}>📌 {s}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Concepts Tab */}
      {activeTab === 'Concepts' && (
        <div>
          <div className="mb-4 flex gap-4 flex-wrap">
            <select
              value={selectedSubject}
              onChange={e => {
                setSelectedSubject(e.target.value);
                setSelectedChapter('');
              }}
              className="p-2 bg-white dark:bg-gray-700 border rounded dark:text-white"
            >
              <option value="">Select Subject</option>
              {subjects.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedChapter}
              onChange={e => setSelectedChapter(e.target.value)}
              className="p-2 bg-white dark:bg-gray-700 border rounded dark:text-white"
              disabled={!selectedSubject}
            >
              <option value="">Select Chapter</option>
              {chapters.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {selectedSubject && selectedChapter && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
              {renderChart(
                filterConcepts(selectedSubject, selectedChapter).map(c => c.name),
                [
                  {
                    label: 'Score',
                    data: filterConcepts(selectedSubject, selectedChapter).map(c => c.score),
                    backgroundColor: subjectColors[selectedSubject],
                  },
                ]
              )}

              <div className="mt-4 bg-yellow-100 dark:bg-yellow-800 p-3 rounded text-sm">
                <h2 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-100">📌 Suggestions</h2>
                <ul className="list-disc list-inside">
                  {generateSuggestions(filterConcepts(selectedSubject, selectedChapter)).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Performance Review Tab */}
      {activeTab === 'Performance Review' && (
        <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-100">📈 Performance Review</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={cellClass}>Subject</th>
                <th className={cellClass}>Sub</th>
                <th className={cellClass}>Chapter</th>
                <th className={cellClass}>Concept</th>
                <th className={cellClass}>Score</th>
                <th className={cellClass}>📘 Learn Time</th>
                <th className={cellClass}>📝 Test Time</th>
                <th className={cellClass}>Attempted</th>
              </tr>
            </thead>
            <tbody>
              {allConcepts.map((c, idx) => (
                <tr key={idx}>
                  <td className={cellClass}>{c.subject}</td>
                  <td className={cellClass}>{c.sub || '-'}</td>
                  <td className={cellClass}>{c.chapter}</td>
                  <td className={cellClass}>{c.name}</td>
                  <td className={cellClass}>{c.score}</td>
                  <td className={cellClass}>{c.learningTime}</td>
                  <td className={cellClass}>{c.testTime}</td>
                  <td className={cellClass}>{c.attempted ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {generateSuggestions(allConcepts).length > 0 && (
            <div className="mt-6 bg-yellow-100 dark:bg-yellow-800 p-4 rounded shadow">
              <h2 className="font-semibold text-lg mb-2 text-yellow-800 dark:text-yellow-100">📌 Suggestions</h2>
              <ul className="list-disc list-inside space-y-2">
                {generateSuggestions(allConcepts).map((s, i) => (
                  <li key={i} className="text-sm">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
