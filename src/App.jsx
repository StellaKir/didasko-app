import './App.css'
import { useState } from 'react'
import StatCard from './components/StatCard'
import LessonRow from './components/LessonRow'


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

  function addLesson() {
    const newLesson = {
      id: lessons.length + 1,
      time: '21:00',
      student: 'Νέος Μαθητής',
      subject: 'Ιστορία',
      duration: "60'",
    }
    

    setLessons([...lessons, newLesson])
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

          <button className="add-btn">+ Νέος Μαθητής</button>
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
            <button onClick={addLesson} className="add-lesson-btn">
               + Προσθήκη Μαθήματος
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

        </section>
      </main>
    </div>
  )
}

export default App