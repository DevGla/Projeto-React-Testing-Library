import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const MORE_DETAILS = 'More details';

describe('Testando Requisito 2', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });

  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    // favoritar primeiro pokemon
    const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(moreDetails);
    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemon);

    // voltar pra home
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    // clicar para mostrar o próximo pokemon
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(button);

    // favoritar segundo pokemon
    const moreDetails2 = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(moreDetails2);
    const favoritePokemon2 = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemon2);

    // voltar pra home
    const home2 = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home2);

    // verificar se tem o texto
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    const text = screen.getAllByText(MORE_DETAILS);
    expect(text).toHaveLength(2);
  });
});
