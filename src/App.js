import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lastClick: '',
      operatorClick: false,
      operator: '+',
      resultSoFar: 0,
      screen: '0',
    }
  }

  onNumber(e) {
    let val;

    /* if a math operator was clicked, we want to reset
       the screen for the next number input, otherwise
       we just keep adding numbers to the screen */
    if (this.state.operatorClick) {
      val = '';
      this.setState({ operatorClick: false });
    } else {
      val = this.state.screen;
    }

    // special cases for if the initial value on the screen is 0 or -0
    if (val === '0') {
      val = e.target.innerText;
    } else if (this.state.screen === '-0') {
      val = '-' + e.target.innerText;
    } else {
      val += e.target.innerText;
    }

    this.setState({
      lastClick: e.target.innerText,
      screen: val
    });
  }

  onOperator(e) {
    let operator = e.target.innerText;

    if (operator === 'AC') {
      this.setCalc(0, '0', '+', false);
    } else if (operator === '±') {
      this.handlePosNeg(operator);
    } else if (operator === '%') {
      this.handlePercent(operator);
    } else if (operator === '.') {
      this.handlePoint(operator);
    // if someone clicks the wrong operator and corrects themselves
    // ex. hits '4', '-', '+', '2', '=', the result will be 6
    } else if (this.state.operatorClick === true) {
      this.setState({
        lastClick: operator,
        operator: operator
      });
    } else {
      this.handleMath(operator);
    }
  }

  handleMath(operator) {
    let val;

    // checks the current operator and executes that before setting
    // the next operator value for the next math operation
    switch(this.state.operator) {
      case '+':
        val = this.state.resultSoFar + Number(this.state.screen);
        this.setCalc(val, val.toString(), operator, true);
        break;
      case '-':
        val = this.state.resultSoFar - Number(this.state.screen);
        this.setCalc(val, val.toString(), operator, true);
        break;
      case '×':
        val = this.state.resultSoFar * Number(this.state.screen);
        this.setCalc(val, val.toString(), operator, true);
        break;
      case '÷':
        val = this.state.resultSoFar / Number(this.state.screen);
        this.setCalc(val, val.toString(), operator, true);
        break;
      case '=':
        this.setCalc(Number(this.state.screen), this.state.screen, operator, true);
        break;
      default:
        break;
    }
  }

  handlePosNeg(operator) {
    let val;

    /* if any of the following were the last button that was clicked immediately
       before ± is clicked, then the screen will be set to -0 in order to attribute
       the negative value to the next number */
    if (this.state.lastClick === '+' ||
        this.state.lastClick === '-' ||
        this.state.lastClick === '×' ||
        this.state.lastClick === '÷' ||
        this.state.lastClick === '=') {
      this.setState({ screen: '-0' });
    } else {
      // toggles negative and positive
      if (this.state.screen.charAt(0) === '-') {
        val = this.state.screen.slice(1);
      } else {
        val = '-' + this.state.screen;
      }

      this.setState({
        lastClick: operator,
        screen: val
      });
    }

  }

  handlePercent(operator) {
    let val;
    if (this.state.screen.indexOf('.') === -1) {
      val = Number(this.state.screen) / 100;
    } else {
      /* Javascript treats floating point numbers abnormally,
        calling % on a number more than once leaves a result
        with an extra 000000001 at the end (for example, inputting
        7 and selecting % twice in a row would equal 0.000700000001).
        Converting to array and forcibly adding '00' after the '.'
        is the workaround solution below */
      val = this.state.screen.split('');
      val.splice(val.indexOf('.') + 1, 0, '00');
      val = val.join('');
    }

    this.setState({
      screen: val.toString()
    });
  }

  handlePoint(operator) {
    let val = this.state.screen + '.'

    this.setState({
      result: Number(val),
      screen: val
    });
  }

  setCalc(result, screen, operator, click) {
    this.setState({
      resultSoFar: result,
      screen: screen,
      operator: operator,
      operatorClick: click,
      lastClick: operator
    });
  }

  render() {

    return (
      <div className="parent">
        <div className="container">
          <div className="stripes">
            <div className="screen">{this.state.screen}</div>
          </div>

          <button className="row red-button" onClick={this.onOperator.bind(this)}>AC</button>
          <button className="red-button" onClick={this.onOperator.bind(this)}>&plusmn;</button>
          <button onClick={this.onOperator.bind(this)}>%</button>
          <button onClick={this.onOperator.bind(this)}>&divide;</button>

          <button className="row" onClick={this.onNumber.bind(this)}>7</button>
          <button onClick={this.onNumber.bind(this)}>8</button>
          <button onClick={this.onNumber.bind(this)}>9</button>
          <button onClick={this.onOperator.bind(this)}>&times;</button>

          <button className="row" onClick={this.onNumber.bind(this)}>4</button>
          <button onClick={this.onNumber.bind(this)}>5</button>
          <button onClick={this.onNumber.bind(this)}>6</button>
          <button onClick={this.onOperator.bind(this)}>-</button>

          <button className="row" onClick={this.onNumber.bind(this)}>1</button>
          <button onClick={this.onNumber.bind(this)}>2</button>
          <button onClick={this.onNumber.bind(this)}>3</button>
          <button onClick={this.onOperator.bind(this)}>+</button>

          <button className="big-button" onClick={this.onNumber.bind(this)}>0</button>
          <button onClick={this.onOperator.bind(this)}>.</button>
          <button onClick={this.onOperator.bind(this)}>=</button>
          <div></div>
        </div>
      </div>
    );
  }
}

export default App;
