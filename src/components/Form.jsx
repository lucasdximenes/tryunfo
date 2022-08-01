import React, { Component } from 'react';
import propTypes from 'prop-types';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <div className="form-container">
        <form className="form">
          <label htmlFor="name-input">
            Nome
            {cardName.length > 0 ? (
              <i className="material-icons" style={ { color: 'green' } }>
                check
              </i>
            ) : (
              <i className="material-icons" style={ { color: 'red' } }>
                close
              </i>
            )}
          </label>

          <input
            type="text"
            name="name"
            id="name-input"
            className="name-input"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
            maxLength="15"
          />

          <label htmlFor="description-input">
            Descrição
            {cardDescription.length > 0 ? (
              <i className="material-icons" style={ { color: 'green' } }>
                check
              </i>
            ) : (
              <i className="material-icons" style={ { color: 'red' } }>
                close
              </i>
            )}
          </label>
          <textarea
            name="description"
            id="description-input"
            className="description-input"
            cols="30"
            rows="10"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
            maxLength="100"
          />

          <label htmlFor="attr1-input">
            Atributo 1
            <input
              type="number"
              name="attr1"
              id="attr1-input"
              className="attr-input"
              data-testid="attr1-input"
              value={ cardAttr1 }
              onChange={ onInputChange }
              max="90"
            />
          </label>

          <label htmlFor="attr2-input">
            Atributo 2
            <input
              type="number"
              name="attr2"
              id="attr2-input"
              className="attr-input"
              data-testid="attr2-input"
              value={ cardAttr2 }
              onChange={ onInputChange }
              max="90"
            />
          </label>

          <label htmlFor="attr3-input">
            Atributo 3
            <input
              type="number"
              name="attr3"
              id="attr3-input"
              className="attr-input"
              data-testid="attr3-input"
              value={ cardAttr3 }
              onChange={ onInputChange }
              max="90"
            />
          </label>

          <label htmlFor="image-input">
            Imagem
            {cardImage.length > 0 ? (
              <i className="material-icons" style={ { color: 'green' } }>
                check
              </i>
            ) : (
              <i className="material-icons" style={ { color: 'red' } }>
                close
              </i>
            )}
            <input
              type="text"
              name="image"
              id="image-input"
              className="image-input"
              data-testid="image-input"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="rare-input">Raridade</label>
          <select
            name="rarity"
            id="rare-input"
            className="rare-input"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>

          {hasTrunfo ? (
            <p>Você já tem um Super Trunfo em seu baralho</p>
          ) : (
            <label htmlFor="trunfo-input">
              <input
                type="checkbox"
                name="trunfo"
                id="trunfo-input"
                className="trunfo-input"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
              Super Trunfo
            </label>
          )}

          <button
            type="submit"
            className="save-button"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: propTypes.string.isRequired,
  cardDescription: propTypes.string.isRequired,
  cardAttr1: propTypes.string.isRequired,
  cardAttr2: propTypes.string.isRequired,
  cardAttr3: propTypes.string.isRequired,
  cardImage: propTypes.string.isRequired,
  cardRare: propTypes.string.isRequired,
  cardTrunfo: propTypes.bool.isRequired,
  hasTrunfo: propTypes.bool.isRequired,
  isSaveButtonDisabled: propTypes.bool.isRequired,
  onInputChange: propTypes.func.isRequired,
  onSaveButtonClick: propTypes.func.isRequired,
};

export default Form;
