import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import data from "./COMP30022-Team35-CRM-1.0.0-swagger.json";

export default function Swagger() {
    return(
        <SwaggerUI spec={data} />
    )
}