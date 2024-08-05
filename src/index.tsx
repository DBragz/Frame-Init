import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { verifying } from 'hono/utils/jwt/jws'
// import { neynar } from 'frog/hubs'

import { vars } from './ui'

export const app = new Frog({
  ui: { vars },
  title: 'Frame Init',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { status } = c
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          backgroundImage: `url(https://wallpapercave.com/wp/dIRfYNy.jpg)`,
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: '10%',
            marginRight: '25%',
          }}
        >
          {`Enter your highschool mascot?` }
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Highschool" />,
      <Button>Set</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })
