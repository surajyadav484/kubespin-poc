import React from 'react';

const headerItems = [
    {
    titile:'Referral Program',
    icon:'',
    link:'/referral-program'
},
{
    titile:'Documentation',
    icon:'',
    link:'/documentation'
},
{
    titile:'Help',
    icon:'',
    link:'/help'
},
]

const Header = () => {
  return (
    <div className='h-12 shadow flex justify-center items-center gap-5 text-sm font-medium text-[#40545D]'>
      {headerItems.map((item, index) => (
        <a key={index} href={item.link} className="header-item">
          {item.titile}
          </a>
      ))}
    </div>
  );
}

export default Header;
