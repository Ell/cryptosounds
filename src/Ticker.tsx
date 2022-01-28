import React, { useEffect } from 'react';
import useSound from 'use-sound';

// @ts-ignore
import fart1 from './farts/fart1.mp3?url';
// @ts-ignore
import fart2 from './farts/fart2.mp3?url';
// @ts-ignore
import fart3 from './farts/fart3.mp3?url';
// @ts-ignore
import fart4 from './farts/fart4.mp3?url';
// @ts-ignore
import fart5 from './farts/fart5.mp3?url';
// @ts-ignore
import fart6 from './farts/fart6.mp3?url';
// @ts-ignore
import fart7 from './farts/fart7.mp3?url';

import { OHLCPayload } from './TickerContainer';

const formatter = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export const Ticker: React.FC<{ payload: OHLCPayload }> = ({ payload }) => {
  const [playFart1] = useSound(fart1, { volume: 0.2 });
  const [playFart2] = useSound(fart2, { volume: 0.2 });
  const [playFart3] = useSound(fart3, { volume: 0.2 });
  const [playFart4] = useSound(fart4, { volume: 0.2 });
  const [playFart5] = useSound(fart5, { volume: 0.2 });
  const [playFart6] = useSound(fart6, { volume: 0.2 });
  const [playFart7] = useSound(fart7, { volume: 0.2 });

  const fartChoices = [
    playFart1,
    playFart2,
    playFart3,
    playFart4,
    playFart5,
    playFart6,
    playFart7,
  ];

  useEffect(() => {
    const change = payload.change;
    if (change < 0) {
      fartChoices[Math.floor(Math.random() * fartChoices.length)]();
    }
  }, [payload.change]);

  const getBackgroundColor = (): string => {
    if (payload.change > 0) {
      return 'ticker-card__positive';
    }

    if (payload.change < 0) {
      return 'ticker-card__negative';
    }

    return 'ticker-card__neutral';
  };

  return (
    <div className={`ticker-card ${getBackgroundColor()}`}>
      <div className="ticker-card__content">
        <div className="ticker-card__content__pair">{payload.pair}</div>
        <div className="ticker-card__content__price">
          ${formatter.format(payload.data.close)}
        </div>
        <div className="ticker-card__content__change">
          ${formatter.format(payload.change)}
        </div>
      </div>
    </div>
  );
};
