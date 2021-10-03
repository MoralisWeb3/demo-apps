import Moralis from 'moralis'

Moralis.initialize(process.env.VUE_APP_MORALIS_APP_ID)
Moralis.serverURL = process.env.VUE_APP_MORALIS_SERVER_URL

export default Moralis