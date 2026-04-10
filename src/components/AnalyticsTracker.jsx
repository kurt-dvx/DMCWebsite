import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics, logEvent } from "../firebase";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
};

export default AnalyticsTracker;