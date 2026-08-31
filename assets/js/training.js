const staticJobContents = document.querySelector(".static-job-contents");

let jobArr = [];

const displayJobListing = (listing) => {
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

  const jobTexte = document.createElement("p");
  jobTexte.classList.add("job-text");
  jobTexte.textContent = `${listing.position}`;

  const staticJobParagraphe = document.createElement("div");
  staticJobParagraphe.classList.add("static-job-paragraphe");

  const ago = document.createElement("p");
  ago.textContent = `${listing.postedAt}`;

  const dotParagraphe = document.createElement("p");
  dotParagraphe.textContent = ".";

  const fullTime = document.createElement("p");
  fullTime.textContent = `${listing.contract}`;

  const dotParagrapheTwo = document.createElement("p");
  dotParagrapheTwo.textContent = ".";

  const usaOnly = document.createElement("p");
  usaOnly.textContent = `${listing.location}`;

  const staticFullButtons = document.createElement("div");
  staticFullButtons.classList.add("static-full-buttons");

  const bouttonsClass = document.createElement("div");
  bouttonsClass.classList.add("bouttons-class");

  const btnFrontend = document.createElement("button");
  btnFrontend.textContent = `${listing.role}`;

  const btnLevel = document.createElement("button");
  btnLevel.textContent = `${listing.level}`;

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

  staticJobText.appendChild(jobTexte);
  staticJobParagraphe.append(
    ago,
    dotParagraphe,
    fullTime,
    dotParagrapheTwo,
    usaOnly
  );

  staticJobElements.append(
    staticJobButtons,
    staticJobText,
    staticJobParagraphe
  );
  bouttonsClass.append(btnFrontend, btnLevel);
  staticFullButtons.appendChild(bouttonsClass);
  staticJobItems.append(staticJobImage, staticJobElements);
  staticJobContainer.append(staticJobItems, staticFullButtons);
  return staticJobContainer;
};

const createJobListingElement = (jobArr) => {
  const listingArr = Array.isArray(jobArr) ? jobArr : [jobArr];
  const texteNodes = listingArr.map((listing) => {
    return displayJobListing(listing);
  });

  staticJobContents.replaceChildren(...texteNodes);
};

const fetchAllJob = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    jobArr = await response.json();
    createJobListingElement(jobArr);
  } catch (error) {
    console.log(`Erreur ${error}`);
  }
};

fetchAllJob();
