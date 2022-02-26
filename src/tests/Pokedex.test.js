import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

// TODOS OS TESTES COMENTADOS ESTÃO SENDO TESTADOS POR OUTROS SENDO ASSIM ESTÃO COMENTADOS

const LENGTH_POKEMON_BUTTON = 7;

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

describe('Teste do requisito 5', () => {
  before();
  it('Teste se página contém um heading h2', () => {
    const tittle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(tittle).toBeInTheDocument();
  });
});

describe('5.1 "Teste se é exibido o próximo Pokémon da lista"', () => {
  before();
  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);
    const average = screen.getByTestId('pokemon-weight');
    expect(average).toBeInTheDocument();
  });
  it('Os próximos Pokémons da lista devem ser mostrados, um a um', () => {
    const button2 = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button2);
    const text = screen.getAllByTestId('pokemon-weight');
    expect(text).toHaveLength(1);
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const text = screen.getAllByTestId('pokemon-type');
    expect(text).toHaveLength(1);
  });
});

describe('5.2 "Teste se a Pokédex tem os botões de filtro"', () => {
  before();
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const text = screen.getAllByTestId('pokemon-type-button');
    expect(text).toHaveLength(LENGTH_POKEMON_BUTTON);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    const electric = screen.getByRole('button', { name: /electric/i });
    expect(electric).toBeInTheDocument();
    const fire = screen.getByRole('button', { name: /Fire/i });
    expect(fire).toBeInTheDocument();
    const poison = screen.getByRole('button', { name: /Poison/i });
    expect(poison).toBeInTheDocument();
    const bug = screen.getByRole('button', { name: /Bug/i });
    expect(bug).toBeInTheDocument();
    const psychic = screen.getByRole('button', { name: /Psychic/i });
    expect(psychic).toBeInTheDocument();
    const normal = screen.getByRole('button', { name: /Normal/i });
    expect(normal).toBeInTheDocument();
    const dragon = screen.getByRole('button', { name: /Dragon/i });
    expect(dragon).toBeInTheDocument();
  });

  it('A partir da seleção de um botão de tipo', () => {
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(buttonFire);
    const getFire = screen.getAllByText('Fire');
    expect(getFire).toHaveLength(2);
  });

  // it('O texto do botão deve corresponder ao nome do tipo', () => {});

  it('O botão All precisa estar sempre visível', () => {
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
  });
});
describe('5.3 "Teste se a Pokédex contém um botão para resetar o filtro"', () => {
  before();
  it('O texto do botão deve ser All', () => {
    const verifyButton = screen.getByRole('button', { name: /All/i });
    expect(verifyButton).toBeInTheDocument();
  });
  it('A Pokedéx deverá mostrar os Pokémons normalmente', () => {
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const verifyHome = screen.getByText('Pikachu');
    expect(verifyHome).toBeInTheDocument();
  });
  // it('Ao carregar a página, o filtro selecionado deverá ser All', () => {});
});
