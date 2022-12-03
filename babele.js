Hooks.once("init", () => {
    console.log("PF2E Compendium - Spanish translation loaded by Allnnde.");
  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "pf2e-es_2",
      lang: "es",
      dir: "compendium",
    });
  }
});
