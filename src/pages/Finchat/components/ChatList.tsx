import React, { useState } from 'react';

import styles from './index.less';

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const ChatList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const list = [
    {
      src: 'https://randomuser.me/api/portraits/women/95.jpg',
      name: 'Van Dort'
    },
    {
      src: 'https://randomuser.me/api/portraits/men/11.jpg',
      name: 'Naik'
    },
    {
      src: 'https://randomuser.me/api/portraits/men/41.jpg',
      name: 'Perrin'
    },
    {
      src: 'https://randomuser.me/api/portraits/men/34.jpg',
      name: 'Romero'
    },
    {
      src: 'https://randomuser.me/api/portraits/women/40.jpg',
      name: 'Manzanare'
    }
  ];

  return (
    <div className={styles.wrapList}>
      {[...list, ...list, ...list, ...list, ...list].map((item, index) => (
        <p key={item.name + index}>
          <img src={item.src} />
          <span className={styles.personName}>{item.name}</span>
        </p>
      ))}
    </div>
  );
};

export default ChatList;
