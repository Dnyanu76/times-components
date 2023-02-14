import React from 'react';
import { customRender } from './utils/test-utils';
import '@testing-library/jest-dom';
import data from '../fixtures/menu-items.json';
import { SecondaryNavMobile } from '../mobile';
import { cleanup, fireEvent } from '@testing-library/react';

describe('Secondary Menu Mobile', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the dropdown', () => {
    const { asFragment } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not render the dropdown', () => {
    const { asFragment } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the textblock', () => {
    const { getByText } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={false} />
    );
    const title = getByText('Top Stories');
    expect(title).toBeInTheDocument();
  });
  it('should render the dropdown text close', () => {
    const { getByText } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={true} />
    );
    const label = getByText('Close');
    expect(label).toBeInTheDocument();
  });
  it('should render the dropdown text See all', () => {
    const { getByText } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={false} />
    );
    const label = getByText('See all');
    expect(label).toBeInTheDocument();
  });
  it('should render the dropdown text Football', () => {
    const { getByText } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={true} />
    );
    const label = getByText('Football');
    expect(label).toBeInTheDocument();
  });
  it('should not render the dropdown text Football', () => {
    const { queryByText } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={false} />
    );
    const label = queryByText('Football');
    expect(label).not.toBeInTheDocument();
  });
  it('should render the dropdown', () => {
    const { queryByText, getByText } = customRender(
      <SecondaryNavMobile data={data} title="Top Stories" isActive={false} />
    );
    const closeButton = getByText('See all');
    fireEvent.click(closeButton);
    const label = queryByText('Football');
    expect(label).toBeInTheDocument();
  });
});
