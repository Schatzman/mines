
var GameBoard = {
    grid: [
        [".","*","."],
        [".",".","*"],
        [".","*","."]
    ],
    is_mine_at: function(row, col){
        if(row >= 0 && row < GameBoard.grid.length){
            if(col >= 0 && col < GameBoard.grid[0].length){
                return GameBoard.grid[row][col] === "*";
            }
        }
        return false;
    },
    is_mine_above: function(row, col){
        var new_row = row - 1;
        return GameBoard.is_mine_at(new_row, col);
    },
    is_mine_below: function(row, col){
        var new_row = row + 1;
        return GameBoard.is_mine_at(new_row, col);
    },
    is_mine_before: function(row, col){
        var new_col = col - 1;
        return GameBoard.is_mine_at(row, new_col);
    },
    is_mine_after: function(row, col){
        var new_col = col + 1;
        return GameBoard.is_mine_at(row, new_col);
    },
    count_neighboring_mines(row, col){
        var total = 0;
        if(GameBoard.is_mine_above(row, col)){
            total += 1;
        }
        if(GameBoard.is_mine_below(row, col)){
            total += 1;
        }
        if(GameBoard.is_mine_before(row, col)){
            total += 1;
        }
        if(GameBoard.is_mine_after(row, col)){
            total += 1;
        }
        if(GameBoard.is_mine_before(row-1, col)){
            total += 1;
        }
        if(GameBoard.is_mine_after(row-1, col)){
            total += 1;
        }
        if(GameBoard.is_mine_before(row+1, col)){
            total += 1;
        }
        if(GameBoard.is_mine_after(row+1, col)){
            total += 1;
        }
        return total;
    },
    count_grid: [],
    build_count_grid: function(){
        for(row=0; row<GameBoard.grid.length; row++){
            GameBoard.count_grid.push([]);
            for(col=0; col<GameBoard.grid[0].length; col++){
                if(GameBoard.is_mine_at(row, col)){
                    GameBoard.count_grid[row].push("*");
                }else{
                    GameBoard.count_grid[row].push(GameBoard.count_neighboring_mines(row, col).toString());
                }
            }
        }
    }
};

function createGameBoard(grid, count_grid){
    var container = document.createElement('div');
    for(row=0; row<grid.length; row++){
        var row_container = document.createElement('div');
        for(col=0; col<grid[0].length; col++){
            div = document.createElement('div');
            div.style.border = "1px solid red";
            div.style.height = "30px";
            div.style.width = "40px";
            div.style.display = "inline-block";
            div.style.textAlign = "center";
            div.style.paddingTop = "15px";
            div.innerText = grid[row][col];
            var ismine = div.innerText === "*";
            div.setAttribute("ismine", ismine);
            var neighbors = 15;
            div.setAttribute("row", row);
            div.setAttribute("col", col);
            div.setAttribute("neighbors", count_grid[row][col])
            row_container.appendChild(div);
            div.addEventListener('contextmenu', function (e){
                e.preventDefault();
                rightClick(div);
                return false;
            }
            , false);
            div.addEventListener('mousedown', function (e){
                if (e.button == 0){
                    leftClick(div);
                    console.log(div.getAttribute("row"));
                    console.log(div.getAttribute("col"));
                }
                return false;
            }, false);
        }
        container.appendChild(row_container);
    }
    document.body.appendChild(container);
}

function leftClick(div){
    console.log("leftClick");
    div.innerText = div.getAttribute("neighbors");
}   

function rightClick(div){
    console.log("rightClick");
}

$(document).ready(function(){
    console.log("Salutations, multiverse.");
    console.log(GameBoard.is_mine_at(0, 1));
    console.log(GameBoard.count_neighboring_mines(0, 1));
    console.log(GameBoard.count_neighboring_mines(1, 1));
 
    GameBoard.build_count_grid();
    console.log(GameBoard.count_grid);
    createGameBoard(GameBoard.grid, GameBoard.count_grid);
});