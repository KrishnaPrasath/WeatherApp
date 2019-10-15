import React, { Component } from "react";
import Form from "./Form";
import Todos from "./Todos";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class App extends Component {
  state = { weatherReport: [] };

  componentDidMount = () => {
    axios
      .get(`http://localhost:3030/getData`)
      .then(res => {
        console.log(res.data);
        this.setState({
          weatherReport: [...this.state.weatherReport, ...res.data]
        });
      })
      .catch(err => console.log(err));
  };

  handleClick = value => {
    console.log("v", value);
    axios
      .get(`http://localhost:3030/getData/${value}`)
      .then(res => {
        let str = res.data;
        return str;
      })
      .then(str => {
        let weather = JSON.parse(str);

        let report = {
          weather: weather.weather[0].description,
          temperature: weather.main.temp,
          humidity: weather.main.humidity,
          name: weather.name
        };
        this.setState({ weatherReport: [...this.state.weatherReport, report] });

        // console.log(typeof weather);
        axios
          .post("http://localhost:3030/postData", report)
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
        // this.setState({ weatherReport: [...this.state.weatherReport, report] });
      })

      // console.log(typeof weather);
      //   axios
      //     .post("http://localhost:3030/postData", report)
      //     .then(res => {
      //       console.log(res);
      //     })
      //     .catch(err => console.log(err));
      //   this.setState({ weatherReport: [...this.state.weatherReport, report] });
      // })
      .catch(err => {
        console.log("Failed", err);
      });
  };

  deleteItem = name => {
    this.setState({
      weatherReport: this.state.weatherReport.filter(
        report => report.name !== name
      )
    });
  };
  render() {
    return (
      <div className="container">
        <Form handleClick={this.handleClick} />
        <Todos
          weatherReport={this.state.weatherReport}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
