import fs from "fs";
// import { exit } from "process";

const jsonFilePathClubsMerged = "./json_files/clubs.json";
const jsonDataClubs = fs.readFileSync(jsonFilePathClubsMerged, "utf8");
const clubs = JSON.parse(jsonDataClubs);

console.log(clubs.length);
