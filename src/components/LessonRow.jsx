function LessonRow(props) {
  return (
    <div className={props.cancelled ? 'lesson-row cancelled' : 'lesson-row'}>
      <div className="lesson-time">
        <span>{props.time}</span>
        <small>{props.date}</small>
      </div>

      <div>
        <h4>{props.student}</h4>
        <p>
          {props.subject}
          {props.cancelled && ' · Ακυρώθηκε'}
        </p>
      </div>

      <span className="lesson-duration">
        {props.cancelled ? 'Ακύρωση' : props.duration}
      </span>

      <button className="lesson-cancel-btn" onClick={props.onCancel}>
        {props.cancelled ? 'Επαναφορά' : 'Ακύρωση'}
      </button>
    </div>
  )
}

export default LessonRow