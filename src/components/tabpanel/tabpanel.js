import React from 'react';
import 'antd/dist/antd.css';
import './tabpanel.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

export default function TabPanel() {

return (
<div style = {{width: 110,height: 54, marginLeft: 450}}> 
  <Tabs defaultActiveKey="1" onChange={callback}>
   <TabPane ne tab="Search" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Rated" key="2">
      Content of Tab Pane 2
    </TabPane>
  </Tabs>
</div>
)
}