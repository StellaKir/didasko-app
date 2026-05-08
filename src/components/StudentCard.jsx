function StudentCard(props) {
  return (
    <div className="student-card" onClick={props.onClick}>
      <div className="student-avatar">
        {props.name.charAt(0)}
      </div>

      <h3>{props.name}</h3>

      <p>{props.subject}</p>

      <span>{props.classLevel}</span>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation()
          props.onDelete()
        }}
      >
        Διαγραφή
      </button>
    </div>
  )
}

export default StudentCard