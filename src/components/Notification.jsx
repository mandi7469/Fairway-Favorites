// css import
import "../css/Game.css";

// the main container for the notification
const Notification = ({ showNotification }) => {
  return (
    // the 'show' class is conditionally applied based on the 'showNotification' prop,
    // which handles the display of the notification via css
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      <p>You have already entered this letter</p>
    </div>
  );
};

export default Notification;
