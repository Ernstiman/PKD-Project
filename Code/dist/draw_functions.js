import { draw_default_text_style } from "./draw.js";
export function draw_icon(ctx, x, y, path, size) {
    const img = new Image();
    img.src = path;
    ctx.drawImage(img, x, y, size, size);
}
export function draw_beaver_icon(ctx, x, y) {
    draw_icon(ctx, x, y, "../img/Beaver.png", 50);
}
export function trap_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        draw_beaver_icon(ctx, x, y);
        draw_default_text_style(self.collectables[0].count.toString(), x + 40, y, ctx, 20);
    }
    ctx.lineWidth = 2;
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
        draw_beaver_icon(ctx, x, y);
        draw_default_text_style(self.collectables[0].count.toString(), x + 40, y, ctx, 20);
    }
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.fillStyle = "rgb(3, 0, 200)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
}
export function dagger_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the line
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    draw_default_text_style("Dagger", x, y, ctx, 20);
}
export function wolf_draw_function(ctx, x, y, self) {
    //self.drawcollect
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Arial"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    if (self.collectables[0].count > 0) {
        draw_default_text_style(self.collectables[0].count.toString(), x + 40, y, ctx, 20);
    }
    ctx.lineWidth = 2;
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
    draw_default_text_style("Wolf", x, y, ctx, 20);
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
    ctx.lineWidth = 2;
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
    draw_default_text_style("Detective", x, y, ctx, 20);
}
export function shop_draw_function(ctx, x, y, self) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(65, 21, 139, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    draw_default_text_style("Shop", x, y, ctx, 20);
}
export function player_draw_function(ctx, x, y, self) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(35, 154, 43, 0.73)";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "16px Georgia"; // Set font size and type
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    draw_default_text_style("You", x, y, ctx, 20);
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
