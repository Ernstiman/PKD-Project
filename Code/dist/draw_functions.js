export function trap_draw_function(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
}
export function player_draw_function(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
