module.exports = class command {
  constructor(name, description, usage) {
    this.name = name;
    this.description = description;
    this.usage = usage;
  }
}