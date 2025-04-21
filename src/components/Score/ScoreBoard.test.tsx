import { screen } from '@testing-library/react';
import { renderWithContext } from '../../testUtils';
import ScoreBoard from './ScoreBoard';

describe('ScoreBoard Component', () => {
  it('renders the user score correctly', () => {
    renderWithContext(<ScoreBoard />, {
      data: { score: 42, canGuess: true, price: 1000, timer: 0 }
    });

    expect(screen.getByText(/Your Score/i)).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
