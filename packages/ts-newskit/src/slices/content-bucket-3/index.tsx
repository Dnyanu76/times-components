import {
  Block,
  Divider,
  Hidden,
  useBreakpointKey,
  Visible,
  BreakpointKeys,
  GridLayout
} from 'newskit';
import React, { useState, useEffect } from 'react';
import { CommentCardProps } from '../../components/slices/comment-card';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ArticleProps, Article } from '../../components/slices/article';
import {
  LeadStoryDivider,
  StackItem,
  BlockItem,
  ArticleDivider
} from '../shared-styles';

import { CommentStack } from '../shared/comment-stack';
import { ArticleStack } from '../content-bucket-3/article-stack';
import { CustomStackLayout } from '../shared';
import { FullWidthHidden } from '../../components/slices/shared-styles';
import { ClickHandlerType } from '../types';

export interface ContentBucket3Props {
  leadArticleLeft: LeadArticleProps;
  leadArticleRight: LeadArticleProps;
  comments: CommentCardProps[];
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ContentBucket3 = ({
  leadArticleLeft,
  leadArticleRight,
  comments,
  articles,
  clickHandler
}: ContentBucket3Props) => {
  const [currentBreakpoint, setBreakpoint] = useState<BreakpointKeys>('xl');
  const breakpointKey = useBreakpointKey();
  useEffect(
    () => {
      setBreakpoint(breakpointKey);
    },
    [breakpointKey]
  );

  const isMobile = ['xs', 'sm'].includes(currentBreakpoint);
  const isMedium = currentBreakpoint === 'md';
  const isLarge = ['lg', 'xl'].includes(currentBreakpoint);

  return (
    <CustomStackLayout>
      <StackItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '760px',
          xl: '840px'
        }}
        marginInlineEnd={{
          lg: 'space060'
        }}
      >
        <Visible lg xl>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
        </Visible>
        <StackItem>
          <Block>
            <GridLayout
              columns={{
                xs: '1fr',
                md: '1fr 1px 1fr'
              }}
              columnGap={{ md: 'space040' }}
              rowGap="space040"
            >
              <Article
                article={{
                  ...leadArticleLeft,
                  hasTopBorder: false,
                  isLeadImage: true,
                  titleTypographyPreset: isLarge
                    ? 'editorialHeadline030'
                    : isMedium
                      ? 'editorialHeadline020'
                      : 'editorialHeadline040'
                }}
                clickHandler={clickHandler}
              />
              <Hidden xs sm>
                <ArticleDivider
                  overrides={{ stylePreset: 'lightDivider' }}
                  vertical
                />
              </Hidden>
              <Article
                article={{
                  ...leadArticleRight,
                  hasTopBorder: isMobile,
                  isLeadImage: true,
                  titleTypographyPreset: isLarge
                    ? 'editorialHeadline030'
                    : 'editorialHeadline020'
                }}
                clickHandler={clickHandler}
              />
            </GridLayout>
          </Block>
        </StackItem>
        <Block>
          <Hidden xs sm md>
            <CommentStack comments={comments} clickHandler={clickHandler} />
          </Hidden>
        </Block>
      </StackItem>
      <StackItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '185px',
          xl: '402px'
        }}
      >
        <FullWidthHidden lg xl>
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </FullWidthHidden>
        <BlockItem>
          <ArticleStack
            articles={articles}
            breakpoint={currentBreakpoint}
            clickHandler={clickHandler}
          />
        </BlockItem>
      </StackItem>
      <Visible md xs sm>
        <BlockItem
          $width={{
            xs: '100%',
            md: '720px',
            lg: '976px',
            xl: '1276px'
          }}
        >
          <CommentStack comments={comments} clickHandler={clickHandler} />
        </BlockItem>
      </Visible>
    </CustomStackLayout>
  );
};
