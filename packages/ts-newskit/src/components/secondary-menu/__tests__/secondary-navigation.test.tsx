import React from 'react';
import { customRender } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavigation } from '../index';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';

describe('Secondary Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = customRender(
      <SecondaryNavigation data={mainMenuItems} title="Home" isActive={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should close the dropdown ', () => {
    const { getByText, queryByText, getAllByText } = customRender(
      <SecondaryNavigation data={mainMenuItems} title="Home" isActive={false} />
    );
    const SeeAllButton = getByText('See all');
    fireEvent.click(SeeAllButton);
    waitFor(() => expect(queryByText('News')).toBeInTheDocument());
    waitFor(() => expect(queryByText('Close')).toBeInTheDocument());
    const newsButton = getAllByText('News')[0];
    fireEvent.click(newsButton);
    waitFor(() => expect(queryByText('News')).toBeInTheDocument());
  });
  it('should change the home title if another item seleceted', () => {
    const { getAllByText, container, queryByText } = customRender(
      <SecondaryNavigation data={mainMenuItems} title="Home" isActive={true} />
    );
    const pTag = container.querySelector('p');
    const pTagTextContent = pTag ? pTag.textContent : 'Home';
    expect(pTagTextContent).toBe('');

    const newsButton = getAllByText('News')[0];
    fireEvent.click(newsButton);
    waitFor(() => expect(test).toBe('News'));
    waitFor(() => expect(queryByText('News')).toBeInTheDocument());
    waitFor(() => expect(queryByText('Home')).not.toBeInTheDocument());
  });
});
