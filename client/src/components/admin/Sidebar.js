import React, {useEffect, useState} from 'react'
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilUsdSquare,
    UilMoneyWithdrawal,
} from '@iconscout/react-unicons';

import './sidebar.css';

import ProductTable from '../../features/products/components';
import UserTable from '../../features/users/components';
import OrdersTable from '../../features/orders/components';
import UserReview from './UserReview';

const Sidebar = () => {
  
  useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.innerHTML = `
      body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-image: url('https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg?auto=compress&cs=tinysrgb&w=1600');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        opacity: 0.4;
      }
    `;

    // Append style element to head
    document.head.appendChild(style);

    // Remove style element when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);
    const SidebarData = [
        {
            icon:UilEstate,
            heading:'DashBoard'
        },
        {
            icon:UilClipboardAlt,
            heading:'Orders',
        },{
            icon:UilUsersAlt,
            heading:'Customers',
        },
        {
            icon:UilPackage,
            heading:'Products',
        },
        {
            icon:UilChart,
            heading:'Analytics'
        }
    ]
  const [selected, setSelected] = useState(0);
  // const [expanded, setExpanded] = useState(true);
  function handleSelected(index, item){
    setSelected(index)
    

  }
   return (
    <div className='admin-panel'>
    <div className='Sidebar'>
      <div className='logo'>
        <img src='' alt='log'/>
        <span>
          Sh<span>o</span>ps
        </span>
      </div>
      {/* Menu */}

      <div className='menu'>
      {SidebarData.map((item,index)=>{
        return(
          <div className={selected===index?'menuItem active':'menuItem'}
             key={index}
             onClick={()=>handleSelected(index, item)}
             >
             <item.icon/>
                 <span>
                  {item.heading}
                 </span>                
          </div>
        )
      })}
      <div className='menuItem'>
        <UilSignOutAlt/>
      </div>
      </div>
    </div>
    <div className='userTable'>
      {selected === 2 && <UserTable /> }
      {selected === 3 && <ProductTable /> }
      {selected === 1 && <OrdersTable /> }
      {selected === 4 && <OrdersTable /> }
      
    </div>
    </div>
  )
}

export default Sidebar