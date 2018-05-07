export default class WorldMap {
  constructor(){
    this.Rooms = new Array();
  }
  generateRoom(x, y){

  }
  loadRoom(x, y){
    if(this.Rooms.map(room => {
      return room.x == x && room.y == y
    }).length != 0){
      // load room
    }
    else{
      this.generateRoom(x, y)
    }
  }
}
