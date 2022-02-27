import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const MORE_DETAILS = 'More details';
const PIKACHU_DETAILS = 'Pikachu Details';
const PIKACHU_LOCATION = 'Pikachu location';
const POKEMON_FAVORITE = 'Pokémon favoritado?';

function before() {
  return beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
}

describe('Teste se as informações detalhadas do Pokémon selecionado', () => {
  before();
  it('A página deve conter um texto <name> Details', () => {
    const details = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details);
    const pokemonDetails = screen
      .getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
    const details = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details);
    const buttons = screen.queryAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(0);
  });

  it('A seção de detalhes deve conter um heading h2', () => {
    const details = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details);
    const tittle = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(tittle).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const details = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const textAboutPokemon = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);
    expect(textAboutPokemon).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas', () => {
  before();
  it('Na seção de detalhes deverá existir um heading h2', () => {
    const details = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const tittle = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(tittle).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas', () => {
    const details = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const images = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(images).toHaveLength(2);
  });

  it('Devem ser exibidos, o nome da localização ', () => {
    const details2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details2);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const images2 = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(images2).toHaveLength(2);
    const location1 = screen.getByText('Kanto Power Plant');
    expect(location1).toBeInTheDocument();
    const location2 = screen.getByText('Kanto Viridian Forest');
    expect(location2).toBeInTheDocument();
  });

  it('A imagem da localização deve ter um atributo', () => {
    const details2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details2);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const images2 = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(images2).toHaveLength(2);
    const locations = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
describe('Teste se o usuário pode favoritar um pokémon', () => {
  before();
  it('A imagem da localização deve ter um atributo alt', () => {
    const details2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details2);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const images2 = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(images2).toHaveLength(2);
    const locations = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(locations[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locations[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('A página deve exibir um checkbox', () => {
    const details2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details2);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const checkbox = screen.getByLabelText(POKEMON_FAVORITE);
    expect(checkbox).toBeInTheDocument();
  });

  it('Cliques alternados no checkbox', () => {
    const details2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details2);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const checkbox2 = screen.getByLabelText(POKEMON_FAVORITE);
    expect(checkbox2).toBeInTheDocument();
    userEvent.click(checkbox2);
    const favorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favorite).toBeInTheDocument();
    userEvent.click(checkbox2);
    expect(favorite).not.toBeInTheDocument();
  });

  it('O label do checkbox', () => {
    const details2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(details2);
    const pokemon = screen.getByRole('heading', { level: 2, name: PIKACHU_DETAILS });
    expect(pokemon).toBeInTheDocument();
    const checkbox3 = screen.getByLabelText(POKEMON_FAVORITE);
    expect(checkbox3).toBeInTheDocument();
  });
});
