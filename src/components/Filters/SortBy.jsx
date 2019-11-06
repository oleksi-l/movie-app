import React from "react";
import PropTypes from "prop-types";
import Select from "../UI/Select";

class SortBy extends React.Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: {
      sort_by: [
        {
          label: "Популярные по убыванию",
          value: "popularity.desc"
        },
        {
          label: "Популярные по возростанию",
          value: "popularity.asc"
        },
        {
          label: "Рейтинг по убыванию",
          value: "vote_average.desc"
        },
        {
          label: "Рейтинг по возростанию",
          value: "vote_average.asc"
        }
      ],
      year: [
        {
          label: "2019",
          value: 2019
        },
        {
          label: "2018",
          value: 2018
        },
        {
          label: "2017",
          value: 2017
        },
        {
          label: "2016",
          value: 2016
        }
      ]
    }
  };
  render() {
    const { sort_by, onChangeFilters, options, type, title } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={type}>{title}</label>
        <Select
          id={type}
          name={type}
          value={sort_by}
          onChange={onChangeFilters}
          options={options[type]}
        />
      </div>
    );
  }
}

export default SortBy;
