const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cutecat")
    .setDescription("Replies with cute cat!")
    .addStringOption((option) =>
      option.setName("message").setDescription("Le Message").setRequired(false)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message") ?? " ";
    const thecat =
      "https://cataas.com/cat/says/" +
      encodeURIComponent(message.toUpperCase()) +
      "?font=Impact&fontSize=30&fontColor=%23fff&fit=contain&position=bottom";
    await interaction.reply({
      content: " ",
      files: [
        {
          attachment: thecat,
          name: "cutecat.png",
        },
      ],
    });
  },
};
