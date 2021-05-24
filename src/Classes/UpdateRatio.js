class UpdateRatio {
  constructor() {
    this.list = [];
    this.width = 0;
    this.height = 0;
  }
  add(callback) {
    this.list.push(callback);
    callback(this.width, this.height);
  }
  remove(callback) {
    const index = this.list.indexOf(callback);
    if (index < 0) return false;
    else {
      this.list.splice(index, 1);
      return true;
    }
  }
  clear() {
    this.list = [];
  }
  update(width, height) {
    this.width = width;
    this.height = height;
    this.list.forEach((callback) => {
      callback(width, height);
    });
  }
}

export default UpdateRatio;
