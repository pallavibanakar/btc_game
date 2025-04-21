import { screen } from '@testing-library/react'
import Guess from './Guess';
import { renderWithContext } from '../../testUtils'

describe('Guess Component', () => {
  it('disables buttons when canGuess is false', () => {
    const mockFetchGameData = jest.fn().mockResolvedValueOnce(undefined);

    renderWithContext(<Guess fetchGameData={mockFetchGameData} />, {
      data: { canGuess: false, price: 1000, score: 0, timer: 0 },
    });

    expect(screen.getByText('↑ Up')).toBeDisabled();
    expect(screen.getByText('↓ Down')).toBeDisabled();
  });

  it('enables buttons when canGuess is true', () => {
    const mockFetchGameData = jest.fn().mockResolvedValueOnce(undefined);

    renderWithContext(<Guess fetchGameData={mockFetchGameData} />, {
      data: { canGuess: true, price: 1000, score: 0, timer: 0 },
    });

    expect(screen.getByText('↑ Up')).toBeEnabled();
    expect(screen.getByText('↓ Down')).toBeEnabled();
  });

  it('shows waiting message when canGuess is false', () => {
    const mockFetchGameData = jest.fn().mockResolvedValueOnce(undefined);
    renderWithContext(<Guess fetchGameData={mockFetchGameData} />, {
      data: { canGuess: false, price: 1000, score: 0, timer: 0 },
    });

    expect(screen.getByText(/Time remaining/i)).toBeInTheDocument();
  })
});
