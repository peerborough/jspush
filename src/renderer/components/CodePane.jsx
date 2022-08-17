import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Flex,
  HStack,
  Select,
  Icon,
  IconButton,
  Spacer,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tooltip,
} from '@chakra-ui/react';
import { VscDebugRerun } from 'react-icons/vsc';
import CodeEditor from './CodeEditor';
import { setPreloadScript } from '../slices/editorSlice';
import { useIpcRendererListener } from '../ipc';
import { IpcEvents } from '../../ipcEvents';

const defaultScript = `// Called whenever DOM content for each frame has been loaded
function onReady({ url }) {
  console.log(\`onReady( "\${ url }" )\`);

}
`;

const suffixScript = `
if (document.readyState === "complete" 
   || document.readyState === "loaded" 
   || document.readyState === "interactive") {
  if (onReady) onReady({url: window.location.href});
}
else {
  window.addEventListener('DOMContentLoaded', (event) => {
    if (onReady) onReady({url: window.location.href});
  });  
}
`;

export default function () {
  const editorRef = useRef();
  const dispatch = useDispatch();

  useIpcRendererListener(IpcEvents.SELECT_ALL_IN_EDITOR, (event) => {
    if (editorRef.current?.hasTextFocus()) {
      editorRef.current?.selectAllTexts();
    }
  });

  const onRerun = () => {
    const value = editorRef.current?.getValue();
    const scriptValue = `${value};${suffixScript}`;
    dispatch(setPreloadScript(scriptValue));
  };

  return (
    <Tabs
      size="sm"
      display="flex"
      flex={1}
      flexDirection="column"
      variant="unstyled"
      h="full"
      w="full"
    >
      <TabList h="9" bg="blackAlpha.50">
        <HStack w="full" py={0}>
          <Tab _selected={{ color: 'gray.700', bg: 'white' }} h="full">
            index.js
          </Tab>
          <Spacer />
          <Tooltip label="Run the code on browser" openDelay={1000}>
            <IconButton
              variant="ghost"
              aria-label="Rerun"
              size="sm"
              colorScheme="blackAlpha"
              icon={<Icon as={VscDebugRerun} w={5} h={5} color="teal" />}
              onClick={onRerun}
            />
          </Tooltip>
          <Box>&nbsp;</Box>
        </HStack>
      </TabList>
      <TabPanels display="flex" flex={1}>
        <TabPanel p={0} display="flex" flex={1}>
          <Flex flex={1}>
            <CodeEditor ref={editorRef} defaultScript={defaultScript} />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
