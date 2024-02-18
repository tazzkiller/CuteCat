const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");
const { join } = require('path');
const fontPath = join(__dirname, '../..', 'fonts', 'COMIC.ttf');
GlobalFonts.registerFromPath(fontPath);

const applyText = (canvas, text) => {
  const context = canvas.getContext("2d");
  let fontSize = 300;

  do {
    context.font = `${(fontSize -= 4)}px 'Comic Sans MS'`;
  } while (context.measureText(text).width > canvas.width - 50);
  return context.font;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cutecat")
    .setDescription("Replies with cute cat!")
    .addStringOption((option) =>
      option.setName("message").setDescription("Le Message").setRequired(false)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message") ?? " ";
    //const messageUpperText = message.toUpperCase();
    const messageUpperText = message;
    const thecaturl = "https://cataas.com/cat";
    const thecat = await loadImage(thecaturl);
    const canvas = createCanvas(thecat.width, thecat.height);
    const context = canvas.getContext("2d");
    context.drawImage(thecat, 0, 0, canvas.width, canvas.height);
    context.textBaseline = "middle";
    context.font = applyText(canvas, messageUpperText);
    const textWidth = context.measureText(messageUpperText).width;
    context.shadowColor = "black";
    context.shadowBlur = 8;
    context.fillStyle = "#ffffff";
    context.fillText(
      messageUpperText,
      canvas.width / 2 - textWidth / 2,
      canvas.height - 100
    );
    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "cutecat.png",
    });
    await interaction.reply({ files: [attachment] });
  },
};
