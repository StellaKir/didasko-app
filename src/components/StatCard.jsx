function StatCard(props) {
  return (
    <div className="stat-card">
      <h3>{props.value}</h3>
      <p>{props.label}</p>
    </div>
  )
}

export default StatCard