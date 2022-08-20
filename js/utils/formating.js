export const formatTextWithRegex = (text, delimeter, regex) => {
  if (!text || !delimeter || !regex) {
    return '';
  }
  let formattedText = text.split(delimeter).join('');
  if (formattedText.length > 0) {
    formattedText = formattedText.match(new RegExp(regex, 'g')).join(delimeter);
  }
  return formattedText;
};

export const ltrim0 = (text) => {
  if (!text) {
    return '';
  }
 return text.replace(/^[0]+/,'');
};
