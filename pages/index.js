import Head from 'next/head'
import React from 'react'

import Chat from './Chat'

class Index extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Nimble socket Hub</title>
        </Head>
        <Chat />
      </>
    )
  }
}

export default Index
