import { render } from "@testing-library/react"
import App from "./App"

it("app", async ()=>{
    
    const response = new App();
    var data= await response.api();
    expect(data.data.result.auditLog[0].userId).toEqual("115678")

})