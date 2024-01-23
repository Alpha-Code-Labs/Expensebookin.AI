import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Overview from '../screens/Overview';
import Travel from '../screens/Travel';
import Cash from '../screens/Cash';
import Expense from '../screens/Expense';
import Approval from '../screens/Approval';
import { Image } from 'react-native';
import { employeeRole } from '../../../dummyData/dashboard/employeeRole';
import { cash_icon, overview_icon, exp_c_icon, exp_icon, travel_icon } from '../../../../assets/icon';

const Tab = createBottomTabNavigator();

const Sidebar = () => {
 

  const sidebarItems = [
    { label: 'Overview', icon: overview_icon, screen: Overview },
    { label: 'Travel', icon: travel_icon, screen: Travel },
    { label: 'Cash-Advance', icon: cash_icon, screen: Cash },
    { label: 'Expense', icon: exp_icon, screen: Expense },
  ];

  if (employeeRole.employeeRoles.employeeManager) {
    sidebarItems.push({ label: 'Approval', icon: exp_icon, screen: Approval });
  }

  return (

   
 <Tab.Navigator
      screenOptions={{
        activeTintColor: '#4C36F1',
      }}
    >
      {sidebarItems.map((item, index) => (
        <Tab.Screen key={index} name={item.label} component={item.screen} options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
               className='w-6 h-6'
                source={item.icon}

                // style={{ width: size, height: size, tintColor: color }} 
              />
            ),
          }}/>
      ))}
    </Tab.Navigator>
   
  );
};

export default Sidebar;


// import React from 'react'
// import { View } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { employeeRole } from '../../../dummyData/dashboard/employeeRole'
// import Overview from '../screens/Overview'
// import Travel from '../screens/Travel'
// import Cash from '../screens/Cash'
// import Expense from '../screens/Expense'
// import Approval from '../screens/Approval'
// import { cash_icon,overview_icon,exp_c_icon,exp_icon,travel_icon } from '../../../../assets/icon'

// const Tab = createBottomTabNavigator()
// const sidebarItems = [
//     { label: 'Overview', icon: overview_icon  },
//     { label: 'Travel', icon: travel_icon },
//     { label: 'Cash-Advance', icon: cash_icon },
//     { label: 'Expense', icon: exp_icon },
//   ];

// if(employeeRole.employeeRoles.employeeManager){
//     sidebarItems.push({label:'Approval',icon:exp_icon})
// }  

// const Sidebar = () => {
//   return (
//     <Tab.Navigator>
//         <Tab.Screen name="OverView" component={""}/>
//     </Tab.Navigator>
//   )
// }

// export default Sidebar