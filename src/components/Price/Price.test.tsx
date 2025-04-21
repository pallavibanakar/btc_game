import { act, screen, waitFor } from '@testing-library/react';
import { renderWithContext } from '../../testUtils';
import Price from './Price';

describe('Price Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders with initial price', async () => {
    renderWithContext(<Price />, {
      data: { score: 0, canGuess: true, price: 1000, timer: 0 },
    });

    expect(await screen.findByText(/\$1000/)).toBeInTheDocument();
  });

  it('call fetch price', async () => {
    const mockSetData = jest.fn();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ price: 2000 }),
    });

    renderWithContext(<Price />, {
      data: { score: 0, canGuess: true, price: 1000, timer: 0 },
      setData: mockSetData,
    });

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(mockSetData).toHaveBeenCalled();
    });
  });
});
