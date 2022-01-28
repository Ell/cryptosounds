import React, { useEffect, useState } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Ticker } from './Ticker';

export type OHLCPayload = {
  channelId: number;
  channelName: string;
  pair: string;
  data: {
    time: number;
    etime: number;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    vwap: number;
    count: number;
  };
  change: number;
};

export type TickerContainerProps = {
  pairs: { [key: string]: string }[];
};

export const TickerContainer: React.FC<TickerContainerProps> = ({ pairs }) => {
  const [messages, setMessages] = useState<{ [key: string]: OHLCPayload }>({});

  const { sendMessage, lastMessage, readyState } = useWebSocket('wss://ws.kraken.com');

  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        sendMessage(
          JSON.stringify({
            event: 'subscribe',
            pair: pairs.map(pair => Object.keys(pair)[0]),
            subscription: {
              name: 'ohlc',
            },
          })
        );
      default:
        break;
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);

      if (data[2] !== 'ohlc-1') {
        return;
      }

      const previousMessage = messages[data[3]];
      const previousClose = previousMessage ? previousMessage.data.close : data[1][5];

      const newMessage: OHLCPayload = {
        channelId: data[0],
        channelName: data[2],
        pair: data[3],
        data: {
          time: data[1][0],
          etime: data[1][1],
          open: data[1][2],
          high: data[1][3],
          low: data[1][4],
          close: data[1][5],
          vwap: data[1][6],
          volume: data[1][7],
          count: data[1][8],
        },
        change: data[1][5] - previousClose,
      };

      setMessages(m => ({ ...m, [newMessage.pair]: newMessage }));
    }
  }, [lastMessage, setMessages]);

  const renderPairs = () => {
    return Object.entries(messages).map(entry => {
      const payload = entry[1];
      return <Ticker key={payload.pair} payload={payload} />;
    });
  };

  return <div className="ticker-container">{renderPairs()}</div>;
};
