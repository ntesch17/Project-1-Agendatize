// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const assignment = {};
const title = {};
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
  let trueCount = true;
  let count = 0;

  if(trueCount){
    count++;
    trueCount = false;
  }

  const responsesMessage = {
    message: 'Assignment Added!',
    assignment: `${JSON.stringify(assignment)}`,

  };
  
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responsesMessage.message}</message>`;
    responseXML = `${responseXML} <assignment>${responsesMessage.assignment}</assignment>`;
    responseXML = `${responseXML} </response>`;
    respond(request, response, 200, responseXML, 'text/xml');
    return respondMeta(request, response, 200, 'text/xml');
  }
  const res = JSON.stringify(responsesMessage);
  respond(request, response, 200, res, 'application/json');
  return respondMeta(request, response, 200, 'application/json');
};

const addUser = (request, response, body, acceptedTypes) => {
  const responsesMessage = {
    message: 'Message: The Assignments title, description, and due date are all required',
    id: 'Bad Request',
  };

  if (!body.title || !body.description || !body.dueDate) {
    responsesMessage.id = 'ID: Missing Params';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responsesMessage.message}</message>`;
      responseXML = `${responseXML} <id>${responsesMessage.id}</id>`;
      responseXML = `${responseXML} </response>`;
  
      respond(request, response, 400, responseXML, 'text/xml');
      return respondMeta(request, response, 400, 'text/xml');
    }

    const res = JSON.stringify(responsesMessage);
    respond(request, response, 400, res, 'application/json');
    return respondMeta(request, response, 400, 'application/json');
  }

  let responseCode = 201;

  if (assignment[body.title]) {
    responseCode = 204;
  } else {
    assignment[body.title] = {};
    assignment[body.title].title = body.title;
  }

  assignment[body.title].dueDate = body.dueDate;
  assignment[body.title].description = body.description;

  if (responseCode === 201) {
    responsesMessage.message = 'Message: Created Successfuly!';
    responsesMessage.id = 'Success';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responsesMessage.message}</message>`;
      responseXML = `${responseXML} <id>${responsesMessage.id}</id>`;
      responseXML = `${responseXML} </response>`;
  
      respond(request, response, responseCode, responseXML, 'text/xml');
      return respondMeta(request, response, responseCode, 'text/xml');
    }

    const res = JSON.stringify(responsesMessage);
    respond(request, response, responseCode, res, 'application/json');
    return respondMeta(request, response, responseCode, 'application/json');
  }

  // if (acceptedTypes[0] === 'text/xml') {
  //   return respondMeta(request, response, responseCode, 'text/xml');
  // }
  //return respondMeta(request, response, responseCode, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responsesMessage = {
    message: 'Message: The page you are looking for was not found.',
    id: 'ID: notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responsesMessage.message}</message>`;
    responseXML = `${responseXML} <id>${responsesMessage.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respond(request, response, 404, responseXML, 'text/xml');
    return respondMeta(request, response, 404, 'text/xml');
  }

  const res = JSON.stringify(responsesMessage);
  respond(request, response, 404, res, 'application/json');
  return respondMeta(request, response, 404, 'application/json');
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
