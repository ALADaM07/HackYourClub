import "dotenv/config";
// import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Club from "../models/Club.js";
import Activity from "../models/Activity.js";
import Review from "../models/Review.js";
import UserV3 from "../models/UserV3.js";

import fs from "fs";

// const jsonFilePathClubsMerged = "./json_files/clubs.json";
// const jsonDataClubs = fs.readFileSync(jsonFilePathClubsMerged, "utf8");
// const clubs = JSON.parse(jsonDataClubs);

// const jsonFilePathActivities = "./json_files/activities.json";
// const jsonDataActivities = fs.readFileSync(jsonFilePathActivities, "utf8");
// const activities = JSON.parse(jsonDataActivities);

const jsonFilePathReviews = "./json_files/reviews.json";
const jsonDataReviews = fs.readFileSync(jsonFilePathReviews, "utf8");
const reviews = JSON.parse(jsonDataReviews);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// async function deleteExistingClubs() {
//   try {
//     await Club.deleteMany({});
//     //console.log("Deleted existing Clubs.");
//   } catch (error) {
//     //console.error("Error deleting existing Clubs:", error);
//   }
// }
// async function deleteExistingActivities() {
//   try {
//     await Activity.deleteMany({});
//     //console.log("Deleted existing Activities.");
//   } catch (error) {
//     //console.error("Error deleting existing Activities:", error);
//   }
// }
// async function deleteExistingUsers() {
//   try {
//     await UserV3.deleteMany({});
//     //console.log("Deleted existing Users.");
//   } catch (error) {
//     //console.error("Error deleting existing data:", error);
//   }
// }
async function deleteExistingReviews() {
  try {
    await Review.deleteMany({});
    //console.log("Deleted existing Users.");
  } catch (error) {
    //console.error("Error deleting existing data:", error);
  }
}

// async function generateActivities(currentClub) {
//   const clubCategoryObject = activities.find(
//     (item) => item.category === currentClub.category
//   );

//   if (clubCategoryObject) {
//     const activitiesList = clubCategoryObject.activities;

//     const listActivityId = [];

//     let singleActivity;
//     for (let i = 0; i < activitiesList.length; i++) {
//       const photoList = await generateRandomPhotoUriList(
//         currentClub.category,
//         20
//       );
//       if (activitiesList[i].address) {
//         singleActivity = {
//           ...activitiesList[i],
//           club: currentClub._id,
//           uriPhotos: photoList,
//           category: currentClub.category,
//           // type: "activities",
//         };
//       } else {
//         singleActivity = {
//           ...activitiesList[i],
//           club: currentClub._id,
//           address: currentClub.address,
//           uriPhotos: photoList,
//           category: currentClub.category,
//           // type: "activities",
//         };
//       }

//       // console.log("singleActivity ", singleActivity);
//       const activity = new Activity(singleActivity);
//       const result = await activity.save();
//       listActivityId.push(result._id);
//     }
//     return listActivityId;
//   } else {
//     //console.log("Category not found:", currentClub.category);
//     return [];
//   }
// }

// async function generateRandomPhotoUriList(category, totalAmountOfPhotos) {
//   const listPhotos = [];
//   for (let i = 0; i < totalAmountOfPhotos; i++) {
//     listPhotos.push(faker.image.urlLoremFlickr({ category: category }));
//   }
//   return listPhotos;
// }

// async function generateDummyClubs(clubData) {
//   try {
//     for (let i = 0; i < clubData.length; i++) {
//       console.log("Creating club data #:", i + 1);

//       const club = new Club(clubData[i]);
//       const result = await club.save();

//       const activityIdList = await generateActivities(result);

//       const photoList = await generateRandomPhotoUriList(result.category, 20);
//       await Club.updateOne(
//         { _id: result._id },
//         {
//           $push: {
//             activities: activityIdList,
//             uriPhotos: photoList,
//           },
//         }
//       );
//     }
//     console.log("Clubs created successfully!");
//   } catch (error) {
//     console.error("Error creating clubs:", error);
//   }
// }

// function getRandomDateOfBirth() {
//   const start = new Date(1970, 0, 1);
//   const end = new Date(2005, 11, 31);
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

// async function generateDummyUsers(totalUserNumber) {
//   try {
//     for (let i = 0; i < totalUserNumber; i++) {
//       const user = new UserV3({
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         dateOfBirth: getRandomDateOfBirth(),
//         profileImage: faker.image.avatar(),
//       });
//       console.log("saving user:", i);
//       await user.save();
//     }
//     //console.log("Dummy users created successfully!");
//   } catch (error) {
//     //console.error("Error creating dummy users:", error);
//   }
// }

async function generateReviews() {
  for (const user of tempUsers) {
    for (const club of tempClubs) {
      // Generate and save reviews for clubs
      console.log("Generating reviews for club:", club.name);
      try {
        const review = new Review({
          clubOrActivityId: club._id,
          onModel: "Club",
          userId: user._id,
          content: reviews[Math.floor(Math.random() * reviews.length) + 1],
          rating: Math.floor(Math.random() * 5) + 1,
        });
        const newReview = await review.save();

        // Update user and club with the new review
        await UserV3.findByIdAndUpdate(
          user._id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );
        await Club.findByIdAndUpdate(
          club._id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );

        // Calculate the average rating for the club and save it
        await club.calculateAverageRating();
      } catch (error) {
        console.error("Error generating club review:", error);
      }
    }
    for (const activity of tempActivities) {
      // Generate and save reviews for clubs
      console.log("Generating reviews for activity:", activity.name);
      try {
        const review = new Review({
          clubOrActivityId: activity._id,
          onModel: "Activity",
          userId: user._id,
          content: reviews[Math.floor(Math.random() * reviews.length) + 1],
          rating: Math.floor(Math.random() * 5) + 1,
        });
        const newReview = await review.save();

        // Update user and club with the new review
        await UserV3.findByIdAndUpdate(
          user._id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );
        await Activity.findByIdAndUpdate(
          activity._id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );

        // Calculate the average rating for the club and save it
        await activity.calculateAverageRating();
      } catch (error) {
        console.error("Error generating activity review:", error);
      }
    }
  }
}

const tempUsers = await UserV3.find();
const tempClubs = await Club.find();
const tempActivities = await Activity.find();

(async function populateData() {
  const startTime = Date.now(); // Record the start time
  console.log("Seeding the database...");
  // await deleteExistingClubs();
  // await deleteExistingActivities();
  // await deleteExistingUsers();
  // await generateDummyClubs(clubs);
  // await generateDummyUsers(10);

  await deleteExistingReviews();
  await generateReviews();

  await mongoose.connection.close();
  console.log("Seeding done successfully!");
  const endTime = Date.now(); // Record the end time
  const duration = endTime - startTime; // Calculate the duration in milliseconds
  console.log(`Execution took ${(duration / 1000 / 60).toFixed(2)} minutes`);
  process.exit(0);
})();

// async function generateReviews() {
//   for (const user of tempUsers) {
//     let newReview;
//     console.log("Generating reviews for user:", user.firstName);
//     for (const club of tempClubs) {
//       try {
//         const review = new Review({
//           clubOrActivityId: club._id,
//           onModel: "Club",
//           userId: user._id,
//           content: reviews[Math.floor(Math.random() * reviews.length) + 1],
//           rating: Math.floor(Math.random() * 5) + 1,
//         });
//         newReview = await review.save();
//         // console.log("newReview._id ", newReview._id);
//       } catch (error) {
//         console.error("Error creating reviews:", error);
//       }

//       try {
//         const updatedUser = await UserV3.findByIdAndUpdate(
//           user._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );

//         if (!updatedUser) {
//           console.error("User not found!");
//         } else {
//           console.log("User updated with new review.");
//         }
//       } catch (err) {
//         console.error("Error updating user:", err);
//       }
//       try {
//         const updatedClub = await Club.findByIdAndUpdate(
//           club._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );

//         if (!updatedClub) {
//           console.error("Club not found!");
//         } else {
//           console.log("Club updated with new review.");
//         }
//       } catch (err) {
//         console.error("Error updating club:", err);
//       }
//     }

//     for (const activity of tempActivities) {
//       try {
//         const review = new Review({
//           clubOrActivityId: activity._id,
//           onModel: "Activity",
//           userId: user._id,
//           content: reviews[Math.floor(Math.random() * reviews.length) + 1],
//           rating: Math.floor(Math.random() * 5) + 1,
//         });
//         newReview = await review.save();
//         // console.log("newReview._id ", newReview._id);
//       } catch (error) {
//         console.error("Error creating dummy users:", error);
//       }

//       try {
//         const updatedUser = await UserV3.findByIdAndUpdate(
//           user._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );

//         if (!updatedUser) {
//           console.error("User not found!");
//         } else {
//           console.log("User updated with new review.");
//         }
//       } catch (err) {
//         console.error("Error updating user:", err);
//       }
//       try {
//         const updatedActivity = await Activity.findByIdAndUpdate(
//           activity._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );

//         if (!updatedActivity) {
//           console.error("Activity not found!");
//         } else {
//           console.log("Activity updated with new review.");
//         }
//       } catch (err) {
//         console.error("Error updating activity:", err);
//       }
//     }
//   }
// }

// async function generateDummyClubs2(clubData) {
//   try {
//     const batchSize = 5; // Number of clubs to process in each batch
//     for (let i = 0; i < clubData.length; i += batchSize) {
//       const batch = clubData.slice(i, i + batchSize);
//       const clubPromises = batch.map(async (clubItem) => {
//         const club = new Club(clubItem);
//         const result = await club.save();
//         const activityIdList = await generateActivities(result);
//         const photoList = await generateRandomPhotoUriList(result.category, 20);
//         await Club.updateOne(
//           { _id: result._id },
//           { $push: { activities: activityIdList, uriPhotos: photoList } }
//         );
//       });
//       await Promise.all(clubPromises);
//     }
//     console.log("Dummy clubs created successfully!");
//   } catch (error) {
//     console.error("Error creating dummy clubs:", error);
//   }
// }

// async function generateReviews2() {
//   const userPromises = tempUsers.map(async (user) => {
//     let newReview;

//     for (const club of tempClubs) {
//       // Generate and save reviews for clubs
//       console.log("Generating reviews for club:", club.name);
//       try {
//         const review = new Review({
//           clubOrActivityId: club._id,
//           onModel: "Club",
//           userId: user._id,
//           content: reviews[Math.floor(Math.random() * reviews.length) + 1],
//           rating: Math.floor(Math.random() * 5) + 1,
//         });
//         newReview = await review.save();
//       } catch (error) {
//         console.error("Error creating club review:", error);
//       }

//       // Update user and club with the new review
//       try {
//         await UserV3.findByIdAndUpdate(
//           user._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );

//         await Club.findByIdAndUpdate(
//           club._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );
//       } catch (err) {
//         console.error("Error updating user or club:", err);
//       }
//     }

//     for (const activity of tempActivities) {
//       // Generate and save reviews for activities
//       console.log("Generating reviews for activity:", activity.name);

//       try {
//         const review = new Review({
//           clubOrActivityId: activity._id,
//           onModel: "Activity",
//           userId: user._id,
//           content: reviews[Math.floor(Math.random() * reviews.length) + 1],
//           rating: Math.floor(Math.random() * 5) + 1,
//         });
//         newReview = await review.save();
//       } catch (error) {
//         console.error("Error creating activity review:", error);
//       }

//       // Update user and activity with the new review
//       try {
//         await UserV3.findByIdAndUpdate(
//           user._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );
//         await Activity.findByIdAndUpdate(
//           activity._id,
//           { $push: { reviews: newReview._id } },
//           { new: true }
//         );
//       } catch (err) {
//         console.error("Error updating user or activity:", err);
//       }
//     }
//   });

//   await Promise.all(userPromises);
// }
