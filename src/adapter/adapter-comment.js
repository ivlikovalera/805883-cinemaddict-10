export default class AdapterComment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = data[`date`];
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
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion,
    };
  }
}
