import { render } from "@testing-library/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
// import apiDocument from "./COMP30022-Team35-CRM-1.0.0-resolved.yaml";
import data from "./COMP30022-Team35-CRM-1.0.0-resolved.json";

function Swagger() {
    return(
        <SwaggerUI spec={data} />
    )
}

export default Swagger;