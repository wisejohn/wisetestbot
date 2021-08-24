const { SlashCommandBuilder } = require('@discordjs/builders')
const lunchOrders = new Map()
let currentListMessage

const data = new SlashCommandBuilder()
	.setName('lunch')
	.setDescription('Manage group Lunch Orders')
	.addSubcommand(subcommand =>
		subcommand
			.setName('add')
			.setDescription('Add or change your lunch order')
			.addStringOption(option => option.setName('order').setDescription('Your lunch order')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('list')
			.setDescription('Displays the current lunch order'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('delete')
			.setDescription('Removes your order from the list'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('clear')
			.setDescription('clears the whole list'))

module.exports = {
	data,
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'add') {
			const order = interaction.options.getString('order')
			lunchOrders.set(interaction.user.username, order)
			if (currentListMessage) {
				await currentListMessage.delete()
			}
			let orderDisplay = "Lunch Orders"
			lunchOrders.forEach(function(value, key) {
				orderDisplay += `\n${key} - ${value}`
			})
			currentListMessage = await interaction.reply(orderDisplay, { fetchReply: true })
		} else if (interaction.options.getSubcommand() === 'list') {
			let orderDisplay = "Lunch Orders"
			lunchOrders.forEach(function(value, key) {
				orderDisplay += `\n${key} - ${value}`
			})
			currentListMessage = await interaction.reply(orderDisplay, { fetchReply: true })
			//await interaction.reply(orderDisplay)
		} else if (interaction.options.getSubcommand() === 'delete') {
			lunchOrders.delete(interaction.user.username)
			await interaction.reply(`Your order has been removed`)
		} else if (interaction.options.getSubcommand() === 'clear') {
			lunchOrders.clear()
			await interaction.reply(`All orders removed`)
		}
	},
}

