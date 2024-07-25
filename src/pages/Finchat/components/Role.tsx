import React from 'react';

const ShareWithOthers = ({onUserSelect}) => {
  const users = [
    { id: 20, name: '巴菲特', role: 'Wallen Buffett', gender: 'men' },
    { id: 11, name: '木头姐', role: 'Wallen Buffett', gender: 'women' },
    { id: 32, name: '达利欧', role: 'Wallen Buffett', gender: 'men' },
    { id: 28, name: '巴菲特', role: 'Wallen Buffett', gender: 'women' },
    { id: 66, name: '价值投资者', role: 'Wallen Buffett', gender: 'men' },
    { id: 19, name: '短期投资者', role: 'Wallen Buffett', gender: 'women' },
    { id: 15, name: '段永平', role: 'Wallen Buffett', gender: 'men' },
    { id: 21, name: '宏观分析师', role: 'Wallen Buffett', gender: 'men' },
  ];

  const handleUserClick = (user) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        height: '100%',
        width: '100%',
        padding: 16,
      }}
    >
      {/* <h3 className="font-bold text-2xl font-sans">Share with others</h3> */}
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap', // 允许列表项自动换行
          justifyContent: 'space-around', // 均匀分布列表项
          listStyleType: 'none',
          padding: 0,
        }}
      >
        {users.map(user => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '8px',
            }}
          >
            <img
              src={`https://randomuser.me/api/portraits/${user.gender}/${user.id}.jpg`}
              alt=""
              style={{
                borderRadius: '50%',
                width: '128px',
                height: '128px',
                objectFit: 'cover',
              }}
              onClick={() => handleUserClick(user)}
            />
            <h5 className="font-semibold">{user.name}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShareWithOthers;