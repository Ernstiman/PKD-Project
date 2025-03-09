import * as AdjNodes from '../src/adj_nodes';
import * as Click from '../src/click';
import * as Constructors from '../src/contructors';
import * as Detective from '../src/detective';
import * as DrawFunctions from '../src/draw_functions';
import * as Draw from '../src/draw';
import * as GenerateXY from '../src/generate_x_y';
import * as IdArray from '../src/id_array';
import * as Main from '../src/main';
import * as Music from '../src/music';
import * as NodeObjects from '../src/node_objects';
import * as RoundEndFunctions from '../src/round_end_functions';
import * as Screens from '../src/screens';
import * as SetupGameState from '../src/setup_game_state';
import * as StepOnFunctions from '../src/step_on_functions';
import * as Types from '../src/types';
import * as List from '../src/lib/list';
import * as Graph from '../src/lib/graphs';

let game_state: Types.GameState = SetupGameState.get_base_game_state();

let test_graph: Graph.ListGraph  = {
    adj: [
        List.list(1),
        List.list(2),
        List.list(0),
    ],
    size: 3
}

game_state.map_graph = test_graph;
game_state.current_node = 0;

// adj_nodes.ts tests

test('test', () => {

    expect(AdjNodes.is_adj_node(game_state, 1)).toBe(true);
    expect(AdjNodes.is_adj_node(game_state, 2)).toBe(false);
});

