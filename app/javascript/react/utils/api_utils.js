const API_PREFIX = "/api/v1";
export function submitRequest(url, method, data, successCallback, errorCallback) {
  var requestUrl;

  if (/^http(?:s?):\/\//i.test(url)) {
    requestUrl = url;
  } else {
    requestUrl = API_PREFIX + url;
  }

  return window.jQuery.ajax({
    url: requestUrl,
    type: method,
    data: data,
    success: function(respondData) {
      if (successCallback) {
        successCallback(respondData);
      }
    },
    error: function(xhr, code, status) {
      if (errorCallback) {
        errorCallback(xhr, code, status);
      }
    }
  });
}
