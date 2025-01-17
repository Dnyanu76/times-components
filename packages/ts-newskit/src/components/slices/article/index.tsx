import React from 'react';
import {
  Divider,
  CardContent,
  TextBlock,
  CardComposable,
  CardMedia,
  GridLayoutItem
} from 'newskit';
import {
  CardHeadlineLink,
  FullWidthCardMediaMob,
  FullWidthBlock
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { ClickHandlerType, MouseEventType } from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import {
  ArticleTileInfo,
  expirableFlagsProps
} from '../shared/articleTileInfo';
import { getActiveArticleFlags } from '../../../utils/getActiveArticleFlag';

type ImageCrops = {
  url?: string;
  ratio?: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  crops?: ImageCrops[];
};

export interface ArticleProps {
  id: string;
  headline: string;
  url: string;
  images?: ImageProps;
  tag?: {
    label: string;
    href: string;
  };
  contentType?: string;
  label?: string;
  expirableFlags?: expirableFlagsProps[];
  flag?: string;
  hasTopBorder?: boolean;
  hideImage?: boolean;
  isLeadImage?: boolean;
  imageRight?: boolean;
  isFullWidth?: boolean;
  titleTypographyPreset?: string;
  tagAndFlagMarginBlockStart?: string;
}

export const Article = ({
  article,
  clickHandler
}: {
  article: ArticleProps;
  clickHandler: ClickHandlerType;
}) => {
  const {
    id,
    images,
    headline,
    url,
    tag,
    flag,
    hasTopBorder,
    hideImage,
    isLeadImage,
    imageRight,
    isFullWidth,
    titleTypographyPreset = 'editorialHeadline020',
    tagAndFlagMarginBlockStart = 'space040',
    expirableFlags,
    label,
    contentType
  } = article;
  const imageWithCorrectRatio =
    images && images.crops && images.crops.find(crop => crop.ratio === '3:2');
  const hasArticleTileInfo =
    (expirableFlags &&
      getActiveArticleFlags(expirableFlags) &&
      expirableFlags.length > 0) ||
    label ||
    contentType;

  const cardImage = {
    media: {
      src: imageWithCorrectRatio!.url,
      alt: (images && images.alt) || headline,
      loadingAspectRatio: imageWithCorrectRatio!.ratio || '3:2'
    }
  };

  const marginBlockStart = imageRight || hideImage ? 'space000' : 'space040';
  const hasImage =
    images &&
    images.crops &&
    images.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const showImage = hasImage && !hideImage;

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };

  return (
    <CardComposable
      alignContent="start"
      areas={
        imageRight
          ? `
          border  border
          content media`
          : `border
         media
         content
        `
      }
      columns={{ xl: imageRight ? '1fr 1fr' : '1fr' }}
      columnGap="space040"
    >
      {hasTopBorder && (
        <GridLayoutItem area="border">
          {isFullWidth ? (
            <FullWidthBlock>
              <Divider
                overrides={{
                  marginBlockEnd: 'space040',
                  stylePreset: 'dashedDivider'
                }}
              />
            </FullWidthBlock>
          ) : (
            <Divider
              overrides={{
                marginBlockEnd: 'space040',
                stylePreset: 'dashedDivider'
              }}
            />
          )}
        </GridLayoutItem>
      )}
      {showImage ? (
        isLeadImage ? (
          <FullWidthCardMediaMob {...cardImage} />
        ) : (
          <CardMedia media={{ ...cardImage.media, loading: 'lazy' }} />
        )
      ) : null}
      <CardContent alignContent="start">
        {images &&
          !imageRight &&
          images.caption &&
          !hideImage && (
            <TextBlock
              marginBlockStart="space020"
              stylePreset="inkSubtle"
              typographyPreset="editorialCaption010"
            >
              {images.caption}
            </TextBlock>
          )}

        <ArticleTileInfo
          contentType={contentType}
          expirableFlags={expirableFlags}
          label={label}
          marginBlockStart={marginBlockStart}
        />
        <CardHeadlineLink
          href={url}
          role="link"
          overrides={{
            typographyPreset: titleTypographyPreset,
            marginBlockStart: hasArticleTileInfo ? 'space030' : marginBlockStart
          }}
          external={false}
          onClick={onClick}
        >
          {headline}
        </CardHeadlineLink>
        <TagAndFlag
          tag={tag}
          flag={flag}
          marginBlockStart={tagAndFlagMarginBlockStart}
        />
      </CardContent>
    </CardComposable>
  );
};
