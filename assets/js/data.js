let jobArr = [];
let activerFilters = [];

const staticJobContents = document.querySelector(".static-job-contents");
const filterBar = document.querySelector(".filter-bar");
const activeFilterContainer = document.querySelector(
  ".active-filter-container"
);

const renderActiveFilters = () => {
  if (activerFilters.length === 0) {
    filterBar.classList.add("hidden");
    return;
  }

  filterBar.classList.remove("hidden");

  activeFilterContainer.innerHTML = "";

  activerFilters.forEach((filtre) => {
    const filterItem = document.createElement("div");
    filterItem.classList.add("active-filter-item");

    const p = document.createElement("p");
    p.textContent = `${filtre}`;

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.setAttribute("aria-label", "Remove filter");
    btnDelete.classList.add("btn-delete");

    btnDelete.addEventListener("click", () => {});

    const iconImageFont = document.createElement("i");
    iconImageFont.classList.add("fa-solid", "fa-xmark");
    iconImageFont.setAttribute("aria-hidden", "true");

    const btnClearBlock = document.createElement("div");
    btnClearBlock.classList.add("btn-clear-block");

    btnDelete.appendChild(iconImageFont);
    filterItem.append(p, btnDelete);
    activeFilterContainer.appendChild(filterItem);
    // filterBar.append(activeFilterContainer, btnClearBlock);
  });

  const btnClear = document.querySelector(".btn-clear");
  console.log(btnClear);
};

renderActiveFilters();

const createJobListingNodes = (listing) => {
  const staticJobContainer = document.createElement("div");
  staticJobContainer.classList.add("static-job-container");

  const staticJobItems = document.createElement("div");
  staticJobItems.classList.add("static-job-items");

  const staticJobImage = document.createElement("div");
  staticJobImage.classList.add("static-job-image");

  const img = document.createElement("img");
  img.src = `${listing.logo}`;
  img.alt = `${listing.company}`;

  const staticJobElements = document.createElement("div");
  staticJobElements.classList.add("static-job-elements");

  const staticJobButtons = document.createElement("div");
  staticJobButtons.classList.add("static-job-buttons");

  const photosnap = document.createElement("p");
  photosnap.classList.add("photosnap");
  photosnap.textContent = `${listing.company}`;

  const staticJobText = document.createElement("div");
  staticJobText.classList.add("static-job-text");

  const jobText = document.createElement("p");
  jobText.classList.add("job-text");
  jobText.textContent = `${listing.position}`;

  const staticJobParagraphe = document.createElement("div");
  staticJobParagraphe.classList.add("static-job-paragraphe");

  const ago = document.createElement("p");
  ago.textContent = `${listing.postedAt}`;

  const dotOne = document.createElement("p");
  dotOne.textContent = ".";

  const fullTime = document.createElement("p");
  fullTime.textContent = `${listing.contract}`;

  const dotTwo = document.createElement("p");
  dotTwo.textContent = ".";

  const usaOnly = document.createElement("p");
  usaOnly.textContent = `${listing.location}`;

  const staticFullButtons = document.createElement("div");
  staticFullButtons.classList.add("static-full-buttons");

  const bouttonsClass = document.createElement("div");
  bouttonsClass.classList.add("bouttons-class");

  const buttonRole = document.createElement("button");
  buttonRole.type = "button";
  buttonRole.textContent = `${listing.role}`;
  buttonRole.addEventListener("click", () => {
    if (!activerFilters.includes(listing.role)) {
      activerFilters.push(listing.role);
      executerLeFiltrage();
    }
  });

  const buttonLevel = document.createElement("button");
  buttonLevel.type = "button";
  buttonLevel.textContent = `${listing.level}`;

  buttonLevel.addEventListener("click", () => {
    if (!activerFilters.includes(listing.level)) {
      activerFilters.push(listing.level);
      executerLeFiltrage();
    }
  });

  staticJobImage.appendChild(img);

  staticJobButtons.append(photosnap);
  if (listing.new === true) {
    const paraNew = document.createElement("p");
    paraNew.classList.add("para-new");
    paraNew.textContent = "New!";
    staticJobButtons.appendChild(paraNew);
  }

  if (listing.featured === true) {
    staticJobContainer.classList.add("featured-border");
    const parFeature = document.createElement("p");
    parFeature.classList.add("par-feature");
    parFeature.textContent = "Featured";
    staticJobButtons.appendChild(parFeature);
  }
  staticJobText.appendChild(jobText);
  staticJobParagraphe.append(ago, dotOne, fullTime, dotTwo, usaOnly);
  bouttonsClass.append(buttonRole, buttonLevel);

  if (listing.languages && listing.languages.length > 0) {
    listing.languages.forEach((el) => {
      const buttonLanguages = document.createElement("button");
      buttonLanguages.type = "button";
      buttonLanguages.textContent = `${el}`;

      buttonLanguages.addEventListener("click", () => {
        if (!activerFilters.includes(el)) {
          activerFilters.push(el);
          executerLeFiltrage();
        }
      });
      bouttonsClass.appendChild(buttonLanguages);
    });
  }

  if (listing.tools && listing.tools.length > 0) {
    listing.tools.forEach((tool) => {
      const buttonTools = document.createElement("button");
      buttonTools.type = "button";
      buttonTools.textContent = `${tool}`;

      buttonTools.addEventListener("click", () => {
        if (!activerFilters.includes(tool)) {
          activerFilters.push(tool);
          executerLeFiltrage();
        }
      });
      bouttonsClass.appendChild(buttonTools);
    });
  }

  staticJobElements.append(
    staticJobButtons,
    staticJobText,
    staticJobParagraphe
  );
  staticFullButtons.append(bouttonsClass);
  staticJobItems.append(staticJobImage, staticJobElements);

  staticJobContainer.append(staticJobItems, staticFullButtons);

  return staticJobContainer;
};

const createJobListingElement = (jobListing) => {
  jobArr = Array.isArray(jobListing) ? jobListing : [jobListing];

  const texteNodes = jobArr.map((listing) => {
    return createJobListingNodes(listing);
  });
  if (!staticJobContents) return;
  staticJobContents.replaceChildren(...texteNodes);
};

const fetchAll = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const jobListing = await response.json();
    createJobListingElement(jobListing);
  } catch (error) {
    console.log("Erreur :", error);
  }
};
fetchAll();
