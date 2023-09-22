import React from 'react';
import { useTheme } from 'next-themes';

interface AlertsPopupProps {
  showAlerts: boolean;
  position: { top: number; left: number }; // Position for the popup
}

const AlertsPopup: React.FC<AlertsPopupProps> = ({ showAlerts, position }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  if (!showAlerts) {
    return null; // Return nothing if showAlerts is false
  }

  const popupStyle = {
    top: `${position.top}px`,
    left: `${position.left}px`,
    backgroundColor: isLightTheme ? 'black' : 'white',
    color: isLightTheme ? 'white' : 'black',
  };

  return (
    <div
      className="absolute p-4 border border-gray-300 rounded shadow-lg z-10"
      style={popupStyle}
    >
      {/* Add your alerts content here */}
      <section>This is your alerts popup content.</section>
    </div>
  );
};

export default AlertsPopup;
