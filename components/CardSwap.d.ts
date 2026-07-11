import { ComponentType, ReactNode, MouseEvent } from 'react';

export interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: string;
  children?: ReactNode;
}

export interface CardProps {
  customClass?: string;
  className?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const Card: ComponentType<CardProps>;
declare const CardSwap: ComponentType<CardSwapProps>;
export default CardSwap;
