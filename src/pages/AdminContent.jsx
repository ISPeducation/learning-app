import React, { useState } from "react";
import { useDarkMode } from "../DarkModeContext";
import { motion } from "framer-motion";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const subjects = {
  Maths: ["Arithmetic", "Algebra", "Geometry"],
  Science: ["Physics", "Chemistry", "Biology"],
  Social: ["History", "Civics", "Geography"],
  Others: ["Commercial Studies", "Economics"],
};

const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);
const concepts = Array.from({ length: 10 }, (_, i) => `Concept ${i + 1}`);

const AdminContent = () => {
  const { darkMode } = useDarkMode();
  const [subject, setSubject] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [chapter, setChapter] = useState("");
  const [concept, setConcept] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!subject || !subtopic || !chapter || !concept || !videoFile) {
      return setMessage("Please fill all fields and select a video.");
    }

    setUploading(true);
    setMessage("");

    try {
      // Upload video
      const videoRef = ref(storage, `${subject}/${subtopic}/${chapter}/${concept}/video.mp4`);
      await uploadBytes(videoRef, videoFile);
      const videoURL = await getDownloadURL(videoRef);

      // Upload PDF if selected
      let pdfURL = "";
      if (pdfFile) {
        const pdfRef = ref(storage, `${subject}/${subtopic}/${chapter}/${concept}/material.pdf`);
        await uploadBytes(pdfRef, pdfFile);
        pdfURL = await getDownloadURL(pdfRef);
      }

      // Save to Firestore
      const docRef = await addDoc(collection(db, "content"), {
        subject,
        subtopic,
        chapter,
        concept,
        videoURL,
        pdfURL,
        timestamp: new Date(),
      });

      setMessage("✅ Uploaded successfully!");
      setVideoFile(null);
      setPdfFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-6 py-12 ${
        darkMode ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">📚 Manage Content</h1>

        <div className="grid gap-4">
          {/* Subject Dropdown */}
          <select value={subject} onChange={(e) => { setSubject(e.target.value); setSubtopic(""); }} className="p-2 border rounded">
            <option value="">Select Subject</option>
            {Object.keys(subjects).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Subtopic Dropdown */}
          {subject && (
            <select value={subtopic} onChange={(e) => setSubtopic(e.target.value)} className="p-2 border rounded">
              <option value="">Select Subtopic</option>
              {subjects[subject].map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          )}

          {/* Chapter Dropdown */}
          {subtopic && (
            <select value={chapter} onChange={(e) => setChapter(e.target.value)} className="p-2 border rounded">
              <option value="">Select Chapter</option>
              {chapters.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          )}

          {/* Concept Dropdown */}
          {chapter && (
            <select value={concept} onChange={(e) => setConcept(e.target.value)} className="p-2 border rounded">
              <option value="">Select Concept</option>
              {concepts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Upload Inputs */}
          {concept && (
            <>
              <div>
                <label className="block font-medium mb-1">Upload Video (MP4)</label>
                <input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files[0])} />
              </div>

              <div>
                <label className="block font-medium mb-1">Upload PDF (Optional)</label>
                <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {uploading ? "Uploading..." : "Upload Content"}
              </button>

              {message && (
                <p className="mt-3 font-semibold" style={{ color: message.startsWith("✅") ? "green" : "red" }}>
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminContent;
