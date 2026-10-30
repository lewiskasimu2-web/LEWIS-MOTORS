const cars = [
  {
    id: 1,
    make: "Mercedes-Benz",
    model: "C-Class AMG Line",
    year: 2022,
    category: "Sedan",
    price: 6850000,
    mileage: "24,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.0L Turbo",
    seats: "5 seats",
    tag: "Popular",
    featured: 1,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1100&q=85",
    description: "A refined executive sedan with a sporty edge, premium cabin details and confident road presence. A great choice for everyday comfort and spirited drives."
  },
  {
    id: 2,
    make: "BMW",
    model: "X5 xDrive40i",
    year: 2023,
    category: "SUV",
    price: 11200000,
    mileage: "18,500 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "3.0L Turbo",
    seats: "5 seats",
    tag: "Featured",
    featured: 2,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=85",
    description: "A premium SUV combining a commanding driving position, versatile space and smooth performance. Ideal for family trips and long-distance journeys."
  },
  {
    id: 3,
    make: "Porsche",
    model: "911 Carrera",
    year: 2021,
    category: "Sports",
    price: 18900000,
    mileage: "12,000 km",
    transmission: "PDK Automatic",
    fuel: "Petrol",
    engine: "3.0L Flat-six",
    seats: "2+2 seats",
    tag: "Performance",
    featured: 3,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85",
    description: "An iconic sports car created for engaging performance. Its distinctive silhouette and driver-focused character make every journey special."
  },
  {
    id: 4,
    make: "Audi",
    model: "Q7 S Line",
    year: 2022,
    category: "SUV",
    price: 9650000,
    mileage: "29,000 km",
    transmission: "Automatic",
    fuel: "Diesel",
    engine: "3.0L TDI",
    seats: "7 seats",
    tag: "Family choice",
    featured: 4,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1100&q=85",
    description: "A spacious and sophisticated SUV with three-row practicality, premium comfort and a confident presence. Designed to make bigger journeys feel effortless."
  },
  {
    id: 5,
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2020,
    category: "SUV",
    price: 7950000,
    mileage: "42,000 km",
    transmission: "Automatic",
    fuel: "Diesel",
    engine: "2.8L Turbo",
    seats: "7 seats",
    tag: "Adventure",
    featured: 5,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=85",
    description: "A capable and comfortable SUV with a reputation for durability. A versatile option for city roads, family use and adventurous routes."
  },
  {
    id: 6,
    make: "Ford",
    model: "Mustang GT",
    year: 2021,
    category: "Coupe",
    price: 8250000,
    mileage: "16,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    engine: "5.0L V8",
    seats: "4 seats",
    tag: "V8 power",
    featured: 6,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5c452d1f2?auto=format&fit=crop&w=1100&q=85",
    description: "A bold performance coupe with unmistakable styling and an expressive V8 character. Built for drivers who enjoy a more engaging experience."
  }
];

const carGrid = document.getElementById("carGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("carModal");
const interestSelect = document.getElementById("interestSelect");

const formatPrice = amount =>
  "KSh " + amount.toLocaleString("en-KE");

function renderCars() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  let filteredCars = cars.filter(car => {
    const searchable =
      `${car.make} ${car.model} ${car.year} ${car.category} ${car.fuel}`.toLowerCase();

    return searchable.includes(searchTerm) &&
      (category === "all" || car.category === category);
  });

  switch (sortFilter.value) {
    case "low":
      filteredCars.sort((a, b) => a.price - b.price);
      break;

    case "high":
      filteredCars.sort((a, b) => b.price - a.price);
      break;

    case "newest":
      filteredCars.sort((a, b) => b.year - a.year);
      break;

    default:
      filteredCars.sort((a, b) => a.featured - b.featured);
  }

  resultCount.textContent = filteredCars.length;

  emptyState.hidden = filteredCars.length !== 0;
  carGrid.hidden = filteredCars.length === 0;

  carGrid.innerHTML = filteredCars.map(car => `
    <article class="car-card"
      tabindex="0"
      role="button"
      aria-label="View details for ${car.make} ${car.model}"
      data-car-id="${car.id}">

      <div class="car-image-wrap">
        <img
          src="${car.image}"
          alt="${car.year} ${car.make} ${car.model}"
          loading="lazy">

        <span class="car-tag">${car.tag}</span>
      </div>

      <div class="car-card-body">

        <div class="car-meta">
          <span>${car.category}</span>
          <span>${car.year}</span>
        </div>

        <h3>${car.make} ${car.model}</h3>

        <div class="car-specs">
          <span>${car.transmission}</span>
          <span>${car.fuel}</span>
          <span>${car.mileage}</span>
        </div>

        <div class="car-card-bottom">
          <span class="car-price">${formatPrice(car.price)}</span>
          <span class="view-details">
            View details <span>↗</span>
          </span>
        </div>

      </div>
    </article>
  `).join("");
}

function openCarDetails(carId) {
  const car = cars.find(item => item.id === Number(carId));

  if (!car) return;

  document.getElementById("modalImage").src = car.image;

  document.getElementById("modalImage").alt =
    `${car.year} ${car.make} ${car.model}`;

  document.getElementById("modalCategory").textContent =
    car.category;

  document.getElementById("modalTitle").textContent =
    `${car.make} ${car.model}`;

  document.getElementById("modalPrice").textContent =
    formatPrice(car.price);

  document.getElementById("modalDescription").textContent =
    car.description;

  document.getElementById("modalSpecs").innerHTML = [
    ["Year", car.year],
    ["Mileage", car.mileage],
    ["Transmission", car.transmission],
    ["Fuel type", car.fuel],
    ["Engine", car.engine],
    ["Capacity", car.seats]
  ].map(([label, value]) => `
    <div class="spec-item">
      <small>${label}</small>
      <b>${value}</b>
    </div>
  `).join("");

  interestSelect.value = String(car.id);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  document.getElementById("modalClose").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

carGrid.addEventListener("click", event => {
  const card = event.target.closest("[data-car-id]");

  if (card) {
    openCarDetails(card.dataset.carId);
  }
});

carGrid.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    const card = event.target.closest("[data-car-id]");

    if (card) {
      event.preventDefault();
      openCarDetails(card.dataset.carId);
    }
  }
});

[searchInput, categoryFilter, sortFilter].forEach(control => {
  control.addEventListener(
    control === searchInput ? "input" : "change",
    renderCars
  );
});

function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  sortFilter.value = "featured";

  renderCars();
}

document.getElementById("resetFilters")
  .addEventListener("click", resetFilters);

document.getElementById("emptyReset")
  .addEventListener("click", resetFilters);

document.getElementById("modalClose")
  .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

cars.forEach(car => {
  const option = document.createElement("option");

  option.value = String(car.id);
  option.textContent = `${car.make} ${car.model}`;

  interestSelect.appendChild(option);
});

document.getElementById("modalEnquire")
  .addEventListener("click", closeModal);

// Contact form demonstration

document.getElementById("contactForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const form = event.currentTarget;
    const feedback = document.getElementById("formFeedback");
    const name = form.elements.name.value.trim();

    feedback.textContent =
      `Thanks, ${name}! This demo form is working on the frontend, but messages are not sent to a server yet.`;

    form.reset();
  });

// Mobile navigation

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Automatic copyright year

document.getElementById("year").textContent =
  new Date().getFullYear();

// Display vehicles when the website loads

renderCars();