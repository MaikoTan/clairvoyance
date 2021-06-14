interface PlayerBase {
  id: string;
  name: string;
  level: number;
}

class Player implements PlayerBase {
  id: string;
  name: string;
  level: number;

  constructor(player: PlayerBase) {
    this.id = player.id;
    this.name = player.name;
    this.level = player.level;
  }
}

export {
  Player,
};
