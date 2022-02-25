import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);
    const text = screen.getByText(/This application simulates a Pokédex/i);
    expect(text).toBeInTheDocument();
    const text2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(text2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const link2 = screen.getByRole('link', { name: /about/i });
    userEvent.click(link2);
    const text1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(text1).toBeInTheDocument();
    const text21 = screen.getByText(/One can filter Pokémons by type/i);
    expect(text21).toBeInTheDocument();
  });
  it('Testando se a página contém um heading h2, com o texto About Pokédex', () => {
    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    // const image = getByRole('img');
  });
});
