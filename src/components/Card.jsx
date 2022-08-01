import React, { Component } from 'react';
import propTypes from 'prop-types';

class Card extends Component {
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
    } = this.props;

    return (
      <div className="card-container">
        <div className="card">
          <div className="card-rare-content">
            <p data-testid="rare-card" className={ cardRare }>
              {cardRare}
            </p>
          </div>
          <h2 data-testid="name-card" className="card-title">
            {cardName}
          </h2>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          {cardTrunfo && (
            <div className="trunfo">
              <p data-testid="trunfo-card">Super Trunfo</p>
            </div>
          )}
          <p data-testid="description-card" className="card-description">
            {cardDescription}
          </p>
          <div className="attr-container">
            <div className="attr-item-container">
              <span className="attr-text">Attr01</span>
              <span data-testid="attr1-card" className="attr-value">
                {cardAttr1}
              </span>
            </div>
            <div className="attr-item-container">
              <span className="attr-text">Attr02</span>
              <span data-testid="attr2-card" className="attr-value">
                {cardAttr2}
              </span>
            </div>
            <div className="attr-item-container">
              <span className="attr-text">Attr03</span>
              <span data-testid="attr3-card" className="attr-value">
                {cardAttr3}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: propTypes.string.isRequired,
  cardDescription: propTypes.string.isRequired,
  cardAttr1: propTypes.string.isRequired,
  cardAttr2: propTypes.string.isRequired,
  cardAttr3: propTypes.string.isRequired,
  cardImage: propTypes.string.isRequired,
  cardRare: propTypes.string.isRequired,
  cardTrunfo: propTypes.bool.isRequired,
};

export default Card;
