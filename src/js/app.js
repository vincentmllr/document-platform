import * as npm from "https://cdn.skypack.dev/npm@7.20.6";
import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class Search extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value:"",
    }
  }
  
  handleClick() {
    console.log(`Searching for \"${this.state.value}\"...`);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleBlur() {
    console.log('You finished typing:', this.state.value)

  }
  
  render() {       
    return (
      <div id="searchbar">
        <input type="text" placeholder="Enter term" value={this.state.value} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)}></input>
        <button onClick={() => this.handleClick()}>Search</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById("search")
);