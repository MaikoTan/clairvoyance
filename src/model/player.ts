interface Player {
  id: string;
  name: string;
  level: number;
}

export class Party extends Array<Player> {

  override sort(compareFn?: (a: Player, b: Player) => number): this {
    if (compareFn) {
      super.sort(compareFn);
      return this;
    }
    super.sort((a, b) => parseInt(a.id, 16) - parseInt(b.id, 16));
    // FIXME: should then sort by job id.
    return this;
  }
}
