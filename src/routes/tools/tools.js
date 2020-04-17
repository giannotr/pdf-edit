import React, { Fragment, useState } from 'react';
import NavigationTools from '../../components/navigation-tools/navigation-tools';
import TabPanel from '../../components/tab-panel/tab-panel';
import Tab from '@material-ui/core/Tab';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Extract from './extract/extract';
import Merge from './merge/merge';
import Remove from './remove/remove';

const a11yProps = index => ({
  id: `app-navigation-tab-${index}`,
  'aria-controls': `app-navigation-tabpanel-${index}`,
});

function Tools() {
  const [tab, setTab] = useState(0);

  return(
    <Fragment>
      <NavigationTools currentIndex={tab} onSelect={(e, v) => setTab(v)}>
        <Tab label="Extract" icon={<CallSplitIcon />} {...a11yProps(0)} />
        <Tab label="Merge" icon={<MergeTypeIcon />} {...a11yProps(1)} />
        <Tab label="Remove" icon={<DeleteIcon />} {...a11yProps(2)} />
        {null && <Tab label="Item Four" icon={<FileCopyIcon />} {...a11yProps(3)} />}
        {null && <Tab label="Item Five" icon={<FileCopyIcon />} {...a11yProps(4)} />}
        {null && <Tab label="Item Six" icon={<FileCopyIcon />} {...a11yProps(5)} />}
        {null && <Tab label="Item Seven" icon={<FileCopyIcon />} {...a11yProps(6)} />}
      </NavigationTools>
      <TabPanel value={tab} index={0}>
        <Extract />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Merge />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Remove />
      </TabPanel>
    </Fragment>
  );
}

export default Tools;
