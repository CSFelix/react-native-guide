import { createAppContainer } from 'react-navigation';
import { createStackNavigation } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigation(
    {
      Main,
      User,
    },
    {
      headerLayoutPreset: 'center', // centers the page's title
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#7159c1' },
        headerTintColor: '#fff',
      },
    }
  ),
);

export default Routes;
