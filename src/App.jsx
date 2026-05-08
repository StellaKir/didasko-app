import './App.css'
import { useState } from 'react'

import StatCard from './components/StatCard'
import LessonRow from './components/LessonRow'
import StudentCard from './components/StudentCard'

function App() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      time: '15:00',
      student: 'Νίκος Αλεξίου',
      subject: 'Μαθηματικά',
      duration: "60'",
    },
    {
      id: 2,
      time: '17:00',
      student: 'Ελένη Κωστοπούλου',
      subject: 'Αγγλικά',
      duration: "60'",
    },
    {
      id: 3,
      time: '19:00',
      student: 'Μαρία Σταύρου',
      subject: 'Φυσική',
      duration: "60'",
    },
  ])

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Νίκος Αλεξίου',
      phone: '6912345678',
      subject: 'Μαθηματικά',
      classLevel: "Γ' Λυκείου",
    },
    {
      id: 2,
      name: 'Ελένη Κωστοπούλου',
      phone: '6923456789',
      subject: 'Αγγλικά',
      classLevel: "Β' Γυμνασίου",
    },
    {
      id: 3,
      name: 'Μαρία Σταύρου',
      phone: '6934567890',
      subject: 'Φυσική',
      classLevel: "Α' Λυκείου",
    },
  ])

  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const [lessonStudent, setLessonStudent] = useState('')
  const [lessonTime, setLessonTime] = useState('')
  const [lessonSubject, setLessonSubject] = useState('')
  const [lessonDuration, setLessonDuration] = useState("60'")

  function addStudent() {
    if (firstName.trim() === '' || lastName.trim() === '') return

    const newStudent = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      phone: phone,
      subject: 'Νέο Μάθημα',
      classLevel: 'Λύκειο',
    }

    setStudents([...students, newStudent])

    setFirstName('')
    setLastName('')
    setPhone('')
    setShowStudentModal(false)
  }

  function deleteStudent(id) {
    const filteredStudents = students.filter((student) => student.id !== id)
    setStudents(filteredStudents)
  }

  function addLesson() {
    if (
      lessonStudent.trim() === '' ||
      lessonTime.trim() === '' ||
      lessonSubject.trim() === ''
    ) {
      return
    }

    const newLesson = {
      id: Date.now(),
      time: lessonTime,
      student: lessonStudent,
      subject: lessonSubject,
      duration: lessonDuration,
    }

    setLessons([...lessons, newLesson])

    setLessonStudent('')
    setLessonTime('')
    setLessonSubject('')
    setLessonDuration("60'")
    setShowLessonModal(false)
  }

  const totalLessons = lessons.length
  const totalHours = lessons.length
  const totalIncome = lessons.length * 20

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">
          Didask<span>o</span>
        </h1>

        <p className="tagline">Teaching, organized.</p>

        <nav className="menu">
          <button>Dashboard</button>
          <button>Πρόγραμμα</button>
          <button>Μαθητές</button>
          <button>Πληρωμές</button>
          <button>Ρυθμίσεις</button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Καλώς ήρθες στο Didasko</p>
          </div>

          <button
            className="add-btn"
            onClick={() => setShowStudentModal(true)}
          >
            + Νέος Μαθητής
          </button>
        </header>

        <section className="content">
          <div className="stats-grid">
            <StatCard value={totalLessons} label="Μαθήματα" />
            <StatCard value={`${totalHours} ώρες`} label="Ώρες" />
            <StatCard value={`${totalIncome}€`} label="Έσοδα" />
            <StatCard value="0€" label="Έξοδα" />
          </div>

          <div className="today-card">
            <h3>Σήμερα</h3>

            <button
              onClick={() => setShowLessonModal(true)}
              className="add-lesson-btn"
            >
              + Νέο Μάθημα
            </button>

            {lessons.map((lesson) => (
              <LessonRow
                key={lesson.id}
                time={lesson.time}
                student={lesson.student}
                subject={lesson.subject}
                duration={lesson.duration}
              />
            ))}
          </div>

          <div className="students-section">
            <h2>Μαθητές</h2>

            <div className="students-grid">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  name={student.name}
                  phone={student.phone}
                  subject={student.subject}
                  classLevel={student.classLevel}
                  onClick={() => setSelectedStudent(student)}
                  onDelete={() => deleteStudent(student.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Νέος Μαθητής</h2>

              <button
                className="modal-close"
                onClick={() => setShowStudentModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-form">
              <label>
                Όνομα
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="π.χ. Νίκος"
                />
              </label>

              <label>
                Επώνυμο
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="π.χ. Αλεξίου"
                />
              </label>

              <label>
                Τηλέφωνο
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="π.χ. 6912345678"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowStudentModal(false)}
              >
                Άκυρο
              </button>

              <button className="save-btn" onClick={addStudent}>
                Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}

      {showLessonModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Νέο Μάθημα</h2>

              <button
                className="modal-close"
                onClick={() => setShowLessonModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-form">
              <label>
                Μαθητής
                <select
                  value={lessonStudent}
                  onChange={(e) => setLessonStudent(e.target.value)}
                >
                  <option value="">Επίλεξε μαθητή</option>

                  {students.map((student) => (
                    <option key={student.id} value={student.name}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Ώρα
                <input
                  type="time"
                  value={lessonTime}
                  onChange={(e) => setLessonTime(e.target.value)}
                />
              </label>

<label>
  Μάθημα
  <select
    value={lessonSubject}
    onChange={(e) => setLessonSubject(e.target.value)}
  >
    <option value="">Επίλεξε μάθημα</option>

    <option value="Μαθηματικά">Μαθηματικά</option>

    <option value="Πληροφορική">Πληροφορική</option>

    <option value="Αρχαία">Αρχαία</option>

    <option value="Έκθεση">Έκθεση</option>

    <option value="Φυσική">Φυσική</option>

    <option value="Χημεία">Χημεία</option>

    <option value="Αγγλικά">Αγγλικά</option>
  </select>
</label>

              <label>
                Διάρκεια
                <select
                  value={lessonDuration}
                  onChange={(e) => setLessonDuration(e.target.value)}
                >
                  <option value="30'">30 λεπτά</option>
                  <option value="45'">45 λεπτά</option>
                  <option value="60'">60 λεπτά</option>
                  <option value="90'">90 λεπτά</option>
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLessonModal(false)}
              >
                Άκυρο
              </button>

              <button className="save-btn" onClick={addLesson}>
                Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Προφίλ Μαθητή</h2>

              <button
                className="modal-close"
                onClick={() => setSelectedStudent(null)}
              >
                ×
              </button>
            </div>

            <div className="student-profile">
              <div className="student-profile-avatar">
                {selectedStudent.name.charAt(0)}
              </div>

              <h3>{selectedStudent.name}</h3>
              <p>{selectedStudent.subject}</p>

              <div className="profile-info">
                <div>
                  <strong>Τάξη</strong>
                  <span>{selectedStudent.classLevel}</span>
                </div>

                <div>
                  <strong>Τηλέφωνο</strong>
                  <span>{selectedStudent.phone || 'Δεν έχει προστεθεί'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App