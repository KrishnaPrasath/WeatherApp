import React from "react";

class Form extends React.Component {
  state = { value: "" };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };
  sendWeatherReport = () => {
    this.props.handleClick(this.state.value);
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Weather Report</span>
        </nav>
        <div>
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.value}
          ></input>
          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={this.sendWeatherReport}
          >
            Check
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
