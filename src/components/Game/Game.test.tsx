import { render, screen, waitFor } from '@testing-library/react';
import Game from './Game';
import { useGame } from '../../GameContext';
import { useAuth } from '../../AuthContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../GameContext');
jest.mock('../../AuthContext');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockLogout = jest.fn();
const mockSetData = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    token: 'mockToken',
    userId: 1,
    logout: mockLogout,
  });

  (useGame as jest.Mock).mockReturnValue({
    data: { score: 0, canGuess: true, price: 100 },
    setData: mockSetData,
  });

  (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  );
}

describe('Game Component', () => {
  test('renders Game component and fetches data', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ score: 10, can_guess: true, price: 200 }),
    });

    renderComponent();

    expect(screen.getByText(/start playing/i)).toBeInTheDocument();
    expect(screen.getByText(/loading game data/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  test('redirects to login on 401', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 401,
      ok: false,
    });

    renderComponent();

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles fetch failure gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API down'));

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText(/loading game data/i)).not.toBeInTheDocument();
    });

    expect(mockSetData).not.toHaveBeenCalled();
  });
});
