import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Testando Requisito 2', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });

  it('Teste se a página contém as informações sobre a Pokédex.', () => {});

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // const InfoPokedex = screen.getAllByRole('p');
    // expect(InfoPokedex).toHaveLength(2);
  });
  it('Testando se a página contém um heading h2, com o texto About Pokédex', () => {
    // const heading = screen.getByRole('heading', { level: 2 });
    // expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    // const image = getByRole('img');
  });
});
