export function trap_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        ctx.fillText(self.collectables[0].count.toString(), x + 40, y);
    }
    ctx.beginPath();
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
}
export function lvl_1_trap_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        ctx.fillText(self.collectables[0].count.toString(), x + 40, y);
    }
    ctx.beginPath();
    ctx.fillStyle = "rgb(3, 0, 200)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
}
export function wolf_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        ctx.fillText(self.collectables[0].count.toString(), x + 40, y);
    }
    ctx.beginPath();
    ctx.fillStyle = "rgb(116, 76, 48)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("Wolf", x, y);
    //let image=new Image(20,20)
    //image.src = "../img/Wolf.png";
    //ctx.drawImage(image,x-25,y-25)
}
export function detective_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        ctx.fillText(self.collectables[0].count.toString(), x + 40, y);
    }
    ctx.beginPath();
    ctx.fillStyle = "rgb(60, 242, 215)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("Detective", x, y);
}
export function shop_draw_function(ctx, x, y, self) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(65, 21, 139, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("Shop", x, y);
}
export function player_draw_function(ctx, x, y, self) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(35, 154, 43, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("You", x, y);
}
export function ring_draw_function(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(181, 200, 11, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
export function draw_daughter(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(59, 220, 9, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
