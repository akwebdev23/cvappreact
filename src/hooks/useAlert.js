import React, { useState } from "react";
import Alert from "../components/assets/alert/Alert";

const useAlert = () => {
    const [alerData, setAlertData] = useState();
    return [Alert, alerData, setAlertData];
}
export default useAlert;