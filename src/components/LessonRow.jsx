function LessonRow(props) {
  return (
    <div className="lesson-row">
      <div className="lesson-time">{props.time}</div>

      <div>
        <h4>{props.student}</h4>
        <p>{props.subject}</p>
      </div>

      <span className="lesson-duration">{props.duration}</span>
    </div>
  )
}

export default LessonRow