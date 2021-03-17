const assignment = {};

// Sends the server responses
const respond = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Sends the server head responses
const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Gets the assignmnet and establishes that its been added
const getAssignment = (request, response) => {
  const responsesMessage = {
    message: 'Assignment Added!',
    assignment,
  };

  respond(request, response, 200, responsesMessage);
  return respondMeta(request, response, 200);
};

// Adds the assignmnet and checks if params are met
const addAssignment = (request, response, body) => {
  const responsesMessage = {
    message: 'The Assignments title, description, and due date are all required',
    id: 'Bad Request',
  };

  if (!body.Title || !body.Description || !body.DueDate || !body.Column) {
    responsesMessage.id = 'Missing Params';

    respond(request, response, 400, responsesMessage);
    return respondMeta(request, response, 400);
  }

  let responseCode = 201;

  if (assignment[body.Title]) {
    responseCode = 204;
  } else {
    assignment[body.Title] = {};
    assignment[body.Title].Title = body.Title;
  }

  assignment[body.Title].DueDate = body.DueDate;
  assignment[body.Title].Description = body.Description;
  assignment[body.Title].Column = body.Column;

  if (responseCode === 201) {
    responsesMessage.message = 'Created Successfuly!';
    responsesMessage.id = 'Success';

    respond(request, response, responseCode, responsesMessage);
    return respondMeta(request, response, responseCode);
  }

  respond(request, response, responseCode, responsesMessage);
  return respondMeta(request, response, responseCode);
};

const deleteAssignment = (request, response, params) => {
  const responsesMessage = {
    message: 'Assignment Deleted',
    assignment,
  };
  if(!params.Title){
    
    responsesMessage.message = 'The Assignments title is required',

      
    respond(request, response, 400, responsesMessage);
    return respondMeta(request, response, 400);
  }

  delete assignment[params.Title];
  respond(request, response, 204, responsesMessage);
  return respondMeta(request, response, 204);
}

// if page not found display 404
const notFound = (request, response) => {
  const responsesMessage = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, responsesMessage);
  return respondMeta(request, response, 404);
};

module.exports = {
  getAssignment,
  addAssignment,
  deleteAssignment,
  notFound,
};
