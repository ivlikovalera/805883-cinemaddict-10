export default class AdapterComment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.textComment = data[`comment`];
    this.dateOfComment = data[`date`];
    this.emotion = data[`emotion`];
  }

  static parseComment(data) {
    return new AdapterComment(data);
  }

  static parseComments(data) {
    return data.map(AdapterComment.parseComment);
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.textComment,
      'date': this.dateOfComment,
      'emotion': this.emotion,
    };
  }
}
