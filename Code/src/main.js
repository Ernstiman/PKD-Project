"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./lib/list");
function construct_inode(index, node_objects, x, y) {
    return { index: index, nodeObjects: node_objects, x: x, y: y };
}
var basic_graph = {
    adj: [
        (0, list_1.list)(construct_inode(1, (0, list_1.list)(), 100, 500)),
        (0, list_1.list)(construct_inode(2, (0, list_1.list)(), 200, 500)),
        (0, list_1.list)(construct_inode(3, (0, list_1.list)(), 300, 500)),
        (0, list_1.list)(construct_inode(4, (0, list_1.list)(), 400, 500)),
        (0, list_1.list)(construct_inode(0, (0, list_1.list)(), 500, 500)),
    ],
    size: 5
};
function list_graph_draw(ctx, list_graph) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(50, 50); // Start point (x, y)
    ctx.lineTo(250, 450); // End point (x, y)
    ctx.stroke(); // Render the line
}
function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(10, 10, 500, 50);
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(450, 450);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(250, 250, 100, 0, 2 * Math.PI);
    }
}
draw();
