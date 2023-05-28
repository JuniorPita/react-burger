import React from 'react';
import AppStyles from './app.module.scss';
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <div className={AppStyles.App}>
      <AppHeader />
    </div>
  );
}

export default App;
