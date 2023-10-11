export function capitalizeWords(inputString) {
  const words = inputString.split(" ");
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return "";
    }
  });
  return capitalizedWords.join(" ");
}

const selectedClubCategories = [
  "top rated",
  "cycling",
  "fishing",
  "sports",
  "adventure",
  "science",
  "nature",
  "music",
  "photography",
  "film",
];

export const classifyData = (input) => {
  const tempCategorizedDataObject = {};
  selectedClubCategories.forEach((category) => {
    const filteredItems = input.filter((item) =>
      item.category.includes(category.toLowerCase())
    );
    tempCategorizedDataObject[category] = filteredItems;
  });
  return tempCategorizedDataObject;
};

function findMaxNumberAndIndex(arr) {
  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }

  return { max, maxIndex };
}

export function modifyClassifiedData(classifiedData) {
  classifiedData.forEach((element) => {
    if (element.length > 0) {
      const tempAveragArray = element.map((item) => item.averageRating);
      const { maxIndex } = findMaxNumberAndIndex(tempAveragArray);
      const tempElement = { ...element[maxIndex] };
      tempElement.category = "top rated";
      classifiedData[0].push(tempElement);
    }
  });
}
