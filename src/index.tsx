import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { verifying } from 'hono/utils/jwt/jws'
// import { neynar } from 'frog/hubs'

import { vars } from './ui'

export const app = new Frog({
  ui: { vars },
  title: 'Mascot Merger',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { status, inputText } = c
  return c.res({
    action: '/college',
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
            marginTop: '100',
            marginRight: '250',
            marginLeft: '10',
          }}
        >
          { status === 'initial' ? 
              `Enter your highschool mascot?` 
              : `Highschool mascot: ${inputText}` }
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Highschool" />,
      <Button>Set</Button>
    ],
  })
})

app.frame('/college', (c) => {
  const { status, inputText } = c
  return c.res({
    image: (
      <div
        style={{
          background: 'linear-gradient(to right, #432889, #17101F)',
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
          }}
        >
          { status === 'response' && inputText !== undefined ?
            `Highschool mascot: ${inputText}  Enter your college mascot?` 
            : 'Enter your highschool mascot?' }
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="College" />,
      <Button>Set</Button>,
      <Button.Reset>Submit</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })
