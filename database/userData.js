export class UserData {
  constructor(id, name, active) {
    this.name = name;
    this.id = id;
    this.active = active;
    this.missed = 0;
    this.debt = 0;
    this.trains = 0;
    this.lastTrain = null;
    this.waitingTrain = false;
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  addMissed(quantity) {
    this.missed = this.missed + quantity;
  }

  addDebt(quantity = 1) {
    this.debt = this.debt + quantity;
    this.addMissed(quantity);
  }

  calcDebt(currentTime) {
    this.waitingTrain = false;
    if (!this.lastTrain) {
      return 0;
    }
    const daysMissed = Math.floor(
      (currentTime - this.lastTrain) / (1000 * 60 * 60 * 24),
    );
    this.addDebt(daysMissed);
    return daysMissed;
  }

  addTrain(currentTime) {
    this.trains = this.trains + 1;
    const daysMissed = this.calcDebt(currentTime);
    this.lastTrain = currentTime;
    return daysMissed;
  }
}
