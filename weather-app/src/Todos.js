import React, { Component } from "react";
export default class Todos extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Temperature</th>
            <th>Weather</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weatherReport.map(report => {
            return (
              <tr>
                <td>{report.name}</td>
                <td>{report.temperature}</td>
                <td>{report.weather}</td>
                <td>{report.humidity}</td>
                <td>
                  <span>
                    <button
                      className="btn btn-primary"
                      onClick={this.props.deleteItem.bind(this, report.name)}
                    >
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
