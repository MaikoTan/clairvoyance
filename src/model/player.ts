interface PlayerBase {
  id: string;
  name: string;
}

class Player implements PlayerBase {
  id: string;
  name: string;

  constructor(player: PlayerBase) {
    this.id = player.id;
    this.name = player.name;
  }
}

export {
  Player,
};
