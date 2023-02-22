import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavDesktop } from '../desktop';
import { cleanup, fireEvent } from '@testing-library/react';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const handleSelect = jest.fn();
const isExpanded = false;
const setIsExpanded = jest.fn();

describe('Secondary Menu Desktop', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    (useBreakpointKey as any).mockReturnValue('md');

    const { asFragment } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    const title = getByText('Home');
    expect(title).toBeInTheDocument();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/home');
  });
  it('should call handleSelect when clicked', () => {
    const { getAllByTestId } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    const Anchor = getAllByTestId('buttonLink')[0];
    fireEvent.click(Anchor);
    expect(handleSelect).toHaveBeenCalled();
  });

  it('should call handleSelect when clicked', () => {
    (useBreakpointKey as any).mockReturnValue('md');

    const { getAllByRole } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    const list = getAllByRole('listitem');
    expect(list.length).toEqual(8);
  });
});
