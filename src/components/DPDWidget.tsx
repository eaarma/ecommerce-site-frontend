import { useEffect, useState } from "react";

const DPDWidget = ({
  onPickupSelect,
}: {
  onPickupSelect: (data: any) => void;
}) => {
  const [widgetClosed, setWidgetClosed] = useState(false);

  useEffect(() => {
    const handlePickupSelect = (event: MessageEvent) => {
      if (event.data?.dpdWidget) {
        if (event.data.dpdWidget.message === "widgetClose") {
          setWidgetClosed(true);
        } else {
          onPickupSelect(event.data.dpdWidget);
        }
      }
    };

    window.addEventListener("message", handlePickupSelect);
    return () => window.removeEventListener("message", handlePickupSelect);
  }, [onPickupSelect]);

  return (
    <div>
      {!widgetClosed && (
        <iframe
          src="https://api.dpd.cz/widget/latest/index.html?countries=EE&lang=et&hideCloseButton=true&hideOpeningHours=true"
          style={{ width: "100%", height: "500px", border: "none" }}
        ></iframe>
      )}
    </div>
  );
};

export default DPDWidget;
