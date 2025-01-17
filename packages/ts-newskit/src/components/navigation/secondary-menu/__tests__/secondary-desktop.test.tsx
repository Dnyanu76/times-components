import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavDesktop } from '../desktop';
import { cleanup, fireEvent } from '@testing-library/react';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Home'
};

const mockClickHandler = jest.fn();

describe('Secondary Menu Desktop', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const title = getByText('Home');
    expect(title).toBeInTheDocument();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/home');
  });
  it('should call handleSelect when clicked', () => {
    const { getAllByTestId } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const Anchor = getAllByTestId('buttonLink')[0];
    fireEvent.click(Anchor);
    expect(options.handleSelect).toHaveBeenCalled();
  });
  it('should render navitems', () => {
    const { getAllByRole } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const list = getAllByRole('listitem');
    expect(list.length).toEqual(9);
  });
  it('should change the width of menudivader when screen size change', () => {
    const { getByTestId } = render(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const hr = getByTestId('divider');
    expect(hr).toHaveStyle('width: 100%');
  });
});
