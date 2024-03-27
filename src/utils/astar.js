export function astar(from, to, map){

    let mapy = map.length;
    let mapx = map[0].length;
    //console.log(`${mapx}, ${mapy}`);
    let to_index = loc2index(to, mapx, mapy);
    let open = new PriorityQueue();
    open.enqueue(loc2index(from, mapx, mapy), dis(from, to));
    let close = new Array();
    let findex = new Array(mapx * mapy);

    

    while (open.size() != 0){
        let current_node_index = open.dequeue();
        //console.log(current_node_index)
        close.push(current_node_index);

        if(current_node_index == to_index){
            break;
        }

        let current_node_loc = index2loc(current_node_index, mapx, mapy);
        
        let move = [[1,0],[-1,0],[0,1],[0,-1]];

        //console.log(current_node_loc);
        for(let i=0;i<4;i++){
            let temp_node_loc = [current_node_loc[0]+move[i][0], current_node_loc[1] + move[i][1]];
            //console.log(temp_node_loc);
            let temp_node_index = loc2index(temp_node_loc, mapx, mapy);
            if (isvaild(temp_node_loc, map)){
              if (!open.contains(temp_node_index)) {
                if (close.indexOf(temp_node_index) == -1) {
                    open.enqueue(temp_node_index, dis(temp_node_loc, to));
                    findex[temp_node_index] = current_node_index;
                }
            }
            }
        }


    }

    //console.log(findex);
    //console.log(findex[to_index]);
    if (findex[to_index] == undefined){
      return [];
    }

    let route = [];
    let node = to_index;
    route.unshift(to);
    let from_index = loc2index(from, mapx, mapy)
    //console.log(from);
    //console.log(from_index);
    //console.log(findex);
    while(findex[node] != from_index){
        route.unshift(index2loc(findex[node], mapx, mapy));
        node = findex[node];
    }

    route.unshift(from);

    return route;

}


function loc2index(loc, mapx, mapy){

    return loc[0]*mapx+loc[1];

}

function index2loc(index, mapx, mapy){

    let x = Math.floor(index/mapx); 
    let y = index % mapy;

    return [x, y];
}

function isvaild(loc, map){

    let x = loc[0];
    let y = loc[1];

    let mapy = map.length;
    let mapx = map[0].length;

    if ((x <= mapx) && (y <= mapy) && (x >= 0) && (y >= 0)){

        if(map[x][y]){
            return false;
        } else {
            return true;
        }

    } else {
        return false;
    }

}

function dis(xy1, xy2){
    return Math.abs(xy1[0] - xy2[0]) + Math.abs(xy1[1] - xy2[1]);
}

class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    enqueue(element, priority) {
      const node = { value: element, priority };
      this.heap.push(node);
      this.bubbleUp(this.heap.length - 1);
    }
  
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex].priority >= this.heap[index].priority) break;
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        index = parentIndex;
      }
    }
  
    dequeue() {
      if (this.heap.length === 0) throw new Error('Queue is empty');
      const maxNode = this.heap[0];
      const endNode = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = endNode;
        this.bubbleDown(0);
      }
      return maxNode.value;
    }
  
    bubbleDown(index) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let largestChildIndex = index;
  
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority > this.heap[largestChildIndex].priority) {
        largestChildIndex = leftChildIndex;
      }
  
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority > this.heap[largestChildIndex].priority) {
        largestChildIndex = rightChildIndex;
      }
  
      if (largestChildIndex !== index) {
        [this.heap[index], this.heap[largestChildIndex]] = [this.heap[largestChildIndex], this.heap[index]];
        this.bubbleDown(largestChildIndex);
      }
    }

    contains(element) {
        for (let i = 0; i < this.heap.length; i++) {
          if (this.heap[i].value === element) {
            return true;
          }
        }
        return false;
    }

    size() {
        return this.heap.length;
    }
  }


  // // 假设我们有一个示例地图
  // const exampleMap = [
  //   [1, 1, 1, 1, 1],
  //   [1, 0, 0, 0, 1],
  //   [1, 0, 1, 0, 1],
  //   [1, 0, 0, 1, 1],
  //   [1, 1, 1, 1, 1],
  // ];
  
  // // 定义起始和结束坐标
  // const start = [1, 1];
  // const end = [3, 3];
  // const result = astar(start, end, exampleMap);
  // console.log(result);
  
