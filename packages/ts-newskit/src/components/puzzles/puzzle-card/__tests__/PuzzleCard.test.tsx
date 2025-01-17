import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { puzzles } from '../fixtures/data.json';
import { PuzzleCard } from '../index';
import { NewsKitPuzzlePlaceholder } from '../assets';

const renderComponent = () => render(<PuzzleCard data={puzzles.list[0]} />);

describe('Puzzle Card', () => {
  it('should render Puzzle Card', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the puzzle card title', () => {
    const { getByText } = renderComponent();
    expect(getByText(puzzles.list[0].title)).toBeInTheDocument();
  });

  it('renders the puzzle card image placeholder', () => {
    const { getByTestId, queryByTestId } = renderComponent();
    const image = queryByTestId('puzzle-image');
    if (image) {
      expect(queryByTestId('puzzle-placeholder')).not.toBeInTheDocument();
    } else {
      const placeholder = getByTestId('puzzle-placeholder');
      expect(placeholder).toBeInTheDocument();
    }
  });

  it('renders NewsKitPuzzlePlaceholder component', () => {
    const { container } = render(<NewsKitPuzzlePlaceholder />);

    expect(container).toBeInTheDocument();

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('crops the image', () => {
    const { container, queryByAltText } = render(
      <PuzzleCard data={puzzles.list[0]} isImageCropped />
    );
    const imageUrl = puzzles.list[0].image.crops[0].url;
    const croppedImageUrl = imageUrl + '&resize=500';
    const image = queryByAltText('Polygon');

    expect(container).toBeInTheDocument();

    expect(image).toHaveAttribute('src', croppedImageUrl);
  });

  it('renders the puzzle card with alt attribute set to data.title', () => {
    const { getByAltText } = render(
      <PuzzleCard
        data={{ ...puzzles.list[0], title: 'Custom Puzzle Title' }}
        isImageCropped={false}
      />
    );
    const image = getByAltText('Custom Puzzle Title');
    expect(image).toBeInTheDocument();
  });

  it('renders the puzzle card with alt attribute set to "Puzzle thumbnail"', () => {
    const { getByAltText } = render(
      <PuzzleCard
        data={{ ...puzzles.list[0], title: '' }}
        isImageCropped={false}
      />
    );
    const image = getByAltText('Puzzle thumbnail');
    expect(image).toBeInTheDocument();
  });
});
