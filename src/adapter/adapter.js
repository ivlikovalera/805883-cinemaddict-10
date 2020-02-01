export const dataToCommentData = (textComment, emoji) => {
  return Object.assign({}, {
    textComment,
    emojiPic: emoji,
    author: `Me`,
    dateOfComment: new Date(),
  });
};
