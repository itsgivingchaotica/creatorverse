# WEB103 Prework - Creatorverse

Submitted by: Saoirse Siobhan Ebert

About this web app: Creatorverse allows users to add their favorite content creators from YouTube, Twitter, and/or Instagram, with the ability to edit their information and delete creators as desired.

Time spent: 36 hours

<p align="center"> 
  <img width="514" alt="Screen Shot 2023-08-23 at 2 34 44 AM" src="https://github.com/itsgivingchaotica/creatorverse/assets/91578619/62b24e00-cb3f-4cb2-9911-75b032049f68">
</p>

<h1 align="center"> <a href="https://creatorverse-puce.vercel.app"/>Deployed on Vercel</a> </h1>

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] Clicking on the creator's urls takes the user directly to their content
* [x] Updates are done in real time from the Supabase database to prevent any lags 

## Video Walkthrough

Here's a walkthrough of implemented required features:

Tools used for the demo were: QuickTime Player, Cloudconverter, Veed.io

## View Creators and Profiles

https://github.com/itsgivingchaotica/creatorverse/assets/91578619/c6d0b0fe-2e72-44ed-b347-6e59eed59166

## Edit a Creator with Error Handling

https://github.com/itsgivingchaotica/creatorverse/assets/91578619/499a672a-a8b4-49d8-aa1e-1ec963e4101c


https://github.com/itsgivingchaotica/creatorverse/assets/91578619/5ca8231b-59ba-4e65-bb4b-4f269930c8f0


https://github.com/itsgivingchaotica/creatorverse/assets/91578619/02788524-f8c8-4707-8743-ff1ebb734642

## Deleting Creators

https://github.com/itsgivingchaotica/creatorverse/assets/91578619/6ae7585a-82f3-4b1f-aed8-c74b2a2d07ec

https://github.com/itsgivingchaotica/creatorverse/assets/91578619/daf73978-7f78-441c-8372-e40be1373f89


## Notes

Syncing the data between Supabase and the UI was rathering interesting, producing several bugs which required diagnosing. I discovered in the doc Realtime Subscription and implemented that alongside classic React Hooks techniques for fetching data, using Axios, from Supabase. State was created for the table using Context. In addition, I committed to allow someone to refresh the page without losing the data they were accessing.

## License

Copyright 2023 Saoirse Siobhan Ebert

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
