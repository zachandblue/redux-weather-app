import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCity } from '../actions';

class CityInput extends Component {
  constructor() {
    super();

    this.state = {
      city: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ city: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const city = this.state.city;
    await this.props.setCity(city);
    this.props.getData(city);
    this.setState({ city: '' });
  }

  render() {
    return (
      <div className="city-input-container">
        <form className="city-form" onSubmit={this.handleSubmit}>
          <input
            className="city-input"
            type="text"
            onChange={this.handleChange}
            value={this.state.city}
            placeholder="Enter City"
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCity }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(CityInput);
