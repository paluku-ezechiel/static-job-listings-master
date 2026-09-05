const staticJobContents = document.querySelector(".static-job-contents");
let activerFilters = [];


const renderActiveFilters = () => {
  
}

const executerLeFiltrage = () => {
  if (activerFilters.length === 0) {
    createJobListingElement(jobArr);
    return;
  }

  const jobsFilters = jobArr.filter((listing) => {
    const competencesJob = [
      listing.role,
      listing.level,
      ...(listing.languages || []),
      ...(listing.tools || []),
    ];

    return activerFilters.every((unFiltre) =>
      competencesJob.includes(unFiltre)
    );
  });
  createJobListingElement(jobsFilters);
  renderActiveFilters();
};

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

  staticJobButtons.appendChild(photosnap);

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

  const buttonsClass = document.createElement("div");
  buttonsClass.classList.add("bouttons-class");

  const frontendButton = document.createElement("button");
  frontendButton.type = "button";
  frontendButton.textContent = `${listing.role}`;

  frontendButton.addEventListener("click", () => {
    if (!activerFilters.includes(listing.role)) {
      activerFilters.push(listing.role);
      executerLeFiltrage();
    }
  });

  const levelButton = document.createElement("button");
  levelButton.type = "button";
  levelButton.textContent = `${listing.level}`;

  levelButton.addEventListener("click", () => {
    if (!activerFilters.includes(listing.level)) {
      activerFilters.push(listing.level);
      executerLeFiltrage();
    }
  });

  staticJobImage.appendChild(img);
  staticJobText.appendChild(jobText);
  staticJobParagraphe.append(ago, dotOne, fullTime, dotTwo, usaOnly);
  staticJobElements.append(
    staticJobButtons,
    staticJobText,
    staticJobParagraphe
  );

  buttonsClass.append(frontendButton, levelButton);
  if (listing.languages && listing.languages.length > 0) {
    listing.languages.forEach((listLanguage) => {
      const languageButton = document.createElement("button");
      languageButton.type = "button";
      languageButton.textContent = `${listLanguage}`;
      languageButton.addEventListener("click", () => {
        if (!activerFilters.includes(listLanguage)) {
          activerFilters.push(listLanguage);
          executerLeFiltrage();
        }
      });
      buttonsClass.appendChild(languageButton);
    });
  }

  if (listing.tools && listing.tools.length > 0) {
    listing.tools.forEach((listTool) => {
      const toolButton = document.createElement("button");
      toolButton.type = "button";
      toolButton.textContent = `${listTool}`;
      toolButton.addEventListener("click", () => {
        if (!activerFilters.includes(listTool)) {
          activerFilters.push(listTool);
          executerLeFiltrage();
        }
      });

      buttonsClass.appendChild(toolButton);
    });
  }

  staticFullButtons.appendChild(buttonsClass);
  staticJobItems.append(staticJobImage, staticJobElements);
  staticJobContainer.append(staticJobItems, staticFullButtons);

  return staticJobContainer;
};

const createJobListingElement = (jobArr) => {
  const jobListing = Array.isArray(jobArr) ? jobArr : [jobArr];
  const texteNodes = jobListing.map((listing) => {
    return createJobListingNodes(listing);
  });

  if (!staticJobContents) return;
  staticJobContents.replaceChildren(...texteNodes);
};

let jobArr = [];
const fetchAllJobList = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    jobArr = await response.json();
    createJobListingElement(jobArr);
  } catch (error) {
    console.log("Erreur : ", error);
  }
};

fetchAllJobList();
