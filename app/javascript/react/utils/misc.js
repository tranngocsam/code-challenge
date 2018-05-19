import _ from "lodash";
import moment from "moment";

export function scrollToTop(speed) {
  jQuery('html, body').animate({ scrollTop: 0 }, speed || "slow");
}

export function formatDate(date, format) {
  format = format || "MM/DD/YYYY";
  return date ? moment(date).format(format) : date;
}

export function parseDate(date, format) {
  format = format || "MM/DD/YYYY";
  var momentDate = moment(date, format);

  if (momentDate.isValid()) {
    return momentDate.toDate();
  }

  return undefined;
}

export function isEmptyObject(object) {
  return jQuery.isEmptyObject(object);
}
