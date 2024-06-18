export type ConfigProps = {
  activeTheme: string;
  miniSidebar: boolean;
  sidebarDrawer: any;

  Customizer_drawer: boolean;
  setHorizontalLayout: boolean;
  setRTLLayout: boolean;
  boxed: boolean;
  setBorderCard: boolean;
};

const config: ConfigProps = {
  activeTheme: "BLUE_THEME",
  miniSidebar: false,
  sidebarDrawer: null,

  Customizer_drawer: false,
  setHorizontalLayout: false, // Horizontal layout
  setRTLLayout: false, // RTL layout
  boxed: true,
  setBorderCard: false,
};

export default config;
