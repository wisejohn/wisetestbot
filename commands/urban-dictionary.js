const { SlashCommandBuilder } = require('@discordjs/builders')
const ud = require('urban-dictionary')
const data = new SlashCommandBuilder()
	.setName('urban-dictionary')
	.setDescription('Define using Urban Dictionary')
	.addStringOption(option => option.setName('term').setDescription('The term to define').setRequired(true))

module.exports = {
	data,
	async execute(interaction) {
		const term = interaction.options.getString('term')

		const def = await ud.define('test').catch(error => {
			console.error(`define (promise) - error ${error.message}`)
			return interaction.reply(`Error getting urban dictionary definition`)
		})

		return interaction.reply(def[0].permalink)
		/*ud.define(term, (error, entries) => {
			if (error) {
				return interaction.reply(`Error getting urban dictionary definition`)
			}
			return interaction.reply(entries[0].permalink)
		})*/
	},
}

/*
module.exports = {
	name: 'urban-dictionary',
	aliases: [ 'ud' ],
	description: 'Define using Urban Dictionary',
	usage: ' term',
	execute(message, args) {
		if (args && args.length > 0) {
			const term = args.map(arg => arg.trim()).join(' ')
			ud.term(term, (error, entries) => {
				if (error) {
					message.channel.send(`Error getting urban dictionary definition`)
					console.error(error.message)
				} else {
					//message.channel.send(entries[0].definition, { split: true })
					message.channel.send(entries[0].permalink)
				}
			})
		} else {
			message.channel.send(`**Usage:** ${prefix}ud <term>`)
		}
	},
}
*/
