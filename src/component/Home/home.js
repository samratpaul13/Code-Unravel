import React, { Component } from "react";
import Body from "./body.js";
import Footer from '../Footer/footer';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="page-view">
        {/* <div><HomeHeader/></div> */}
        <div>
          <Body history={this.props.history} />
        </div>
        <div><Footer/></div>
      </div>
    );
  }
}

export default Home;
