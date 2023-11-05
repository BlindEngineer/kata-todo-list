import './Timer.css'

function Timer({ minutes, seconds }) {
  return (
    <span className="description timer">
      <button type="button" className="icon icon-play" aria-label="Play" />
      <button type="button" className="icon icon-pause" aria-label="Pause" />
      {minutes}:{seconds}
    </span>
  )
}

export default Timer
