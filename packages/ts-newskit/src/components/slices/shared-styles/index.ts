import {
  styled,
  Block,
  getSizingCssFromTheme,
  getColorCssFromTheme,
  CardLink,
  CardMedia,
  getSpacingCssFromTheme,
  getMediaQueryFromTheme,
  LinkInline,
  Hidden,
  TextBlock
} from 'newskit';
import TheTimesLight from '@newskit-themes/the-times/TheTimes-light.json';

const getRatio = (ratioString: string) => {
  const [ratioWidth, ratioHeight] = ratioString.split(':');

  return Number(ratioWidth) / Number(ratioHeight);
};

export const CardHeadlineLink = styled(CardLink)<{
  $color?: string;
  $hoverColor?: string;
}>`
  ${({ $color }) => getColorCssFromTheme('color', $color || 'inkContrast')};
  cursor: pointer;
  text-decoration: none;

  &&:hover,
  &&:active {
    text-decoration: none;
    ${({ $hoverColor }) =>
      getColorCssFromTheme('color', $hoverColor || 'interactiveLink020')};
  }

  &&:active {
    ${getColorCssFromTheme('color', 'interactiveLink030')};
  }
`;

export const TextLink = styled(LinkInline)`
  text-decoration: none;
  &&:hover,
  &&:active {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;

const setFullWidthMargin = (space: string) => ({ marginInline: `-${space}` });
export const FullWidthCardMediaMob = styled(CardMedia)<{
  ratio?: string;
  className?: string;
}>`
  height: ${({ className }) => (className ? 0 : '100%')};
  overflow: hidden;
  position: relative;
  padding-bottom: ${({ ratio }) => (ratio ? `${100 / getRatio(ratio)}%;` : 0)};
  img: {
    opacity: 1,
    zIndex: 2,
    position: absolute,
    display: block
  }
  ${getMediaQueryFromTheme('xs', 'md')} {
    ${getSpacingCssFromTheme(setFullWidthMargin, 'space045')};
  }
`;

export const FullWidthHidden = styled(Hidden)`
  width: 100%;
`;
export const FullWidthBlock = styled(Block)`
  width: 100%;
  ${getMediaQueryFromTheme('xs', 'md')} {
    width: 100vw;
    ${getSpacingCssFromTheme(setFullWidthMargin, 'space045')};
  }
`;
const setInlinePaddingStart = (space: string) => ({
  paddingInlineStart: `${space}`
});
export const StyledSpan = styled.span<{ hasCaption: boolean }>`
  ${({ hasCaption }) =>
    hasCaption
      ? getSpacingCssFromTheme(setInlinePaddingStart, 'space010')
      : getSpacingCssFromTheme(setInlinePaddingStart, 'space000')};
  font-size: 1rem;
`;

export const StyledTextBlock = styled(TextBlock)`
  background-color: ${TheTimesLight.colors.interactiveNegative030};
  color: ${TheTimesLight.colors.interactiveInverse030};
  border-radius: 2px;
`;

export const StyledBlock = styled(Block)<{ hasVideoIcon?: boolean }>`
  display: ${({ hasVideoIcon }) => (hasVideoIcon ? 'flex' : 'inline-block')};
  align-items: ${({ hasVideoIcon }) =>
    hasVideoIcon ? 'last baseline' : 'initial'};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${getSpacingCssFromTheme('gap', 'space010')};
`;
