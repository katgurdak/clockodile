const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();

// Serve static assets normally
app.use(express.static(__dirname + '/public'));

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, function() {
	console.log(`Server is listening on port ${port}`);
});
