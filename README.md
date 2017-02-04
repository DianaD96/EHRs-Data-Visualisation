## EHRs-Data-Visualisation

Developed as a third year project.

## Installation
1. Clone this project or Download that ZIP file
2. Make sure you have [bower](http://bower.io/), [gulp](https://www.npmjs.com/package/gulp) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `bower install`
- `npm install`
- `npm install angular-material`
- `npm install express`
- `npm install body-parser`
- `npm install method-override`
- `npm install morgan`
- `npm install cookie-parser`
- `npm install cloudinary`
- `npm install sendgrid` - [get your API key](https://sendgrid.com/)
- `bower install angular-nvd3`
- `gulp serve` - For development mode
- `gulp build` - concat, minify and generate the files for deployment

## Development
Chrome devs are asked to download the [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-GB) Extension to be able to allow POST request to a different domain with AngularJS $http.  service. (Error: CORS header 'Access-Control-Allow-Origin' missing) [This is because the server to which the post request is being sent to has to implement CORS to grant JavaScript from your website access. Your JavaScript can't grant itself permission to access another website.](http://stackoverflow.com/questions/23823010/how-to-enable-cors-in-angularjs)
### Automation tools

- [Gulp](http://gulpjs.com/)
