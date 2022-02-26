import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

// TODOS OS TESTES COMENTADOS ESTÃO SENDO TESTADOS POR OUTROS SENDO ASSIM ESTÃO COMENTADOS

function before() {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
}

describe('Teste se é renderizado um card', () => {
  before();
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const electric = screen.getByTestId('pokemon-type');
    expect(electric).toHaveTextContent('Electric');
  });

  it('O peso médio do pokémon deve ser exibido', () => {
    const average = screen.getByTestId('pokemon-weight');
    expect(average).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida', () => {
    const image = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('', () => {
  before();
  it('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon', () => {
    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda ', () => {
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);
    const pokemon = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(pokemon).toBeInTheDocument();
  });
});
describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  before();
  it('O ícone deve ser uma imagem com o atributo ', () => {
    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);
    const image = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
  it('A imagem deve ter o atributo ', () => {});
});
