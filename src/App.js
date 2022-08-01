import React from 'react';
import './styles/App.css';
import Form from './components/Form';
import Card from './components/Card';
import Filters from './components/Filters';

class App extends React.Component {
  state = {
    name: '',
    description: '',
    attr1: '0',
    attr2: '0',
    attr3: '0',
    image: '',
    rarity: 'normal',
    trunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
    filteredCards: [],
    filtersDisabled: false,
    filterName: '',
    filterRarity: 'todas',
    isPlaying: false,
    gameCards: [],
    initialCard: 0,
    totalCards: 0,
    haveMaxCards: false,
    isFinalCard: false,
  };

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [target.name]: value,
      },
      () => {
        this.validateForm();
        this.filters();
      },
    );
  };

  validateForm = () => {
    const { name, description, attr1, attr2, attr3, image, rarity } = this.state;
    const maxAttrSumValue = 210;
    const maxAttrValue = 90;
    const isValid = [
      name.length > 0,
      description.length > 0,
      image.length > 0,
      rarity.length > 0,
      parseInt(attr1, 10) <= maxAttrValue,
      parseInt(attr2, 10) <= maxAttrValue,
      parseInt(attr3, 10) <= maxAttrValue,
      parseInt(attr1, 10) + parseInt(attr2, 10) + parseInt(attr3, 10)
        <= maxAttrSumValue,
      parseInt(attr1, 10) >= 0,
      parseInt(attr2, 10) >= 0,
      parseInt(attr3, 10) >= 0,
    ].every(Boolean);
    this.setState({
      isSaveButtonDisabled: !isValid,
    });
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const { name, description, attr1, attr2, attr3, image, rarity, trunfo } = this.state;
    const { savedCards, filteredCards } = this.state;
    const card = {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rarity,
      trunfo,
    };
    this.setState(
      {
        savedCards: [...savedCards, card],
        filteredCards: [...filteredCards, card],
      },
      () => {
        this.setState({
          name: '',
          description: '',
          attr1: '0',
          attr2: '0',
          attr3: '0',
          image: '',
          rarity: 'normal',
          trunfo: false,
          isSaveButtonDisabled: true,
        });
        this.hasTrunfo();
        this.haveMaxCards();
      },
    );
  };

  hasTrunfo = () => {
    const { savedCards } = this.state;
    const hasTrunfo = savedCards.some((card) => card.trunfo);
    this.setState({ hasTrunfo });
  };

  deleteCard = (key) => {
    const { savedCards, filteredCards } = this.state;
    this.setState(
      {
        savedCards: savedCards.filter((card, i) => i !== key),
        filteredCards: filteredCards.filter((card, i) => i !== key),
      },
      () => {
        this.hasTrunfo();
        this.haveMaxCards();
      },
    );
  };

  filters = () => {
    const { savedCards } = this.state;
    const { filterName, filterRarity } = this.state;
    const filteredCards = savedCards.filter((card) => {
      if (filterRarity === 'todas') {
        return card.name.includes(filterName);
      }
      return card.name.includes(filterName) && card.rarity === filterRarity;
    });
    this.setState({ filteredCards });
  };

  filterTrunfo = ({ target }) => {
    const { savedCards } = this.state;
    const filterTrunfo = savedCards.filter((card) => card.trunfo);
    const value = target.checked ? filterTrunfo : savedCards;
    this.setState({
      filteredCards: value,
      filtersDisabled: target.checked,
      filterName: '',
      filterRarity: 'todas',
    });
  };

  startGame = () => {
    const { savedCards } = this.state;
    const cards = [...savedCards];
    const randomFactor = 0.5;
    const randomCards = cards.sort(() => Math.random() - randomFactor);
    this.setState({
      gameCards: randomCards,
      isPlaying: true,
      initialCard: 0,
      totalCards: randomCards.length - 1,
    });
  };

  nextCard = () => {
    this.setState(
      (prevState) => ({
        initialCard: prevState.initialCard + 1,
        totalCards: prevState.totalCards - 1,
      }),
      () => {
        this.isFinalCard();
      },
    );
  };

  shuffleCards = () => {
    const { gameCards } = this.state;
    const randomFactor = 0.5;
    const randomCards = gameCards.sort(() => Math.random() - randomFactor);
    this.setState({
      gameCards: randomCards,
      initialCard: 0,
      isFinalCard: false,
      totalCards: randomCards.length - 1,
    });
  };

  haveMaxCards = () => {
    const { savedCards } = this.state;
    const maxCards = 32;
    const haveMaxCards = savedCards.length === maxCards;
    this.setState({ haveMaxCards });
  };

  restartGame = () => {
    this.setState({
      gameCards: [],
      isPlaying: false,
      initialCard: 0,
      isFinalCard: false,
      totalCards: 0,
    });
  };

  isFinalCard = () => {
    const { initialCard, gameCards } = this.state;
    const isFinalCard = initialCard === gameCards.length - 1;
    this.setState({ isFinalCard });
  };

  render() {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rarity,
      trunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      filteredCards,
      filtersDisabled,
      filterName,
      filterRarity,
      isPlaying,
      gameCards,
      initialCard,
      haveMaxCards,
      isFinalCard,
      totalCards,
    } = this.state;

    return (
      <div>
        {isPlaying ? (
          <div className="game-container">
            <Card
              cardName={ gameCards[initialCard].name }
              cardDescription={ gameCards[initialCard].description }
              cardAttr1={ gameCards[initialCard].attr1 }
              cardAttr2={ gameCards[initialCard].attr2 }
              cardAttr3={ gameCards[initialCard].attr3 }
              cardImage={ gameCards[initialCard].image }
              cardRare={ gameCards[initialCard].rarity }
              cardTrunfo={ gameCards[initialCard].trunfo }
            />
            {!isFinalCard ? (
              <div className="control-buttons-game">
                <div className="game-buttons">
                  <button
                    className="next-card"
                    type="button"
                    onClick={ this.nextCard }
                  >
                    Proxima carta
                  </button>
                  <button
                    className="cancel-game"
                    type="button"
                    onClick={ this.restartGame }
                  >
                    Cancelar jogo
                  </button>
                </div>
                <p>{`Cartas restantes: ${totalCards}`}</p>
              </div>
            ) : (
              <div className="control-buttons-game">
                <button
                  className="new-game"
                  type="button"
                  onClick={ this.shuffleCards }
                >
                  Novo Jogo
                </button>
                <button
                  className="back-to-start"
                  type="button"
                  onClick={ this.restartGame }
                >
                  Voltar ao inicio
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {haveMaxCards ? (
              <div className="card-limit-container">
                <h2>Chegou ao limite de cartas</h2>
              </div>
            ) : (
              <div className="c-form">
                <div className="c-form__form">
                  <h1 className="form-title">Adicionar nova carta</h1>
                  <Form
                    cardName={ name }
                    cardDescription={ description }
                    cardAttr1={ attr1 }
                    cardAttr2={ attr2 }
                    cardAttr3={ attr3 }
                    cardImage={ image }
                    cardRare={ rarity }
                    cardTrunfo={ trunfo }
                    hasTrunfo={ hasTrunfo }
                    isSaveButtonDisabled={ isSaveButtonDisabled }
                    onInputChange={ this.onInputChange }
                    onSaveButtonClick={ this.onSaveButtonClick }
                  />
                </div>

                <div className="c-form__card-preview">
                  <h1 className="preview-title">Pré-visualização</h1>
                  <Card
                    cardName={ name }
                    cardDescription={ description }
                    cardAttr1={ attr1 }
                    cardAttr2={ attr2 }
                    cardAttr3={ attr3 }
                    cardImage={ image }
                    cardRare={ rarity }
                    cardTrunfo={ trunfo }
                  />
                </div>
              </div>
            )}

            <div>
              <div className="saved-cards-header">
                <h2 style={ { textAlign: 'center', fontSize: '2rem' } }>
                  Saved cards
                </h2>
                <button
                  type="button"
                  onClick={ this.startGame }
                  disabled={ !haveMaxCards }
                  className="start-game-button"
                >
                  Jogar
                </button>
                <Filters
                  filter={ this.filters }
                  onFilterTrunfo={ this.filterTrunfo }
                  disabled={ filtersDisabled }
                  filterName={ filterName }
                  filterRarity={ filterRarity }
                  onInputChange={ this.onInputChange }
                />
              </div>

              <div className="saved-cards-container">
                {filteredCards.map((card, index) => (
                  <div key={ index } className="saved-card">
                    <Card
                      cardName={ card.name }
                      cardDescription={ card.description }
                      cardAttr1={ card.attr1 }
                      cardAttr2={ card.attr2 }
                      cardAttr3={ card.attr3 }
                      cardImage={ card.image }
                      cardRare={ card.rarity }
                      cardTrunfo={ card.trunfo }
                    />
                    <button
                      type="button"
                      data-testid="delete-button"
                      onClick={ () => {
                        this.deleteCard(index);
                      } }
                      className="delete-saved-card-button"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
