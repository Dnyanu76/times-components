import React from 'react';
import { storiesOf } from '@storybook/react';

import { OlympicsMedalTable } from './OlympicsMedalTable';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';
import { text, select, boolean } from '@storybook/addon-knobs';

storiesOf('Typescript Component/Olympics', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))

  .add('Medal Table', () => {
    const endpoint = select(
      'Endpoint',
      {
        staging: 'https://olympics-embed-staging.pamedia.io',
        prod: 'https://olympics-embed.pamedia.io'
      },
      'https://olympics-embed-staging.pamedia.io'
    );
    const authToken = text('Auth Token', '6i3DuEwbVhr2Fht6');
    const gamesCode = text('Games Code', 'OG2020-TR2');
    const highlighted = text('Highlighted Country', 'GBR');
    const inArticle = boolean('Is In Article', true);

    return (
      <OlympicsMedalTable
        keys={{ endpoint, authToken, gamesCode }}
        highlighted={highlighted}
        inArticle={inArticle}
      />
    );
  });