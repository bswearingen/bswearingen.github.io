import {ToggleButtonGroup, ToggleButton, RouterProvider, Tabs, TabList, Tab, TabPanel} from 'react-aria-components';
import { useNavigate, useLocation, Routes, Route } from 'react-router';
import { useState } from "react";
import Resume from './Resume/Resume.jsx'
import Projects from './Projects/Projects.jsx';
import CovidTracker from './CovidTracker/CovidTracker.jsx'

function AppTabs({ language }){
  let { pathname } = useLocation();

  return (
    <>
      <Tabs selectedKey={pathname}>
        <TabList aria-label="Tabs">
          <Tab id="/" href="/">{language === "french" ? "CV" : "Resume"}</Tab>
          {/* <Tab id="/projects" href="/projects">{language === "french" ? "Mes projets" : "Projects"}</Tab> */}
          <Tab id="/covid-tracker" href="/covid-tracker">{language === "french" ? "La COVID-19 au Québec" : "COVID in Quebec"}</Tab>
          <Tab id="/github" href="https://github.com/bswearingen" target="_blank">Github</Tab>
        </TabList>
        <TabPanel id={pathname}>
          <Routes>
            <Route path="/" element={<Resume language={language}/>} />
            {/* <Route path="/projects" element={<Projects language={language} />} /> */}
            <Route path="/covid-tracker" element={<CovidTracker language={language} />} />
          </Routes>
        </TabPanel>
      </Tabs>
    </>
  );
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(new Set(['french']));

  const navigate = useNavigate();
  return (
    <>
      <div className='site-header'>
        <h1>Ben Swearingen</h1>
        <ToggleButtonGroup 
          selectedKeys={selectedLanguage}
          onSelectionChange={setSelectedLanguage}>
          <ToggleButton id="french">Français</ToggleButton>
          <ToggleButton id="english">English</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <RouterProvider navigate={navigate}>
        <Routes>
          <Route path="/*" element={<AppTabs language={selectedLanguage.has('french') ? 'french' : 'english'}/>} />
        </Routes>
      </RouterProvider>
    </>
  );
}

export default App
