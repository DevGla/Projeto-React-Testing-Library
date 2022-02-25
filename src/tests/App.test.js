import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando Requisito 1', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });

  it('O primeiro link deve possuir o texto Home', () => {
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    const link2 = screen.getByRole('link', { name: 'About' });
    expect(link2).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto Favorite Pokémons', () => {
    const link3 = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(link3).toBeInTheDocument();
  });

  it('teste se a página é redirecionada para About - Click_About', () => {
    const link21 = screen.getByRole('link', { name: 'About' });
    userEvent.click(link21);
    const tittle21 = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(tittle21).toBeInTheDocument();
  });

  it('teste se a página é redirecionada para pokeF - Click_Pokémons Favoritados', () => {
    const link31 = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link31);
    const tittle31 = screen
      .getByRole('heading', { level: 2, name: /Favorite pokémons/i });
    expect(tittle31).toBeInTheDocument();
  });

  it('teste se a página é redirecionada para a página inicial - Click_Home', () => {
    const link = screen
      .getByRole('link', { name: 'Home' });
    userEvent.click(link);
    const tittle = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(tittle).toBeInTheDocument();
  });
});
