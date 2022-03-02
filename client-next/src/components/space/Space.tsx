import React, { createContext, CSSProperties } from 'react';
import { useTheme, styled } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import Item from './Item';

export const SpaceContext = createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
});

type SizeType = 'small' | 'middle' | 'large' | undefined;

type SpaceSize = SizeType | number;

export interface SpaceProps {
  size?: SpaceSize;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const getNumberSize = (size: SpaceSize): number => {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
};

interface SSpaceType {
  direction: NonNullable<CSSProperties['flexDirection']>;
  align: SpaceProps['align'];
  wrap: NonNullable<CSSProperties['flexWrap']>;
}

const SSpace = styled('div')<SSpaceType>(({ wrap, direction, align }) => ({
  display: 'flex',
  flexWrap: wrap,
  flexDirection: direction,
  alignItems: align || 'normal',
}));

const Space: React.FC<SpaceProps> = (props) => {
  const {
    size = 'small',
    direction: directionProp = 'horizontal',
    align,
    wrap = false,
    split,
    children,
    className,
    style,
    ...rest
  } = props;

  const [horizontalSize, verticalSize] = [size, size].map((item) =>
    getNumberSize(item)
  );

  const marginDirection =
    useTheme().direction === 'ltr' ? 'marginRight' : 'marginLeft';

  const childNodes = React.Children.map(children, (child) => child);

  if (!childNodes || childNodes.length === 0) return null;

  const direction: CSSProperties['flexDirection'] =
    directionProp === 'horizontal' ? 'row' : 'column';

  // Calculate latest node
  let latestIndex = 0;
  const nodes = childNodes.map((child, index) => {
    if (child !== null && child !== undefined) {
      latestIndex = index;
    }

    return (
      <Item
        key={index}
        index={index}
        direction={direction}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  return (
    <SSpace
      direction={direction}
      align={align}
      wrap={wrap ? 'wrap' : 'nowrap'}
      className={className}
      style={style}
      {...rest}
    >
      <SpaceContext.Provider
        value={{ latestIndex, horizontalSize, verticalSize }}
      >
        {nodes}
      </SpaceContext.Provider>
    </SSpace>
  );
};

export default Space;
