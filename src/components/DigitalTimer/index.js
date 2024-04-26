// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timerMinutes: 25, timerSeconds: 0, isStart: true}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimer = () => {
    const {timerMinutes, timerSeconds} = this.state

    const isTimerCompleted = timerMinutes * 60 === timerSeconds

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isStart: true})
    } else {
      this.setState(prevState => ({timerSeconds: prevState.timerSeconds + 1}))
    }
  }

  getTimerRunningAndPaused = () => {
    const {timerMinutes, timerSeconds} = this.state

    const remainingTimeInSeconds = timerMinutes * 60 - timerSeconds
    const minutes = Math.floor(remainingTimeInSeconds / 60)
    const seconds = Math.floor(remainingTimeInSeconds % 60)

    const signifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const signifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${signifiedMinutes}:${signifiedSeconds}`
  }

  onClickPlayIcon = () => {
    const {timerMinutes, timerSeconds, isStart} = this.state

    const isTimerCompleted = timerMinutes * 60 === timerSeconds

    if (isTimerCompleted) {
      this.setState({timerSeconds: 0})
    }

    if (isStart) {
      this.intervalId = setInterval(this.incrementTimer, 1000)
    } else {
      this.clearTimeInterval()
    }

    this.setState(prevState => ({isStart: !prevState.isStart}))
  }

  onClickResetIcon = () => {
    this.clearTimeInterval()
    this.setState({timerMinutes: 25, timerSeconds: 0, isStart: true})
  }

  decreaseTimeLimit = () => {
    const {timerMinutes} = this.state
    if (timerMinutes > 1) {
      this.setState({timerMinutes: timerMinutes - 1})
    }
  }

  increaseTimeLimit = () => {
    const {timerMinutes} = this.state

    this.setState({timerMinutes: timerMinutes + 1})
  }

  render() {
    const {isStart, timerMinutes, timerSeconds} = this.state
    const startOrPauseImage = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const startOrPauseText = isStart ? 'Start' : 'Pause'
    const changeTimerText = isStart ? 'Paused' : 'Running'
    const changeAltIcon = isStart ? 'play icon' : 'pause icon'
    const buttonDisabled = timerSeconds > 0

    return (
      <div className="app-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="timer-running-container">
          <div className="timer-start-stop-container">
            <div className="timer-display">
              <h1 className="timer">{this.getTimerRunningAndPaused()}</h1>
              <p className="timer-text">{changeTimerText}</p>
            </div>
          </div>
          <div className="set-timer-container">
            <div className="start-reset-container">
              <div className="play-button-container">
                <button className="play-icon-button" type="button">
                  <img
                    src={startOrPauseImage}
                    alt={changeAltIcon}
                    className="play-icon-image"
                    onClick={this.onClickPlayIcon}
                  />
                  {startOrPauseText}
                </button>
              </div>
              <div className="reset-button-container">
                <button
                  className="reset-icon-button"
                  type="button"
                  onClick={this.onClickResetIcon}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="reset-icon-image"
                  />
                  <p className="button-name">Reset</p>
                </button>
              </div>
            </div>
            <div className="set-time-limit">
              <p className="timer-limit">Set Timer Limit</p>
              <div className="change-timer-container">
                <button
                  disabled={buttonDisabled}
                  type="button"
                  className="increase-or-decrease"
                  onClick={this.decreaseTimeLimit}
                >
                  -
                </button>
                <p className="change-time">{timerMinutes}</p>
                <button
                  disabled={buttonDisabled}
                  type="button"
                  className="increase-or-decrease"
                  onClick={this.increaseTimeLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
