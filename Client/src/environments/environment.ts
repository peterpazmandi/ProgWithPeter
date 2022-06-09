// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  siteTitle: 'Programming with Peter',

  apiUrl: 'https://localhost:5001/api/',
  serverUrl: 'https://localhost:5001/',
  profilePictureUrl: 'https://localhost:5001/Photos/ProfilePhotos/',
  
  addFeaturedPostImageEndpoint: 'Tutorial/add-featured-post-image',
  updateProfilePictureEndpoint: 'Users/update-profile-photo',
  addSourceCodeEndpoint: 'Post/AddSourceCode',
  
  iFramelyApiKey: 'd6f7a19a09f00da6a9e90a',  
  
  successUrl: 'https://localhost:4200/success',
  failureUrl: 'https://localhost:4200/failed',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
