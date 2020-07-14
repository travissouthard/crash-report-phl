$(() => {
    $("#called911").on("change", () => {
        $("#policeResponse").toggleClass("hidden");
    });

    $("#madeReport").on("change", () => {
        $("#policeReport").toggleClass("hidden");
    });

    $("#haveLawyer").on("change", () => {
        $("#lawyerInfo").toggleClass("hidden");
    });
});