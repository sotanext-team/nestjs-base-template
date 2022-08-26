// This function is used to search alias email address in the database.
// For example: minhbn+1@sotanext.com
export function regexUtility(text: string): RegExp {
  if (!text) return new RegExp('', 'i');
  return new RegExp(
    text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gim, '\\$&'),
    'i',
  );
}
