const filterChips = document.querySelectorAll(".filter-chip");
const searchInput = document.getElementById("routeSearch");
const routeCards = document.querySelectorAll(".route-card");
const emptyState = document.getElementById("emptyState");
const preferredButtons = document.querySelectorAll(".details-btn");

let activeCorridor = "all";

function applyRouteFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  routeCards.forEach((card) => {
    const matchesCorridor =
      activeCorridor === "all" || card.dataset.corridor === activeCorridor;
    const searchableText = `${card.textContent} ${card.dataset.search || ""}`.toLowerCase();
    const matchesQuery = !query || searchableText.includes(query);

    const shouldShow = matchesCorridor && matchesQuery;
    card.classList.toggle("hidden", !shouldShow);
    if (shouldShow) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");
    activeCorridor = chip.dataset.corridor;
    applyRouteFilters();
  });
});

searchInput.addEventListener("input", applyRouteFilters);

preferredButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".route-card");
    const isPreferred = card.classList.toggle("preferred");
    btn.textContent = isPreferred ? "Preferred ✓" : "Mark Preferred";
  });
});