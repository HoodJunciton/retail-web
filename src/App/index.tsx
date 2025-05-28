import ReduxProvider from "@/components/providers/ReduxProvider";
import { NotificationProvider } from "@/components/notifications";
import { MantineProvider } from "@mantine/core";
import RouterOutlet from "./Routes";
import { CustomSettingsProvider } from '../contexts/CustomSettingsProvider';
import { useSettings } from '../hooks/useSettings';
import AppTopBarLayout from '../components/layouts/variants/AppTopBarLayout';
import HorizontalLayout from '../components/layouts/variants/HorizontalLayout';
import AppTopBarLayoutRight from '../components/layouts/variants/AppTopBarLayoutRight'; // New layout with right sidebar
import ContentOnlyLayout from '../components/layouts/variants/ContentOnlyLayout'; // New content-focused layout
import CompactVerticalLayout from '../components/layouts/variants/CompactVerticalLayout'; // New compact vertical layout

const AppContent = () => {
  const { layout } = useSettings();

  let LayoutComponent;
  if (layout === 'horizontal') {
    LayoutComponent = HorizontalLayout;
  } else if (layout === 'vertical-right') {
    LayoutComponent = AppTopBarLayoutRight;
  } else if (layout === 'content-focused') {
    LayoutComponent = ContentOnlyLayout;
  } else if (layout === 'compact-vertical') {
    LayoutComponent = CompactVerticalLayout;
  } else { // Default to vertical (left sidebar)
    LayoutComponent = AppTopBarLayout;
  }

  return (
    <MantineProvider>
      <LayoutComponent>
        <RouterOutlet />
      </LayoutComponent>
    </MantineProvider>
  );
};

function App() {
  return (
    <ReduxProvider>
      <NotificationProvider>
        <CustomSettingsProvider> { /* Moved Provider to wrap AppContent */ }
          <AppContent />
        </CustomSettingsProvider>
      </NotificationProvider>
    </ReduxProvider>
  );
}

export default App;
