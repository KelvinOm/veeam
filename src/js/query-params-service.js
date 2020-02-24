// TODO: параметры в URL
function getURLParameter(param) {
  let url = window.location.search.substring(1);
  let urlVariables = url.split('&');

  urlVariables.forEach(variable => {
    let parameterName = variable.split('=');

    if (parameterName[0] === param) {
      return parameterName[1];
    }
  });
}
// getURLParameter('friendsPage');