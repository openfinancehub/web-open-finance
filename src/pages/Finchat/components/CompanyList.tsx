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

const CompanyList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const list = [
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/AAPL.svg',
      name: 'Apple Inc.'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/2222.SR.svg',
      name: 'Saudi Arabian Oil Company'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/MSFT.svg',
      name: 'Microsoft Corporation'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/AMZN.svg',
      name: 'Amazon.com, Inc.'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/TSLA.svg',
      name: 'Tesla, Inc.'
    }
  ];

  return (
    <div className={styles.wrapList}>
      {[...list, ...list, ...list, ...list, ...list].map((item, index) => (
        <p key={item.name + index}>
          <img src={item.src} />
          {item.name}
        </p>
      ))}
    </div>
  );
};

export default CompanyList;
