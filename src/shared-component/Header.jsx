import { NavLink } from 'react-router';

const headerItems = [
    {
    titile:'Dashboard',
    icon:'',
    link:'/dashboard'
},
{
    titile:'Workload',
    icon:'',
    link:'/workload'
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
        <NavLink key={index} to={item.link} className={({isActive}) => isActive ? "px-3 py-1 bg-[#BCF7FF] rounded text-[#0D7381]":"px-3 py-1 hover:bg-gray-200 rounded"}>
          {item.titile}
          </NavLink>
      ))}
    </div>
  );
}

export default Header;
