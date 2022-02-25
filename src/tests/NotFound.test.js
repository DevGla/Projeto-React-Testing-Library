import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando Requisito 4', () => {
  it('Teste se página contém um heading h2 ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/ReactTestingLibrary');
    const tittle = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i,
    });
    expect(tittle).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/ReactTestingLibrary');
    const image = screen
      .getByRole(
        'img', { name: 'Pikachu crying because the page requested was not found' },
      );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
