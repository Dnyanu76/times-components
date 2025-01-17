import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import data from '../../fixtures/lead-story.json';
import { ArticleStack } from '../article-stacks';

const { horizontalArticles, verticalArticles } = data;

const mockClickHandler = jest.fn();

const renderComponent = (width?: string) =>
  render(
    <ArticleStack
      {...{ horizontalArticles, verticalArticles }}
      horizontalArticleContentWidth={width}
      clickHandler={mockClickHandler}
    />
  );

describe('Render ArticleStack', () => {
  test('Slice matches snapshot with default width', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with passed width', () => {
    const { asFragment } = renderComponent('100px');
    expect(asFragment()).toMatchSnapshot();
  });
});
