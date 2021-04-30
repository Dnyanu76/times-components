declare module '@times-components/storybook' {
  export const showcaseConverter: (module: any, showcase: any) => any;
}

declare module '@times-components/tealium-utils' {
  export const storybookreporter: any;
}

declare module '@times-components/tracking' {
  import { FC } from 'react';
  type AnalyticsStreamType = (event: any) => void;

  export interface AnalyticsProps {
    analyticsStream: AnalyticsStreamType;
  }

  export function withTrackingContext<T>(component: FC<T>, attr: any): FC<T>;
  export function withTrackEvents<T>(component: FC<T>, attr: any): FC<T>;
}

declare module '@times-components/icons' {
  import { FC } from 'react';
  export const IconForwardArrow: FC<{
    fillColour: string;
    height: number;
    width: number;
  }>;
}

declare module '@times-components/test-utils' {
  export const delay: (ms: number) => Promise<never>;
}

declare module '@times-components/styleguide' {
  type ColourMap = Record<string, string>;
  type Colours = Record<string, ColourMap>;

  interface Breakpoints {
    medium: string;
    wide: string;
  }

  interface Fonts {
    body: string;
    headline: string;
    supporting: string;
  }

  export const fonts: Fonts;
  export const spacing: (multiple: number) => number;
  export const breakpoints: Breakpoints;
  export const colours: Colours;
}
