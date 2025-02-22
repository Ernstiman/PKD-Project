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
    ctx.fillStyle = "rgba(20, 216, 2, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("YOU", x, y);
}
