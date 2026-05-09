import './App.css'
import { useState, useEffect } from 'react'

import StatCard from './components/StatCard'
import LessonRow from './components/LessonRow'
import StudentCard from './components/StudentCard'

const todayDate = new Date().toLocaleDateString('en-CA')

const defaultLessons = [
  {
    id: 1,
    date: todayDate,
    time: '15:00',
    student: 'Νίκος Αλεξίου',
    subject: 'Μαθηματικά',
    duration: "60'",
    cancelled: false,
  },
  {
    id: 2,
    date: todayDate,
    time: '17:00',
    student: 'Ελένη Κωστοπούλου',
    subject: 'Αγγλικά',
    duration: "60'",
    cancelled: false,
  },
  {
    id: 3,
    date: todayDate,
    time: '19:00',
    student: 'Μαρία Σταύρου',
    subject: 'Φυσική',
    duration: "60'",
    cancelled: false,
  },
]

const defaultStudents = [
  {
    id: 1,
    name: 'Νίκος Αλεξίου',
    phone: '6912345678',
    subject: 'Μαθηματικά',
    classLevel: "Γ' Λυκείου",
    notes: '',
    price: 20,
    paid: false,
  },
  {
    id: 2,
    name: 'Ελένη Κωστοπούλου',
    phone: '6923456789',
    subject: 'Αγγλικά',
    classLevel: "Β' Γυμνασίου",
    notes: '',
    price: 20,
    paid: false,
  },
  {
    id: 3,
    name: 'Μαρία Σταύρου',
    phone: '6934567890',
    subject: 'Φυσική',
    classLevel: "Α' Λυκείου",
    notes: '',
    price: 20,
    paid: false,
  },
]

function App() {
  const [lessons, setLessons] = useState(() => {
    const savedLessons = localStorage.getItem('didasko_lessons')
    return savedLessons ? JSON.parse(savedLessons) : defaultLessons
  })

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('didasko_students')
    return savedStudents ? JSON.parse(savedStudents) : defaultStudents
  })

  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isEditingStudent, setIsEditingStudent] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [studentClassLevel, setStudentClassLevel] = useState('')
  const [studentSubject, setStudentSubject] = useState('')
  const [studentPrice, setStudentPrice] = useState('')

  const [lessonStudent, setLessonStudent] = useState('')
  const [lessonTime, setLessonTime] = useState('')
  const [lessonDate, setLessonDate] = useState('')
  const [lessonSubject, setLessonSubject] = useState('')
  const [lessonDuration, setLessonDuration] = useState("60'")

  useEffect(() => {
    localStorage.setItem('didasko_students', JSON.stringify(students))
  }, [students])

  useEffect(() => {
    localStorage.setItem('didasko_lessons', JSON.stringify(lessons))
  }, [lessons])

  function addStudent() {
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      studentClassLevel === '' ||
      studentSubject === '' ||
      studentPrice === ''
    ) {
      return
    }

    const newStudent = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      phone: phone,
      subject: studentSubject,
      classLevel: studentClassLevel,
      notes: '',
      price: Number(studentPrice),
      paid: false,
    }

    setStudents([...students, newStudent])

    setFirstName('')
    setLastName('')
    setPhone('')
    setStudentClassLevel('')
    setStudentSubject('')
    setStudentPrice('')
    setShowStudentModal(false)
  }

  function deleteStudent(id) {
    const filteredStudents = students.filter((student) => student.id !== id)
    setStudents(filteredStudents)

    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(null)
    }
  }

  function updateStudentNotes(id, newNotes) {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          notes: newNotes,
        }
      }

      return student
    })

    setStudents(updatedStudents)

    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({
        ...selectedStudent,
        notes: newNotes,
      })
    }
  }

  function togglePayment(id) {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          paid: !student.paid,
        }
      }

      return student
    })

    setStudents(updatedStudents)

    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({
        ...selectedStudent,
        paid: !selectedStudent.paid,
      })
    }
  }

  function updateStudentField(id, field, value) {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          [field]: value,
        }
      }

      return student
    })

    setStudents(updatedStudents)

    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({
        ...selectedStudent,
        [field]: value,
      })
    }
  }

  function addLesson() {
    if (
      lessonStudent.trim() === '' ||
      lessonTime.trim() === '' ||
      lessonDate.trim() === '' ||
      lessonSubject.trim() === ''
    ) {
      return
    }

    const newLesson = {
      id: Date.now(),
      time: lessonTime,
      date: lessonDate,
      student: lessonStudent,
      subject: lessonSubject,
      duration: lessonDuration,
      cancelled: false,
    }

    setLessons([...lessons, newLesson])

    setLessonDate('')
    setLessonStudent('')
    setLessonTime('')
    setLessonSubject('')
    setLessonDuration("60'")
    setShowLessonModal(false)
  }

  function toggleLessonCancel(id) {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === id) {
        return {
          ...lesson,
          cancelled: !lesson.cancelled,
        }
      }

      return lesson
    })

    setLessons(updatedLessons)
  }

  const today = new Date().toLocaleDateString('en-CA')

  const todayLessons = lessons
    .filter((lesson) => lesson.date === today)
    .sort((a, b) => a.time.localeCompare(b.time))

  const sortedLessons = [...lessons].sort((a, b) => {
    if (a.date === b.date) {
      return a.time.localeCompare(b.time)
    }

    return a.date.localeCompare(b.date)
  })

  const totalLessons = lessons.length
  const totalHours = lessons.length

  const totalIncome = students
    .filter((student) => student.paid)
    .reduce((total, student) => total + student.price, 0)

  const unpaidAmount = students
    .filter((student) => !student.paid)
    .reduce((total, student) => total + student.price, 0)

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">
          Didask<span>o</span>
        </h1>

        <p className="tagline">Teaching, organized.</p>

        <nav className="menu">
          <button onClick={() => setActivePage('dashboard')}>
            Dashboard
          </button>

          <button onClick={() => setActivePage('schedule')}>
            Πρόγραμμα
          </button>

          <button onClick={() => setActivePage('students')}>
            Μαθητές
          </button>

          <button>Πληρωμές</button>
          <button>Ρυθμίσεις</button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>
              {activePage === 'dashboard' && 'Dashboard'}
              {activePage === 'schedule' && 'Πρόγραμμα'}
              {activePage === 'students' && 'Μαθητές'}
            </h2>
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
          {activePage === 'dashboard' && (
            <>
              <div className="stats-grid">
                <StatCard value={totalLessons} label="Μαθήματα" />
                <StatCard value={`${totalHours} ώρες`} label="Ώρες" />
                <StatCard value={`${totalIncome}€`} label="Έσοδα" />
                <StatCard
                  value={`${unpaidAmount}€`}
                  label="Εκκρεμείς Πληρωμές"
                />
              </div>

              <div className="today-card">
                <h3>Σήμερα</h3>

                <button
                  onClick={() => setShowLessonModal(true)}
                  className="add-lesson-btn"
                >
                  + Νέο Μάθημα
                </button>

                {todayLessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    time={lesson.time}
                    date={lesson.date}
                    student={lesson.student}
                    subject={lesson.subject}
                    duration={lesson.duration}
                    cancelled={lesson.cancelled}
                    onCancel={() => toggleLessonCancel(lesson.id)}
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
                      onClick={() => {
                        setSelectedStudent(student)
                        setIsEditingStudent(false)
                      }}
                      onDelete={() => deleteStudent(student.id)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activePage === 'schedule' && (
            <div className="schedule-page">
              <h2>Πρόγραμμα</h2>

              <button
                onClick={() => setShowLessonModal(true)}
                className="add-lesson-btn"
              >
                + Νέο Μάθημα
              </button>

              <div className="all-lessons">
                {sortedLessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    time={lesson.time}
                    date={lesson.date}
                    student={lesson.student}
                    subject={lesson.subject}
                    duration={lesson.duration}
                    cancelled={lesson.cancelled}
                    onCancel={() => toggleLessonCancel(lesson.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {activePage === 'students' && (
            <div className="students-page">
              <h2>Όλοι οι Μαθητές</h2>

              <div className="students-grid">
                {students.map((student) => (
                  <StudentCard
                    key={student.id}
                    name={student.name}
                    phone={student.phone}
                    subject={student.subject}
                    classLevel={student.classLevel}
                    onClick={() => {
                      setSelectedStudent(student)
                      setIsEditingStudent(false)
                    }}
                    onDelete={() => deleteStudent(student.id)}
                  />
                ))}
              </div>
            </div>
          )}
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

              <label>
                Τάξη
                <select
                  value={studentClassLevel}
                  onChange={(e) => setStudentClassLevel(e.target.value)}
                >
                  <option value="">Επίλεξε τάξη</option>
                  <option value="Α' Γυμνασίου">Α' Γυμνασίου</option>
                  <option value="Β' Γυμνασίου">Β' Γυμνασίου</option>
                  <option value="Γ' Γυμνασίου">Γ' Γυμνασίου</option>
                  <option value="Α' Λυκείου">Α' Λυκείου</option>
                  <option value="Β' Λυκείου">Β' Λυκείου</option>
                  <option value="Γ' Λυκείου">Γ' Λυκείου</option>
                </select>
              </label>

              <label>
                Μάθημα
                <select
                  value={studentSubject}
                  onChange={(e) => setStudentSubject(e.target.value)}
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
                Τιμή ανά μάθημα
                <input
                  type="number"
                  value={studentPrice}
                  onChange={(e) => setStudentPrice(e.target.value)}
                  placeholder="π.χ. 20"
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
                Ημερομηνία
                <input
                  type="date"
                  value={lessonDate}
                  onChange={(e) => setLessonDate(e.target.value)}
                />
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

              <button
                className="edit-btn"
                onClick={() => setIsEditingStudent(!isEditingStudent)}
              >
                {isEditingStudent ? 'Ολοκλήρωση' : 'Επεξεργασία'}
              </button>

              <p>{selectedStudent.subject}</p>

              <div className="profile-info">
                <div>
                  <strong>Τάξη</strong>

                  {isEditingStudent ? (
                    <select
                      value={selectedStudent.classLevel}
                      onChange={(e) =>
                        updateStudentField(
                          selectedStudent.id,
                          'classLevel',
                          e.target.value
                        )
                      }
                    >
                      <option value="Α' Γυμνασίου">Α' Γυμνασίου</option>
                      <option value="Β' Γυμνασίου">Β' Γυμνασίου</option>
                      <option value="Γ' Γυμνασίου">Γ' Γυμνασίου</option>
                      <option value="Α' Λυκείου">Α' Λυκείου</option>
                      <option value="Β' Λυκείου">Β' Λυκείου</option>
                      <option value="Γ' Λυκείου">Γ' Λυκείου</option>
                    </select>
                  ) : (
                    <span>{selectedStudent.classLevel}</span>
                  )}
                </div>

                <div>
                  <strong>Μάθημα</strong>

                  {isEditingStudent ? (
                    <select
                      value={selectedStudent.subject}
                      onChange={(e) =>
                        updateStudentField(
                          selectedStudent.id,
                          'subject',
                          e.target.value
                        )
                      }
                    >
                      <option value="Μαθηματικά">Μαθηματικά</option>
                      <option value="Πληροφορική">Πληροφορική</option>
                      <option value="Αρχαία">Αρχαία</option>
                      <option value="Έκθεση">Έκθεση</option>
                      <option value="Φυσική">Φυσική</option>
                      <option value="Χημεία">Χημεία</option>
                      <option value="Αγγλικά">Αγγλικά</option>
                    </select>
                  ) : (
                    <span>{selectedStudent.subject}</span>
                  )}
                </div>

                <div>
                  <strong>Τηλέφωνο</strong>

                  {isEditingStudent ? (
                    <input
                      type="text"
                      value={selectedStudent.phone}
                      onChange={(e) =>
                        updateStudentField(
                          selectedStudent.id,
                          'phone',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <span>
                      {selectedStudent.phone || 'Δεν έχει προστεθεί'}
                    </span>
                  )}
                </div>

                <div>
                  <strong>Τιμή</strong>

                  {isEditingStudent ? (
                    <input
                      type="number"
                      value={selectedStudent.price}
                      onChange={(e) =>
                        updateStudentField(
                          selectedStudent.id,
                          'price',
                          Number(e.target.value)
                        )
                      }
                    />
                  ) : (
                    <span>{selectedStudent.price}€</span>
                  )}
                </div>

                <div>
                  <strong>Κατάσταση πληρωμής</strong>
                  <span>{selectedStudent.paid ? 'Πληρωμένο' : 'Εκκρεμεί'}</span>
                </div>
              </div>

              <button
                className={selectedStudent.paid ? 'paid-btn' : 'unpaid-btn'}
                onClick={() => togglePayment(selectedStudent.id)}
              >
                {selectedStudent.paid
                  ? 'Σήμανση ως απλήρωτο'
                  : 'Σήμανση ως πληρωμένο'}
              </button>

              <div className="notes-section">
                <h4>Σημειώσεις</h4>

                <textarea
                  placeholder="Γράψε σημειώσεις για τον μαθητή..."
                  value={selectedStudent.notes}
                  onChange={(e) =>
                    updateStudentNotes(selectedStudent.id, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App