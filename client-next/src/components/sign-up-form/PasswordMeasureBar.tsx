/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import zxcvbn from 'zxcvbn';

const strengthText = {
  0: 'Weak',
  1: 'Fair',
  2: 'Good',
  3: 'Strong',
  4: 'Very strong',
};

type Score = 0 | 1 | 2 | 3 | 4;

const SBar = styled('div')<{ score: Score; measurewidth: string }>(
  ({ theme, score, measurewidth }) => {
    let color = 'red';
    switch (score) {
      case 1:
        color = 'orange';
        break;
      case 2:
        color = 'yellow';
        break;
      case 3:
        color = 'green';
        break;
      case 4:
        color = 'darkGreen';
        break;
      default:
        break;
    }

    return {
      position: 'relative',
      height: '2px',
      width: '100%',
      background: theme.palette.grey[300],
      '&::before': {
        width: measurewidth,
        position: 'absolute',
        content: '""',
        top: '0px',
        left: '0px',
        bottom: '0px',
        transition: `0.3s ${theme.transitions.easing.easeIn}`,
        backgroundColor: color,
      },
    };
  }
);

const SInnerBar = styled('span')(({ theme }) => ({
  position: 'absolute',
  inset: '0 18%',
  borderLeft: `8px solid ${theme.palette.background.default}`,
  borderRight: `8px solid ${theme.palette.background.default}`,
  '&::after': {
    position: 'absolute',
    content: '""',
    inset: '0 30%',
    borderLeft: `8px solid ${theme.palette.background.default}`,
    borderRight: `8px solid ${theme.palette.background.default}`,
  },
}));

const SPasswordMeasureBar = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const SText = styled('span')(({ theme }) => ({
  minHeight: '20px',
  marginTop: theme.spacing(1),
  opacity: '70%',
}));

const PasswordMeasureBar: React.FC<{ password: string }> = (props) => {
  const { password } = props;

  const [point, setPoint] = useState<Score>(0);

  useEffect(() => {
    const result = zxcvbn(password);
    setPoint(result.score);
  }, [password]);

  return (
    <SPasswordMeasureBar>
      <SBar
        score={point}
        measurewidth={password.length === 0 ? '0%' : `${(point + 1) * 20}%`}
      >
        <SInnerBar />
      </SBar>
      <SText>{password.length !== 0 && strengthText[point]}</SText>
    </SPasswordMeasureBar>
  );
};

export default PasswordMeasureBar;
