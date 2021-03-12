

const assignment = {};

const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const respondMeta = (request, response, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.end();
};

const getUsers = (request, response, acceptedTypes) => {
  const responsesMessage = {
    message: 'Assignment Added!',
    assignment,

  };
  const res = JSON.stringify(responsesMessage);
  respond(request, response, 200, res, 'application/json');
  return respondMeta(request, response, 200, 'application/json');
};

const addUser = (request, response, body, acceptedTypes) => {
  const responsesMessage = {
    message: 'The Assignments title, description, and due date are all required',
    id: 'Bad Request',

  };

  if (!body.Title || !body.Description || !body.DueDate|| !body.Column) {
    responsesMessage.id = 'Missing Params';

    const res = JSON.stringify(responsesMessage);
    respond(request, response, 400, res, 'application/json');
    return respondMeta(request, response, 400, 'application/json');
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

    const res = JSON.stringify(responsesMessage);
    respond(request, response, responseCode, res, 'application/json');
    return respondMeta(request, response, responseCode, 'application/json');
  }

  else if (responseCode === 204) {
    responsesMessage.message = 'Assignment has been updated!';
    responsesMessage.id = 'Update (No Content)';

    const res = JSON.stringify(responsesMessage);
    respond(request, response, responseCode, res, 'application/json');
    return respondMeta(request, response, responseCode, 'application/json');
  }

  return respondMeta(request, response, responseCode, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responsesMessage = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  const res = JSON.stringify(responsesMessage);
  respond(request, response, 404, res, 'application/json');
  return respondMeta(request, response, 404, 'application/json');
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
