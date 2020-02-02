export const dataToCommentData = (comment, emoji) => {
  return Object.assign({}, {
    comment,
    emojiPic: emoji,
    author: `Me`,
    date: new Date(),
  });
};
