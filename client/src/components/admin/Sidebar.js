import React, {useState} from 'react'

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


const Sidebar = () => {
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
   return (
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
             onClick={()=>setSelected(index)}
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
  )
}

export default Sidebar