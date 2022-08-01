import React, { Component } from 'react';
import propTypes from 'prop-types';

class Filters extends Component {
  render() {
    const {
      onFilterTrunfo,
      disabled,
      filterName,
      filterRarity,
      onInputChange,
    } = this.props;
    return (
      <div className="filters-container">
        <h3>Filtros de busca</h3>

        <input
          type="text"
          name="filterName"
          id="card-name"
          data-testid="name-filter"
          placeholder="Nome da carta"
          value={ filterName }
          disabled={ disabled }
          onChange={ onInputChange }
          className="filter-name-input"
        />

        <select
          name="filterRarity"
          id="card-rarity"
          data-testid="rare-filter"
          value={ filterRarity }
          disabled={ disabled }
          onChange={ onInputChange }
          className="filter-rarity-select"
        >
          <option value="todas">Todas</option>
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito raro</option>
        </select>

        <label htmlFor="trunfo-card">
          <input
            type="checkbox"
            name="trunfo-card"
            id="trunfo-card"
            data-testid="trunfo-filter"
            onChange={ onFilterTrunfo }
            className="filter-trunfo-checkbox"
          />
          Super Trunfo
        </label>
      </div>
    );
  }
}

Filters.propTypes = {
  onFilterTrunfo: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
  filterName: propTypes.string,
  filterRarity: propTypes.string,
  onInputChange: propTypes.func.isRequired,
};

Filters.defaultProps = {
  filterName: '',
  filterRarity: 'todas',
};

export default Filters;
