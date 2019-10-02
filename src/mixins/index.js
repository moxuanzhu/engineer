export default {
    methods: {
        prompt(message, type) {
            type ? (type == 'success' || type == 'warning' ? this.$message({ message, type }) : this.$message.error(message)) : this.$message({ message })
        }
    }
}