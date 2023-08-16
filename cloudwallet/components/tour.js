import { useContext, useEffect } from "react";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import newSteps from "./tour-steps";
import "shepherd.js/dist/css/shepherd.css";

const tourOptions = {
    defaultStepOptions: {
        cancelIcon: {
            enabled: true
        }
    },
    useModalOverlay: true
};

function TourInstance() {
    const tour = useContext(ShepherdTourContext);

    useEffect(() => {
        if (tour) tour.start();
    }, [tour]);

    return <></>;
}

export default function Tour() {
    return (
        <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
            <TourInstance />
        </ShepherdTour>
    );
}
