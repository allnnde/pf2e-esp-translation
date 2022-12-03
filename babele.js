Hooks.once("init", () => {
    console.log("PF2E Compendium - Spanish translation loaded by Allnnde.");
  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "PF2E-esp",
      lang: "es",
      dir: "compendium",
    });
  }
});
