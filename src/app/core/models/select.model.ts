export class SelectModel {
  id: number;
  desc: string;

  constructor(id: number = null, desc: string = null) {
    this.id = id;
    this.desc = desc;
  }
}
