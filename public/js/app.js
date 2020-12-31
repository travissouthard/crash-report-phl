$(() => {
    // Report form UI enhancements
    $("#called911").on("change", () => {
        $("#policeResponse").toggleClass("hidden");
    });

    $("#madeReport").on("change", () => {
        $("#policeReport").toggleClass("hidden");
    });

    $("#haveLawyer").on("change", () => {
        $("#lawyerInfo").toggleClass("hidden");
    });
    
    // Mapbox Things
    //Temporarily moved to bottom of report.js until a better way to keep json as json, probably needs to be a React frontend rather than templates
});