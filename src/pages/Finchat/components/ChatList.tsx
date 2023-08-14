import React from 'react';

import styles from './index.less';

interface InternalProps {
  list: any[];
  handleProps: (item: any) => void;
}

const ChatList: React.FC<InternalProps> = ({ list, handleProps }) => {
  const tempList = [
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

  const handleChooseRole = (item: any) => {
    console.log(item, 999);
    handleProps(item);
  };

  return (
    <div className={styles.wrapList}>
      {list.map((item, index) => (
        <p key={item.role + index} onClick={() => handleChooseRole(item)}>
          <img src={item.src ? item.src : tempList[index % 5]?.src} />
          <span className={styles.personName}>{item.role}</span>
        </p>
      ))}
    </div>
  );
};

export default ChatList;
