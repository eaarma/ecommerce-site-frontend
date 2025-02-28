import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDeliveryMethodDetails } from "../redux/deliveryMethodSlice"; // Adjust the path as needed

const DPDWidget: React.FC = () => {
  const [widgetClosed, setWidgetClosed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePickupSelect = (event: MessageEvent) => {
      if (event.data?.dpdWidget) {
        if (event.data.dpdWidget.message === "widgetClose") {
          setWidgetClosed(true);
        } else {
          console.log("Selected DPD location:", event.data.dpdWidget);
          // Dispatch the Redux action with selected pickup details
          dispatch(
            updateDeliveryMethodDetails({
              provider: "DPD",
              name: event.data.dpdWidget.name || "",
              address:
                event.data.dpdWidget.pickupPointResult ||
                (event.data.dpdWidget.location?.address
                  ? `${event.data.dpdWidget.location.address.street}, ${event.data.dpdWidget.location.address.city}`
                  : ""),
              country: event.data.dpdWidget.location?.address?.country || "EE",
              price: event.data.dpdWidget.paymentOptions?.fee || 0,
            })
          );
        }
      }
    };

    window.addEventListener("message", handlePickupSelect);
    return () => window.removeEventListener("message", handlePickupSelect);
  }, [dispatch]);

  return (
    <div>
      {!widgetClosed && (
        <iframe
          src="https://api.dpd.cz/widget/latest/index.html?countries=EE&lang=et&hideCloseButton=true&hideOpeningHours=true&hideFilter=paymentMethod"
          style={{ width: "100%", height: "500px", border: "none" }}
          title="DPD Widget"
        >
          <input id="DPDPickupPointResult" type="hidden" />
        </iframe>
      )}
    </div>
  );
};

export default DPDWidget;
