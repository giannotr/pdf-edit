import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

function NavigationTools({ currentIndex, onSelect, children }) {
  return(
    <AppBar position="static" color="default">
      <Tabs
        value={currentIndex}
        onChange={onSelect}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Tab app navigation"
      >
        {children}
      </Tabs>
    </AppBar>
  );
}

export default NavigationTools;
