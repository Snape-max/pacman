
export function astar(from, to, map){

    let mapx = map.length;
    let mapy = map[0].length;

    let open = Array();
    let close = Array();
    let findex = Array();







}



function loc2index(loc, mapx, mapy){

    return loc[0]*mapx+loc[1];

}

function index2loc(index, mapx, mapy){

    let x = Math.floor(index/mapx); 
    let y = index % mapx;

    return [x, y];
}

function isvaild(loc, map){

    let x = loc[0];
    let y = loc[1];

    let mapy = map.length;
    let mapx = map[0].length;

    if ((x <= mapx) && (y <= mapy) && (x >= 0) && (y >= 0)){

        if(map[x][y]){
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }

}