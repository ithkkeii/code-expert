import React, { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { SpaceContext } from './Space';

interface ItemProps {
  index: number;
  direction: string;
  marginDirection: string;
  split?: React.ReactNode;
  wrap: boolean;
}

const Item: React.FC<ItemProps> = (props) => {
  const { direction, marginDirection, index, split, wrap, children } = props;

  const { latestIndex, verticalSize, horizontalSize } =
    useContext(SpaceContext);

  let style: React.CSSProperties = {};

  if (direction === 'vertical') {
    if (index < latestIndex)
      style = { marginBottom: horizontalSize / (split ? 2 : 1) };
  } else if (index < latestIndex) {
    style = {
      ...{ [marginDirection]: horizontalSize / (split ? 2 : 1) },
      ...(wrap && { paddingBottom: verticalSize }),
    };
  }

  return (
    <>
      <div style={style}>{children}</div>
      {index < latestIndex && split && <span style={style}>{split}</span>}
    </>
  );
};

export default Item;
