import type { ReactNode, FunctionComponent, ReactElement } from 'react';

export interface ScrollStackItemProps {
  children?: ReactNode;
  itemClassName?: string;
}

export interface ScrollStackProps {
  children?: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export declare const ScrollStackItem: FunctionComponent<ScrollStackItemProps>;

declare const ScrollStack: FunctionComponent<ScrollStackProps>;

export default ScrollStack;
