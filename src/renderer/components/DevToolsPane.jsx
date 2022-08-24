import { VscChevronUp, VscClose } from 'react-icons/vsc';
import { Tabs } from 'antd';
import DebugConsole from './DebugConsole';
import OutputMessages from './OutputMessages';
import './DevToolsPane.css';

const { TabPane } = Tabs;

export default function () {
  return (
    <div className="dev-tools-pane" style={{ height: '100%' }}>
      <Tabs defaultActiveKey="1" style={{ height: '100%' }}>
        <TabPane tab="RUN" key="1">
          <OutputMessages />
        </TabPane>
        <TabPane tab="DEBUG CONSOLE" key="2">
          <DebugConsole />
        </TabPane>
      </Tabs>
    </div>
  );
}
