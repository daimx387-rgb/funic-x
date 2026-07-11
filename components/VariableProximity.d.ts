import { RefObject } from 'react';

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  radius?: number;
  falloff?: string;
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
}

declare const VariableProximity: React.ForwardRefExoticComponent<
  VariableProximityProps & React.RefAttributes<unknown>
>;

export default VariableProximity;
